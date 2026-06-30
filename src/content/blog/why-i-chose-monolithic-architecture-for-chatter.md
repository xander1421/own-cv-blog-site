---
title: "Building Chatter: A Domain-Driven Monolithic Architecture"
date: "2025-08-15"
description: "Exploring how Domain-Driven Design principles and modular architecture create maintainable monoliths"
tags: ["Architecture", "DDD", "Monolith", "Go"]
image: "./why-i-chose-monolithic-architecture-for-chatter.webp"
---

When I started building Chatter, a real-time chat platform with voice/video calling, AI integrations, and file sharing, I made a deliberate choice to build a **modular monolith** guided by Domain-Driven Design principles. Here's why that decision made sense and how I structured it.

## The Monolith vs Ball of Mud Problem

Let's address the elephant in the room: when people hear "monolith," they often think of a tangled mess of spaghetti code where everything depends on everything. That's not a monolith—that's a **Big Ball of Mud**.

A well-structured monolith has:
- **Clear service boundaries** (bounded contexts)
- **Loose coupling** between modules
- **High cohesion** within modules
- **Well-defined interfaces** between components
- **Single Responsibility** at the service level

The difference? You can split a modular monolith into microservices in days. You can't untangle a ball of mud without rewriting it.

## Domain-Driven Design: The Foundation

I organized Chatter around **bounded contexts**—self-contained domains that own their data and behavior. Each context represents a different aspect of the chat platform.

### The Core Domains

```text
internal/services/
├── auth/          # Authentication & Session Management
├── user/          # User Profiles & Social Graph
├── channel/       # Chat Spaces & Membership
├── message/       # Real-time Communication
├── file/          # Content Storage & Sharing
├── integration/   # External AI Services
├── notification/  # Event Distribution
└── call/          # Voice/Video Communication
```

Each domain is a **bounded context** with:
- Its own ubiquitous language
- Clear ownership of data
- Explicit boundaries
- Minimal coupling to other contexts

## Service Structure: Layers of Responsibility

Every service follows a consistent layered architecture:

```text
service/
├── handlers/     # API layer (gRPC endpoints)
├── service/      # Business logic & orchestration
├── repository/   # Data persistence
├── types/        # Domain models & interfaces
└── factory.go    # Dependency injection
```

### 1. Handlers Layer

Handles protocol concerns—request validation, response formatting, error handling:

```go
// handlers/message.go
func (h *MessageHandler) SendMessage(ctx context.Context, req *pb.SendMessageRequest) (*pb.SendMessageResponse, error) {
    // Validate request
    // Call service layer
    // Transform response
}
```

No business logic here. Just translation between protocol buffers and domain models.

### 2. Service Layer

Contains all business logic and orchestrates operations:

```go
// service/message.go
type serviceImpl struct {
    repo              Repository
    authzChecker      AuthzChecker
    txManager         TxManager
    logger            logger.Logger
    temporalClient    client.Client
    fileValidation    FileValidationAdapter
    securityValidator SecurityValidator
    integrationAdapter IntegrationAdapter
    vaultClient       *vault.Client
}

func (s *serviceImpl) Send(ctx context.Context, msg *Message) error {
    // Validate message structure
    if err := s.validateMessage(msg, false); err != nil {
        return err
    }

    // Check permissions via SpiceDB
    canSend, err := s.authzChecker.Check(ctx, userID, msg.ChannelID, "send_message")
    if err != nil || !canSend {
        return ErrUnauthorized
    }

    // Store message (repository handles Redis pub/sub)
    if err := s.repo.Create(ctx, msg); err != nil {
        return err
    }

    return nil
}
```

This is where domain logic lives. Services coordinate between repositories, authorization, and external adapters.

### 3. Repository Layer

Handles data persistence and queries:

```go
// repository/postgres.go
type PostgresMessageRepository struct {
    db *sql.DB
}

func (r *PostgresMessageRepository) Save(ctx context.Context, msg *Message) error {
    // SQL insertion logic
}
```

