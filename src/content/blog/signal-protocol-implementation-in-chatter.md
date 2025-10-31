---
title: "The Cryptographic Elegance of the Signal Protocol: How Chatter Implements End-to-End Security"
date: "2025-10-22"
description: "A deep dive into the Signal Protocol's cryptographic foundations and how we implement X3DH, Double Ratchet, and Sealed Sender in Chatter"
tags: ["Cryptography", "Security", "Signal Protocol", "Go"]
image: "./signal-protocol-implementation-in-chatter.webp"
---

When building Chatter, a real-time chat platform with voice/video calling and AI integrations, security wasn't an afterthought—it was the foundation. I chose to implement the **Signal Protocol**, widely regarded as the gold standard for end-to-end encrypted messaging.

This post explores the cryptographic principles behind Signal and how we've implemented them in Chatter's Go backend.

## Why Signal Protocol?

The Signal Protocol powers encrypted messaging in WhatsApp, Signal, Facebook Messenger, and now Chatter. It provides:

- **Perfect Forward Secrecy (PFS)**: Past messages remain secure even if current keys are compromised
- **Post-Compromise Security (PCS)**: Future messages are protected even after a key compromise
- **Asynchronous communication**: Recipients can be offline when you send encrypted messages
- **Deniable authentication**: You can verify messages came from the sender, but can't prove it to third parties

## The Core Components

### 1. The Double Ratchet Algorithm

At the heart of Signal lies the **Double Ratchet Algorithm**, which combines two ratcheting mechanisms:

#### Symmetric-Key Ratchet (KDF Chain)

Each message derives a new encryption key from the previous one using a Key Derivation Function (KDF):

```text
Key₁ → KDF → Key₂ → KDF → Key₃ → ...
```

Once a key encrypts a message, it's deleted. An attacker capturing Key₃ cannot compute Key₁ or Key₂ backward. This provides **Perfect Forward Secrecy**.

**Handling out-of-order messages**: If messages arrive out of order or some are lost, the protocol must "skip" keys and store them for later decryption. The KDF chain requires **sequential derivation**—to reach Key₁₀₀, you must compute Key₁, Key₂, ..., Key₉₉. There's no "indexed" derivation shortcut. This means if Bob receives 100 messages while offline, he must derive all 100 intermediate keys sequentially.

To prevent denial-of-service attacks where a malicious sender triggers excessive key derivations, implementations use a **MAX_SKIP** parameter (typically 1000-2000 messages) to limit how many keys can be skipped in a single chain.

#### Asymmetric-Key Ratchet (DH Ratchet)

The DH ratchet performs a new Diffie-Hellman key exchange when a party **receives a message with a new DH public key** from the peer (not based on time or message count):

```text
Alice's DH key: a
Bob's DH key: b
Shared secret: g^(ab)
```

Every message header contains the sender's current ratchet public key. When Bob receives a message with a new public key from Alice, he performs a DH ratchet step, generating a fresh shared secret. This creates a "ping-pong" pattern where parties take turns introducing new key material.

Each DH exchange "ratchets" the symmetric key chain forward with new entropy. Even if an attacker compromises a key, the next DH exchange generates a completely independent key chain, providing **Post-Compromise Security**.

### 2. X3DH: Extended Triple Diffie-Hellman

The Signal Protocol uses **X3DH** (Extended Triple Diffie-Hellman) for initial key agreement, especially for asynchronous messaging where the recipient is offline.

#### The Key Types

Each user maintains three types of keys:

- **Identity Key (IK)**: Long-term public key for the account (X25519 for DH operations; signatures are produced via XEdDSA mapping—no separate Ed25519 identity key required)
- **Signed Prekey (SPK)**: Medium-term X25519 key signed by the identity key using XEdDSA, rotated periodically
- **One-Time Prekeys (OTPKs)**: Single-use X25519 keys consumed during key agreement

#### How X3DH Works

When Alice wants to message Bob for the first time:

1. **Bob publishes a prekey bundle** to the server:
   - Identity Key (IK_B)
   - Signed Prekey (SPK_B) + signature
   - One-Time Prekeys (OTPK_B₁, OTPK_B₂, ...)

2. **Alice fetches Bob's bundle** and performs four DH operations:
   ```text
   DH₁ = DH(IK_A, SPK_B)
   DH₂ = DH(EK_A, IK_B)
   DH₃ = DH(EK_A, SPK_B)
   DH₄ = DH(EK_A, OTPK_B)  // if available
   ```
   Where `EK_A` is Alice's ephemeral key for this session.

3. **Shared secret**: `SK = KDF(DH₁ || DH₂ || DH₃ || DH₄)` if OTPK is available, otherwise `SK = KDF(DH₁ || DH₂ || DH₃)`

4. **Alice's initial message includes key identifiers** (SPK_id, OTPK_id if used) so Bob knows which prekeys to load from his device

This triple (or quadruple) DH exchange provides mutual authentication and forward secrecy. If no one-time prekey is available, the protocol falls back to three DH operations, with forward secrecy depending on the signed prekey's lifetime.

#### Multi-Device Support

Modern messaging requires supporting multiple devices per user (phone, tablet, desktop). When Alice sends a message to Bob:

1. **Device Discovery**: Alice fetches prekey bundles for **all of Bob's devices** (using the `device_id = "*"` parameter)
2. **Separate Sessions**: Alice establishes **independent X3DH sessions** with each device (Alice→Bob-Phone, Alice→Bob-Desktop, etc.)
3. **Session Management**: Each device pair maintains its own Double Ratchet state, tracked by `(user_id, device_id)` tuples

This ensures that Bob can decrypt messages on any device, and each device has its own forward secrecy guarantees.

### 3. PQXDH: Post-Quantum X3DH

To prepare for quantum computers, Signal introduced **PQXDH**, which adds a post-quantum Key Encapsulation Mechanism (KEM) to X3DH.