Pure data access. No business rules. Repositories are swappable (PostgreSQL today, could be MongoDB tomorrow).

### 4. Types/Domain Models

Define the domain entities and their behavior:

```go
// types/message.go
type Message struct {
    ID        string
    Content   string
    ChannelID string
    SenderID  string
    CreatedAt time.Time
}

func (m *Message) Validate() error {
    // Domain validation rules
}
```

These are your domain objects. They encapsulate state and behavior relevant to the domain.

## Dependency Injection: The Container Pattern

To keep services loosely coupled, I use a **dependency injection container** with a factory pattern:

```go
// message/factory.go
func RegisterWithContainer(c *container.Container) error {
    // Repository factory with Decorator pattern
    repoFactory := func(c *container.Container) (interface{}, error) {
        // Create PostgreSQL repository
        pgRepo, err := postgres.New(c.DB)
        if err != nil {
            return nil, err
        }

        // Wrap with Redis for caching + pub/sub (Decorator pattern)
        if c.RedisClient != nil {
            return redis.NewWithClient(c.RedisClient, pgRepo)
        }

        return pgRepo, nil
    }

    // Service factory with full dependency injection
    serviceFactory := func(c *container.Container) (interface{}, error) {
        // Get message repository
        repo, err := c.GetOrCreateRepository("message", repoFactory)
        if err != nil {
            return nil, err
        }

        // Create adapters for cross-service communication
        adapterFactory := adapters.NewAdapterFactory(c, true)
        fileValidation := adapterFactory.CreateFileValidationAdapter()
        securityValidator := adapterFactory.GetSecurityValidator()
        integrationAdapter := adapters.NewIntegrationAdapter(c)

        // Create service with all dependencies injected
        return messageservice.New(messageservice.Config{
            Repository:            repo.(types.Repository),
            AuthzChecker:          c.AuthzChecker,  // SpiceDB
            TxManager:             c.TxManager,
            Logger:                c.Logger,
            TemporalClient:        c.TemporalClient,
            RedisClient:           c.RedisClient,
            FileValidationAdapter: fileValidation,
            SecurityValidator:     securityValidator,
            IntegrationAdapter:    integrationAdapter,
            VaultClient:           c.VaultClient,
        }), nil
    }

    // Register factories
    c.GetOrCreateRepository("message", repoFactory)
    c.GetOrCreateService("message", serviceFactory)
    return nil
}
```

Benefits:
- **Decorator pattern**: Redis wraps PostgreSQL transparently
- **Adapter pattern**: Cross-service communication via adapters
- Easy to swap dependencies for testing
- Clear dependency graph (12 injected dependencies)
- Lazy initialization (services created on-demand)

## Communication Patterns

### 1. Synchronous: Direct Function Calls via Adapters

When one service needs data from another, it calls through an adapter:

```go
// In FileValidationAdapter (used by MessageService)
func (a *FileServiceAdapter) GetFileMetadata(ctx context.Context, fileID string) (*FileMetadata, error) {
    // Get file service from container
    fileService, err := file.GetService(a.container)
    if err != nil {
        return nil, err
    }

    // Direct function call (no RPC, no network)
    fileMetadata, err := fileService.GetFile(ctx, fileID)
    if err != nil {
        return nil, err
    }

    return &FileMetadata{
        ID:       fileMetadata.ID,
        Filename: fileMetadata.Filename,
        Size:     fileMetadata.Size,
        MimeType: fileMetadata.MimeType,
    }, nil
}
```

No network calls. No serialization. Just function invocation through adapters for loose coupling.

### 2. Asynchronous: Direct Redis Pub/Sub with Batch Publishing

Instead of an EventBus abstraction, I use **direct Redis pub/sub** with optimized batching:

```go
// repository/redis/repository.go
type Repository struct {
    client *redis.Client
    next   types.Repository  // PostgreSQL (Decorator pattern)

    // Direct batch publishing (no EventBus!)
    batchChan    chan PublishOperation
    batchSize    int           // 1000 operations
    batchTimeout time.Duration // 5ms window
    workerCount  int           // 4 workers
}

// After saving to PostgreSQL, publish to Redis
func (r *Repository) Create(ctx context.Context, msg *Message) error {
    // Save to PostgreSQL
    if err := r.next.Create(ctx, msg); err != nil {
        return err
    }

    // Publish to Redis channel (non-blocking)
    data, _ := json.Marshal(msg)
    r.batchChan <- PublishOperation{
        channel: fmt.Sprintf("channel:%s:messages", msg.ChannelID),
        data:    data,
    }

    return nil
}
```

4 background workers batch up to 1000 operations within a 5ms window for high throughput. Clients subscribe to `channel:<id>:messages` for real-time updates.

### 3. Long-Running Operations: Temporal Workflows

For complex multi-step processes (user registration, account deletion):

```go
// Start workflow
workflowID, err := s.temporal.StartWorkflow(ctx, "UserRegistration", &RegisterInput{
    Email: email,
    Username: username,
})

// Activities in workflow
func RegisterUser(ctx context.Context, input *RegisterInput) error {
    // Step 1: Create auth record
    authID, err := authActivity.CreateUser(ctx, input)

    // Step 2: Create profile
    profileID, err := userActivity.CreateProfile(ctx, authID)

    // Step 3: Send welcome email
    err = notificationActivity.SendWelcome(ctx, profileID)

    // Compensation on failure
    if err != nil {
        authActivity.DeleteUser(ctx, authID)
        userActivity.DeleteProfile(ctx, profileID)
    }

    return err
}
```

This is the **Saga pattern** for distributed transactions. Temporal handles retries, compensation, and state management.

## Authorization: Fine-Grained Permissions