Instead of relying solely on elliptic curve DH (vulnerable to Shor's algorithm), PQXDH combines:
- **Classical X3DH** (Curve25519)
- **Kyber KEM** (NIST-selected post-quantum algorithm)

The final shared secret: `SK = KDF(X3DH_secret || Kyber_secret)`

Even if a quantum computer breaks Curve25519, the Kyber component keeps messages secure.

## How Chatter Implements Signal Protocol

Now let's see how these cryptographic primitives translate into code.

### Prekey Bundle Management

In Chatter, the **Auth Service** manages prekey bundles. When a user registers, they upload their identity key, signed prekey, and a batch of one-time prekeys.

#### Uploading Prekeys

```go
// internal/services/auth/handlers/signal_prekeys.go
func (c *Context) UploadPreKeyBundle(
    ctx context.Context,
    req *connect.Request[pb.UploadPreKeyBundleRequest],
) (*connect.Response[emptypb.Empty], error) {
    // Get user ID from auth context
    userID, err := c.GetUserID(ctx)
    if err != nil {
        return nil, connect.NewError(connect.CodeUnauthenticated,
            fmt.Errorf("failed to get user ID: %v", err))
    }

    // Validate prekey bundle
    bundle := req.Msg.Bundle
    if bundle == nil {
        return nil, connect.NewError(connect.CodeInvalidArgument,
            fmt.Errorf("prekey bundle is required"))
    }

    // Validate key lengths (Signal Protocol format: 0x05 prefix + 32 bytes)
    if len(bundle.IdentityKey) != 33 {
        return nil, connect.NewError(connect.CodeInvalidArgument,
            fmt.Errorf("identity key must be 33 bytes"))
    }

    if len(bundle.SignedPrekey.Signature) != 64 {
        return nil, connect.NewError(connect.CodeInvalidArgument,
            fmt.Errorf("signed prekey signature must be 64 bytes"))
    }

    // Validate Kyber prekey if present (post-quantum cryptography)
    if bundle.KyberPrekey != nil {
        if len(bundle.KyberPrekey.PublicKey) != 1569 {
            return nil, connect.NewError(connect.CodeInvalidArgument,
                fmt.Errorf("kyber prekey public key must be 1569 bytes"))
        }
    }

    // Store the bundle using the service layer
    err = c.GetService().StorePreKeyBundle(ctx, userID, bundle)
    if err != nil {
        return nil, connect.NewError(connect.CodeInternal,
            fmt.Errorf("failed to store prekey bundle: %v", err))
    }

    return connect.NewResponse(&emptypb.Empty{}), nil
}
```

The prekeys are stored in PostgreSQL with atomic operations to ensure each one-time prekey is consumed exactly once.

#### Fetching Prekeys with Idempotency

When Alice wants to message Bob, she fetches his prekey bundle. The challenge: **one-time prekeys must be truly one-time** to prevent replay attacks.

> **Note**: The idempotency mechanism described here is **Chatter-specific** (not part of the Signal Protocol specification). It solves a practical engineering challenge: ensuring prekey consumption is atomic and retry-safe in a distributed system.

Chatter uses **atomic PostgreSQL updates with soft-delete tracking**:

```go
// internal/services/auth/repository/postgres/signal_protocol.go
// Atomic pop of one-time prekey (production-ready implementation)
const atomicPopQuery = `
    WITH picked AS (
      SELECT user_id, device_id, prekey_id, public_key
      FROM signal_one_time_prekeys
      WHERE user_id = $1 AND device_id = $2 AND used_at IS NULL
      ORDER BY created_at ASC
      FOR UPDATE SKIP LOCKED
      LIMIT 1
    )
    UPDATE signal_one_time_prekeys p
    SET used_at = NOW(), reserved_at = NOW(), reserved_by = $3, request_id = $4
    FROM picked
    WHERE p.user_id = picked.user_id
      AND p.device_id = picked.device_id
      AND p.prekey_id = picked.prekey_id
    RETURNING p.prekey_id, p.public_key
`

var oneTimePrekeyId *uint32
var oneTimePrekeyPublic []byte

err = tx.QueryRow(ctx, atomicPopQuery, userID, deviceId, requestingUserID, requestID).
    Scan(&oneTimePrekeyId, &oneTimePrekeyPublic)
if err != nil && !errors.Is(err, pgx.ErrNoRows) {
    return nil, fmt.Errorf("failed to atomically pop one-time prekey: %w", err)
}

// If no OTPK available and we have a fallback prekey, use it
if oneTimePrekeyId == nil && fallbackPrekeyId != nil && len(fallbackPrekeyPublic) > 0 {
    oneTimePrekeyId = fallbackPrekeyId
    oneTimePrekeyPublic = fallbackPrekeyPublic
    r.log.Warn("using fallback prekey - OTPKs depleted")
}
```

**Why this approach works**:
- **`FOR UPDATE SKIP LOCKED`**: Concurrent requests skip already-locked rows, preventing contention
- **Soft-delete with `used_at`**: Tracks which prekeys have been consumed without physical deletion
- **`reserved_by` + `request_id`**: Provides idempotency by tracking who requested which prekey
- **Fallback prekey**: Ensures session establishment even when OTPKs are depleted (with reduced forward secrecy until replenished)

**Fallback prekeys**: If all one-time prekeys are depleted, Chatter falls back to a **fallback prekey** (a long-lived prekey similar to the signed prekey). This ensures sessions can still be established even when OTPKs run out, though with slightly reduced forward secrecy until the pool is replenished.

### Sealed Sender: Hiding Metadata

The Signal Protocol doesn't just encrypt message content—it also hides **who sent the message** from the server. This is called **Sealed Sender**.

Instead of the server knowing "Alice sent a message to Bob," it only sees "someone sent an encrypted blob to Bob."

#### How Sealed Sender Works

1. **Certificate issuance**: Alice requests a **Sender Certificate** from the server
2. **Message encryption**: Alice encrypts the message using the existing Double Ratchet session keys established with Bob
3. **Certificate attachment**: Alice attaches her certificate (proving she's authorized) to the encrypted message envelope
4. **Server relay**: Server relays the blob to Bob without knowing who sent it
5. **Bob's verification**: Bob decrypts using the session keys, extracts the certificate, and validates it against the server's certificate chain

#### Certificate Generation in Chatter

Chatter uses a **three-tier certificate chain**:

```text
Root CA (Vault KMS)
    ↓ signs
Intermediate CA (deterministic key)
    ↓ signs
Sender Certificate (user's identity key + metadata)
```

> **Note**: This certificate hierarchy is **Chatter-specific** and inspired by Signal's sealed sender concept. The official Signal specification describes server-issued, short-lived sender certificates but doesn't mandate an exact certificate chain structure. We use short validity periods (24-48 hours) instead of revocation to maintain privacy and scalability.

Here's how we generate the intermediate certificate:

```go
// internal/services/auth/service/sealed_sender.go
func (s *serviceImpl) getOrGenerateServerCertificate(
    ctx context.Context,
) (*signalv1.ServerCertificate, []byte, error) {
    // Check cache first (read lock)
    cachedServerCertMutex.RLock()
    if cachedServerCert != nil && cachedIntermediateCurve25519Key != nil {
        cert := cachedServerCert
        key := cachedIntermediateCurve25519Key
        cachedServerCertMutex.RUnlock()
        return cert, key, nil
    }
    cachedServerCertMutex.RUnlock()

    // Get root CA key from Vault (Curve25519 for XEdDSA)
    signingKey, err := s.vaultClient.GetCurrentSigningKey(ctx)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to get server signing key from vault: %w", err)
    }

    rootCurve25519PrivateKey := signingKey.PrivateKey

    // Derive INTERMEDIATE Curve25519 keypair deterministically from root CA key
    // This ensures the ServerCertificate is always the same for the same root CA
    hasher := sha256.New()
    hasher.Write([]byte("Signal-Server-Intermediate-Key-v1"))
    hasher.Write(rootCurve25519PrivateKey)
    intermediateCurve25519PrivateKey := hasher.Sum(nil) // 32-byte seed

    // Convert the intermediate key to Ed25519 using XEdDSA (handles s=0 enforcement)
    intermediateEdPrivateKey, err := crypto.Curve25519ToEd25519PrivateKey(intermediateCurve25519PrivateKey)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to convert intermediate key to Ed25519: %w", err)
    }

    // Get the Ed25519 public key
    intermediateEdPublicKey := intermediateEdPrivateKey.Public().(ed25519.PublicKey)

    // Convert the Ed25519 public key to Curve25519 using the birational map
    intermediateCurve25519PublicKey, err := crypto.EdwardsToMontgomeryPublic(intermediateEdPublicKey)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to compute intermediate public key: %w", err)
    }

    // Add Signal Protocol DJB type byte (0x05) to the 32-byte Curve25519 public key
    intermediatePublicKeyWithType := append([]byte{0x05}, intermediateCurve25519PublicKey...)

    // Create ServerCertificate inner (contains intermediate Curve25519 public key)
    keyID := signingKey.KeyID
    serverCertInner := &signalv1.ServerCertificate_Certificate{
        Id:  &keyID,
        Key: intermediatePublicKeyWithType, // 33 bytes: 0x05 + 32-byte Curve25519 public key
    }

    serverCertInnerBytes, err := proto.Marshal(serverCertInner)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to marshal server certificate inner: %w", err)
    }

    // Sign with ROOT CA Curve25519 private key using XEdDSA
    serverCertSignature, err := crypto.SignXEdDSA(rootCurve25519PrivateKey, serverCertInnerBytes)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to sign server certificate with XEdDSA: %w", err)
    }

    // Verify signature (self-check)
    rootEdPrivateKey, err := crypto.Curve25519ToEd25519PrivateKey(rootCurve25519PrivateKey)
    if err != nil {
        return nil, nil, fmt.Errorf("failed to convert root key for verification: %w", err)
    }
    rootEdPublicKey := rootEdPrivateKey.Public().(ed25519.PublicKey)
    if !ed25519.Verify(rootEdPublicKey, serverCertInnerBytes, serverCertSignature) {
        return nil, nil, fmt.Errorf("server certificate XEdDSA signature self-verification failed")
    }

    // Create ServerCertificate
    serverCert := &signalv1.ServerCertificate{
        Certificate: serverCertInnerBytes,
        Signature:   serverCertSignature,
    }

    // Cache it globally
    cachedServerCert = serverCert
    cachedIntermediateCurve25519Key = intermediateCurve25519PrivateKey

    return serverCert, intermediateCurve25519PrivateKey, nil
}
```

#### XEdDSA: Bridging Curve25519 and Ed25519

Signal Protocol uses **Curve25519** for DH key exchange but needs **Ed25519** for signatures on **prekeys and certificates** (not on normal message payloads). **XEdDSA** is a signature scheme that lets you sign with a Curve25519 key by converting it to Ed25519 coordinates.

This is critical for Sealed Sender because:
- User identity keys are Curve25519 (for X3DH key exchange)
- Prekeys and certificates need Ed25519 signatures (for verification)
- Normal messages use symmetric authentication within the Double Ratchet (no public-key signatures)

The conversion happens in Chatter's crypto layer, interfacing with Vault KMS for the root signing key.

#### Issuing Sender Certificates

When a user requests a certificate:

```go
func (s *serviceImpl) RequestSenderCertificate(
    ctx context.Context,
    userID string,
    deviceID uint32,
    validityPeriodProto *durationpb.Duration,
) (*chatauth.RequestSenderCertificateResponse, error) {
    // Convert protobuf Duration to time.Duration
    var validityPeriod time.Duration
    if validityPeriodProto != nil {
        validityPeriod = validityPeriodProto.AsDuration()
    }

    // Validate validity period
    if validityPeriod > MaxCertificateValidityDays*24*time.Hour {
        validityPeriod = MaxCertificateValidityDays * 24 * time.Hour
    }
    if validityPeriod <= 0 {
        validityPeriod = DefaultCertificateValidityDays * 24 * time.Hour
    }

    // Get or generate the pre-cached ServerCertificate (Signal-style)
    serverCert, intermediateCurve25519PrivateKey, err := s.getOrGenerateServerCertificate(ctx)
    if err != nil {
        return nil, fmt.Errorf("failed to get server certificate: %w", err)
    }

    // Get user's identity public key (from Signal Protocol bundle)
    identityKey, err := s.repo.GetUserIdentityPublicKey(ctx, userID)
    if err != nil {
        return nil, fmt.Errorf("failed to get user identity key: %w", err)
    }

    // Validate identity key format for Signal Protocol
    if len(identityKey) != 33 {
        return nil, fmt.Errorf("invalid identity key length: expected 33 bytes, got %d bytes", len(identityKey))
    }

    // Signal Protocol identity keys should start with 0x05 (DJB type prefix)
    if identityKey[0] != 0x05 {
        return nil, fmt.Errorf("invalid identity key prefix: got 0x%02x, expected 0x05", identityKey[0])
    }

    // Calculate expiration
    now := time.Now().UTC()
    expiresAt := now.Add(validityPeriod)
    expiresMillis := uint64(expiresAt.UnixMilli())

    // Create inner SenderCertificate.Certificate exactly like Signal-Server does
    senderCertInner := &signalv1.SenderCertificate_Certificate{
        SenderDevice: &deviceID,
        Expires:      &expiresMillis,
        IdentityKey:  identityKey,  // User's Signal Protocol identity key (33 bytes with type byte)
        Signer:       serverCert,    // Nested ServerCertificate object
        SenderUuid:   &userID,
    }

    // Serialize inner certificate
    senderCertInnerBytes, err := proto.Marshal(senderCertInner)
    if err != nil {
        return nil, fmt.Errorf("failed to marshal sender certificate inner: %w", err)
    }

    // Sign inner certificate with INTERMEDIATE Curve25519 server private key using XEdDSA
    senderCertSignature, err := crypto.SignXEdDSA(intermediateCurve25519PrivateKey, senderCertInnerBytes)
    if err != nil {
        return nil, fmt.Errorf("failed to sign sender certificate with XEdDSA: %w", err)
    }

    // Create outer SenderCertificate (this is what libsignal deserializes)
    senderCert := &signalv1.SenderCertificate{
        Certificate: senderCertInnerBytes,
        Signature:   senderCertSignature,
    }

    // Serialize final certificate to protobuf bytes
    senderCertBytes, err := proto.Marshal(senderCert)
    if err != nil {
        return nil, fmt.Errorf("failed to marshal sender certificate: %w", err)
    }

    // Extract key ID from ServerCertificate for response
    serverCertInner := &signalv1.ServerCertificate_Certificate{}
    proto.Unmarshal(serverCert.Certificate, serverCertInner)

    // Calculate refresh time (refresh before expiration)
    refreshAfter := expiresAt.Add(-RefreshCertificateBeforeDays * 24 * time.Hour)
    if refreshAfter.Before(now) {
        refreshAfter = now.Add(1 * time.Hour)
    }

    // Return response with protobuf certificate (compatible with libsignal)
    return &chatauth.RequestSenderCertificateResponse{
        Certificate: &chatcommon.SenderCertificate{
            Certificate: senderCertBytes, // Signal Protocol protobuf format
            ExpiresAt:   uint64(expiresAt.Unix()),
            UserId:      userID,
            DeviceId:    deviceID,
            ServerKeyId: *serverCertInner.Id,
        },
        RefreshAfter: timestamppb.New(refreshAfter),
    }, nil
}
```

**Privacy by design**: Sender certificates are **never stored server-side**. They're issued on-demand and the client holds them. The server can't retroactively de-anonymize messages.

### Message Service Integration

The **Message Service** performs lightweight validation on sealed sender messages:

```go
// internal/services/message/service/sealed_sender_validator.go
func (s *serviceImpl) ValidateSealedSenderCertificate(
    ctx context.Context,
    certificateBytes []byte,
    serverKeyID uint32,
) error {
    // Parse the Signal Protocol SenderCertificate protobuf
    senderCert := &signalv1.SenderCertificate{}
    if err := proto.Unmarshal(certificateBytes, senderCert); err != nil {
        return fmt.Errorf("failed to parse Signal Protocol certificate: %w", err)
    }

    // Parse inner certificate
    innerCert := &signalv1.SenderCertificate_Certificate{}
    if err := proto.Unmarshal(senderCert.Certificate, innerCert); err != nil {
        return fmt.Errorf("failed to parse inner certificate: %w", err)
    }

    // Get server trust root from Vault to verify signature
    signingKey, err := s.GetVaultClient().GetCurrentSigningKey(ctx)
    if err != nil {
        return fmt.Errorf("failed to get server trust root from vault: %w", err)
    }

    // Verify the server_key_id matches
    if serverCertInner.Id == nil || *serverCertInner.Id != signingKey.KeyID {
        return fmt.Errorf("certificate server_key_id mismatch")
    }

    // Verify certificate hasn't expired (milliseconds timestamp)
    expiresAt := time.UnixMilli(int64(*innerCert.Expires))
    if time.Now().UTC().After(expiresAt) {
        return fmt.Errorf("certificate expired at %s", expiresAt)
    }

    // Verify Ed25519 signature on inner certificate
    if !ed25519.Verify(signingKey.PublicKey, senderCert.Certificate, senderCert.Signature) {
        return fmt.Errorf("invalid certificate signature")
    }

    return nil
}
```

**Important**: The server performs **minimal validation** on sealed messages:
- Message structure and size (minimum 48 bytes for Signal Protocol envelope)
- Timestamp freshness (not too old, not in the future)
- `server_key_id` matches current Vault signing key

The server **cannot and does not**:
- Extract sender identity from the sealed envelope (that would break privacy)
- Validate the certificate inside the envelope (only recipients can decrypt it)
- Track sender-receiver mappings

The server only knows:
- The message is **for** Bob (routing information)
- The certificate is structurally valid and not expired
- It does **not** know it's from Alice (metadata privacy preserved)

## Post-Quantum Readiness

Chatter's Signal Protocol implementation supports **Kyber** prekeys (NIST's post-quantum KEM standard).

When uploading prekeys, clients can optionally include a Kyber public key:

```go
type PreKeyBundle struct {
    IdentityKey    []byte          // Curve25519
    SignedPreKey   *SignedPreKey   // Curve25519 + Ed25519 signature
    OneTimePreKeys []*OneTimePreKey // Curve25519
    KyberPreKey    *KyberPreKey    // Post-quantum KEM
}
```

During X3DH, if a Kyber prekey is available:

```text
Classical_Secret = X3DH(IK, SPK, OTPK)
PQ_Secret = Kyber_Decapsulate(ciphertext, private_key)
Final_Secret = KDF(Classical_Secret || PQ_Secret)
```

This hybrid approach provides:
- Security **today** with Curve25519
- Security **tomorrow** against quantum computers with Kyber

## Key Rotation and Hygiene

Chatter implements best practices for key lifecycle management:

### Signed Prekey Rotation

Signed prekeys should be rotated periodically (every 7-30 days) to limit exposure. The rotation process involves:

1. **Generating a new signed prekey** on the client side
2. **Uploading the new prekey** via `UploadPreKeyBundle` (which uses `ON CONFLICT ... DO UPDATE` to replace the old one)
3. **Client-side rotation schedule** - clients track the prekey age and trigger rotation automatically

In Chatter's current implementation, clients are responsible for:
- Tracking when their signed prekey was created (via the `timestamp` field)
- Generating a new signed prekey when it's approaching the rotation threshold
- Uploading the new bundle (the server's `ON CONFLICT` clause ensures atomic replacement)

This client-driven approach ensures that:
- The server never holds multiple signed prekeys per device (simplifying key management)
- Clients maintain control over their key lifecycle
- Old sessions continue working during rotation (they use the established Double Ratchet state)

### One-Time Prekey Replenishment

Clients monitor their OTPK pool and replenish when running low:

```go
// internal/services/auth/handlers/signal_prekeys.go
func (c *Context) RefreshPreKeys(
    ctx context.Context,
    req *connect.Request[pb.RefreshPreKeysRequest],
) (*connect.Response[emptypb.Empty], error) {
    // Get user ID from auth context
    userID, err := c.GetUserID(ctx)
    if err != nil {
        return nil, connect.NewError(connect.CodeUnauthenticated,
            fmt.Errorf("failed to get user ID: %v", err))
    }

    // Validate new prekeys
    if len(req.Msg.NewOneTimePrekeys) == 0 {
        return nil, connect.NewError(connect.CodeInvalidArgument,
            fmt.Errorf("at least one new prekey is required"))
    }

    // Validate each prekey (Signal Protocol: 0x05 prefix + 32 bytes)
    for i, prekey := range req.Msg.NewOneTimePrekeys {
        if len(prekey.PublicKey) != 33 {
            return nil, connect.NewError(connect.CodeInvalidArgument,
                fmt.Errorf("prekey %d: public key must be 33 bytes", i))
        }
    }

    // Add new prekeys using service layer
    err = c.GetService().AddOneTimePreKeys(ctx, userID, req.Msg.NewOneTimePrekeys)
    if err != nil {
        return nil, connect.NewError(connect.CodeInternal,
            fmt.Errorf("failed to add new prekeys: %v", err))
    }

    return connect.NewResponse(&emptypb.Empty{}), nil
}
```

Clients can check their prekey stats:

```go
// internal/services/auth/handlers/signal_prekeys.go
func (c *Context) GetPreKeyStats(
    ctx context.Context,
    req *connect.Request[pb.GetPreKeyStatsRequest],
) (*connect.Response[pb.GetPreKeyStatsResponse], error) {
    userID, err := c.GetUserID(ctx)
    if err != nil {
        return nil, connect.NewError(connect.CodeUnauthenticated,
            fmt.Errorf("failed to get user ID: %v", err))
    }

    // Default device ID to 1 if not provided
    deviceID := req.Msg.DeviceId
    if deviceID == 0 {
        deviceID = 1
    }

    // Get prekey statistics from service layer
    availableCount, shouldRefill, err := c.GetService().GetSignalPreKeyStats(ctx, userID, deviceID)
    if err != nil {
        return nil, connect.NewError(connect.CodeInternal,
            fmt.Errorf("failed to get prekey stats: %v", err))
    }

    return connect.NewResponse(&pb.GetPreKeyStatsResponse{
        AvailableCount: availableCount,
        ShouldRefill:   shouldRefill,  // true when less than 20 prekeys remaining
        DeviceId:       deviceID,
    }), nil
}
```

## Security Properties Achieved

By implementing the Signal Protocol, Chatter provides:

| Property | Mechanism |
|----------|-----------|
| **Perfect Forward Secrecy** | Symmetric key ratchet (KDF chain) |
| **Post-Compromise Security** | Asymmetric key ratchet (DH ratchet) |
| **Asynchronous messaging** | X3DH prekey bundles |
| **Metadata privacy** | Sealed Sender certificates |
| **Quantum resistance** | Hybrid Kyber + Curve25519 |
| **Deniable authentication** | Symmetric message authentication (no signatures on messages; prekeys are signed, transcripts are deniable) |

## Design Decisions and Trade-offs

### Why Not TLS?

TLS provides transport security (server ↔ client), but the server can still read messages. Signal Protocol provides **end-to-end encryption**—even Chatter's servers can't decrypt messages.

### Vault KMS for Root CA

We use **HashiCorp Vault** for the root signing key instead of storing it in the database:

- **Security**: Key never leaves Vault's HSM
- **Auditability**: All signing operations are logged
- **Rotation**: Can rotate root CA without code changes

### Stateless Certificates

Sender certificates are **not stored** server-side. This means:

- **Privacy**: Can't retroactively de-anonymize senders
- **Scalability**: No database writes for certificate issuance
- **Trade-off**: Can't revoke individual certificates (rely on expiration)

For revocation, we use short validity periods (24-48 hours) and rely on clients refreshing certificates regularly.

## Conclusion: Cryptographic Elegance Meets Practical Engineering

The Signal Protocol is a masterclass in applied cryptography: it combines DH key exchange, symmetric ratcheting, KDF chains, and signature schemes into a coherent system that's both **secure** and **usable**.

Implementing it in Chatter required:
- Deep understanding of X3DH and Double Ratchet
- Careful key lifecycle management (generation, storage, rotation, deletion)
- Atomic database operations for one-time prekey consumption
- Certificate chain validation with XEdDSA
- Post-quantum readiness with Kyber

The result: **end-to-end encrypted messaging** with metadata privacy, forward secrecy, and quantum resistance—all while supporting asynchronous communication and multi-device accounts.

---

**Key Takeaways:**

1. **Signal Protocol = X3DH + Double Ratchet + Sealed Sender**
2. **Perfect Forward Secrecy** from symmetric key ratcheting
3. **Post-Compromise Security** from DH ratcheting
4. **Metadata privacy** from Sealed Sender certificates
5. **Quantum resistance** from hybrid Kyber + Curve25519
6. **Idempotency is critical** for one-time prekey consumption
7. **Vault KMS** for root certificate signing keys
8. **Stateless certificates** for privacy and scalability

Cryptography isn't just math—it's about building systems that protect users even when everything else fails.