I use **SpiceDB** (Google's Zanzibar model) for authorization:

```text
// Schema definition
definition channel {
    relation admin: user
    relation moderator: user
    relation member: user

    permission send_message = member + moderator + admin
    permission delete_message = moderator + admin
    permission manage_channel = admin
}
```

Permissions are **relationships**, not boolean flags. This allows complex hierarchies:

```go
// Check permission
canSend, err := authz.Check(ctx, &CheckRequest{
    Subject: user,
    Resource: channel,
    Permission: "send_message",
})
```

Benefits:
- Fine-grained control (per-channel, per-user)
- Hierarchical roles (admin inherits moderator)
- Audit trails (who granted what, when)
- External service (SpiceDB), decoupled from business logic

## Why Not Microservices?

Here's the honest answer: **I don't need them yet, and might never**.

### When Monoliths Work

Monoliths are ideal when:
- Your team is small (< 50 engineers)
- Services share the same data model
- You value development velocity over org independence
- Latency matters (no network hops)
- You want simple debugging (single codebase, single log)

### When to Split

I'd consider microservices if:
- **Team scaling**: Multiple teams stepping on each other
- **Technology diversity**: Need different languages/runtimes per service
- **Independent scaling**: One service gets 100x more traffic
- **Deployment independence**: Need to deploy services separately
- **Regulatory boundaries**: Different security/compliance zones

None of these apply to Chatter right now.

### The Migration Path

Because I built with **clear service boundaries**, migrating is straightforward:

1. Pick a service (e.g., `file` service)
2. Extract interface definition (already exists)
3. Deploy as separate binary
4. Replace direct calls with gRPC client
5. Point at new service

Estimated time: **1-2 weeks** per service. Compare that to untangling a ball of mud (months).

## Design Patterns in Action

### 1. Repository Pattern

Abstracts data access:

```go
type Repository interface {
    Create(ctx context.Context, msg *Message) error
    GetByID(ctx context.Context, id string) (*Message, error)
    List(ctx context.Context, channelID string, limit, offset int) ([]*Message, error)
    Update(ctx context.Context, msg *Message) error
    Delete(ctx context.Context, id string) error
}
```

Swap implementations without changing business logic (PostgreSQL, in-memory for tests).

### 2. Decorator Pattern

Redis repository wraps PostgreSQL, adding caching and pub/sub transparently:

```go
// Decorator: RedisRepository wraps PostgresRepository
type RedisRepository struct {
    client *redis.Client
    next   Repository  // PostgreSQL repository
}

func (r *RedisRepository) Create(ctx context.Context, msg *Message) error {
    // Delegate to wrapped repository (PostgreSQL)
    if err := r.next.Create(ctx, msg); err != nil {
        return err
    }

    // Add caching layer
    data, _ := json.Marshal(msg)
    r.client.Set(ctx, "msg:"+msg.ID, data, 24*time.Hour)

    // Add pub/sub layer
    r.batchChan <- PublishOperation{
        channel: fmt.Sprintf("channel:%s:messages", msg.ChannelID),
        data:    data,
    }

    return nil
}
```

The service doesn't know if it's using PostgreSQL, Redis, or both - it just calls `repo.Create()`.

### 3. Adapter Pattern

Cross-service communication through adapters:

```go
type FileValidationAdapter interface {
    GetFileMetadata(ctx context.Context, fileID string) (*FileMetadata, error)
    ValidateFile(ctx context.Context, fileID string) error
}

// Adapter bridges MessageService and FileService
type FileServiceAdapter struct {
    container *container.Container
}

func (a *FileServiceAdapter) GetFileMetadata(ctx context.Context, fileID string) (*FileMetadata, error) {
    fileService, _ := file.GetService(a.container)
    return fileService.GetFile(ctx, fileID)
}
```

This prevents direct coupling between MessageService and FileService.

### 4. Factory Pattern

Service creation with dependency injection:

```go
func RegisterWithContainer(c *container.Container) error {
    serviceFactory := func(c *container.Container) (interface{}, error) {
        repo, _ := c.GetOrCreateRepository("message", repoFactory)

        return messageservice.New(messageservice.Config{
            Repository:     repo,
            AuthzChecker:   c.AuthzChecker,
            Logger:         c.Logger,
            TemporalClient: c.TemporalClient,
            // ... 12 dependencies injected
        }), nil
    }

    c.GetOrCreateService("message", serviceFactory)
    return nil
}
```

### 5. Saga Pattern

Multi-step transactions with compensation:

```text
workflow RegisterUser:
    try:
        authID = CreateAuthUser()
        profileID = CreateProfile(authID)
        sessionID = CreateSession(authID)
    rollback:
        DeleteSession(sessionID)
        DeleteProfile(profileID)
        DeleteAuthUser(authID)
```

### 6. CQRS (Command Query Responsibility Segregation)

Separate read and write models:

```go
// Write: Strong consistency (PostgreSQL)
func (s *MessageService) SendMessage(ctx, msg) error {
    return s.repo.Save(ctx, msg)
}

// Read: Eventually consistent (Redis cache)
func (s *MessageService) GetMessages(ctx, channelID) ([]*Message, error) {
    // Try cache first
    if msgs := s.cache.Get(channelID); msgs != nil {
        return msgs, nil
    }

    // Fallback to database
    msgs := s.repo.GetByChannel(ctx, channelID)
    s.cache.Set(channelID, msgs)
    return msgs, nil
}
```

## Project Structure: The Full Picture

```text
chatter/
├── cmd/
│   ├── server/        # API binary (gRPC endpoints)
│   └── worker/        # Async worker binary (Temporal)
├── internal/
│   ├── services/      # Bounded contexts (8 domains)
│   │   ├── auth/
│   │   ├── user/
│   │   ├── channel/
│   │   ├── message/
│   │   ├── file/
│   │   ├── integration/
│   │   ├── notification/
│   │   └── call/
│   ├── temporal/      # Workflow definitions
│   │   ├── workflows/
│   │   └── activities/
│   ├── middleware/    # Cross-cutting concerns
│   ├── server/        # Server setup & routing
│   └── utils/
│       ├── container/ # DI container
│       ├── authz/     # Authorization client
│       ├── logger/    # Structured logging
│       └── txmanager/ # Transaction management
├── pkg/
│   └── proto/         # API definitions (protobuf)
├── frontend/          # React 19 + TypeScript
└── docs/              # Architecture docs
```

Two deployable artifacts:
1. **Server**: Handles all real-time requests (gRPC + HTTP)
2. **Worker**: Executes async workflows (Temporal)

## Tech Stack Philosophy

**Backend:**
- **Go**: Static typing, performance, simple concurrency
- **ConnectRPC**: Unified gRPC + HTTP/JSON (no REST vs gRPC debate)
- **PostgreSQL**: ACID transactions, mature tooling
- **Redis**: Pub/sub for real-time, cache for reads
- **Temporal**: Workflow orchestration (saga pattern)
- **SpiceDB**: Authorization as a service (Zanzibar model)

**Frontend:**
- **React 19 + TypeScript**: Type safety, mature ecosystem
- **Vite**: Fast HMR, modern build tooling
- **TanStack Router/Query**: Type-safe routing & data fetching

## Lessons Learned

### 1. Bounded Contexts Are Non-Negotiable

Without clear domain boundaries, you get coupling. With them, you get:
- **Independent evolution** (change message service without touching auth)
- **Clear ownership** (who's responsible for what)
- **Easier onboarding** (new devs learn one context at a time)

### 2. Interfaces Over Implementations

Every service dependency is an interface:

```go
type Authorizer interface {
    Check(ctx, subject, resource, permission) (bool, error)
}
```

This means:
- Easy mocking for tests
- Swappable implementations (SpiceDB today, custom tomorrow)
- No circular dependencies

### 3. Decorator Pattern for Separation of Concerns

Using the Decorator pattern to add caching and pub/sub without changing the core service logic:

```go
// Clean separation: PostgreSQL for persistence, Redis for pub/sub
func (r *RedisRepository) Create(ctx context.Context, msg *Message) error {
    // Persistence (decorated repository)
    if err := r.next.Create(ctx, msg); err != nil {
        return err
    }

    // Caching layer (decorator responsibility)
    r.cacheMessage(msg)

    // Pub/Sub layer (decorator responsibility)
    r.publishMessage(msg)

    return nil
}
```

The message service only knows about `Repository.Create()` - it doesn't care about caching or pub/sub.

### 4. Start Simple, Evolve When Needed

I didn't build for "eventual microservices." I built for **today's requirements** with **tomorrow's flexibility**.

If I need to split services later, my architecture allows it. But I won't do it prematurely.

## Conclusion: Architecture as a Means, Not an End

The goal isn't to build a perfect architecture. The goal is to **deliver value** with **maintainable code**.

A modular monolith lets me:
- Ship features quickly (no inter-service coordination)
- Debug easily (single codebase, single log)
- Scale when needed (vertical first, horizontal later)
- Refactor confidently (bounded contexts, clear interfaces)

Domain-Driven Design gives me the structure. The monolith gives me the simplicity.

That's a trade-off I'm happy with.

---

**Key Takeaways:**

1. **Monoliths aren't inherently bad**—balls of mud are
2. **Use DDD** to create clear service boundaries
3. **Depend on interfaces**, not implementations
4. **Use Decorator pattern** to add functionality transparently (caching, pub/sub)
5. **Use Adapter pattern** for cross-service communication without tight coupling
6. **Build for today**, architect for tomorrow
7. **Split when you have evidence**, not assumptions

The best architecture is the one that lets you sleep at night while your users get features shipped. For me, that's a well-structured modular monolith.
