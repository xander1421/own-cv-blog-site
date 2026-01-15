---
title: "Breaking the Metadata Chain: Implementing Anonymous Inboxes in Chatter"
date: "2026-01-15"
description: "How we implemented anonymous mailboxes with blind signatures to defeat Statistical Disclosure Attacks, based on the NDSS 2021 paper 'Improving Signal's Sealed Sender'"
tags: ["Cryptography", "Security", "Privacy", "Go", "TypeScript"]
image: "./anonymous-inbox-implementation-in-chatter.webp"

---

End-to-end encryption protects message content, but metadata can be just as dangerous. When Alice sends Bob a message, even with sealed sender encryption, the server learns *something happened* between them. Over time, patterns emerge. Delivery receipts create timing correlations. And with enough observations, statistical analysis can de-anonymize even "sealed" senders.

This post explores how we implemented **Anonymous Inboxes** in Chatter to break this metadata chain, based on the 2021 NDSS paper ["Improving Signal's Sealed Sender"](https://www.ndss-symposium.org/wp-content/uploads/ndss2021_1C-4_24180_paper.pdf) by Martiny et al.

## The Problem: Statistical Disclosure Attacks

Signal's sealed sender feature hides the sender's identity from the server. Instead of seeing "Alice → Bob", Signal only sees "? → Bob". Sounds private, right?

Not quite. The paper demonstrates a devastating attack: **Statistical Disclosure Attacks (SDAs)** can de-anonymize sealed sender users in as few as 5-10 messages.

### How the Attack Works

The attack exploits a simple observation: **delivery receipts are sent immediately after receiving a message**.

When Alice sends Bob a sealed sender message:
1. Bob's device automatically sends a delivery receipt back to Alice
2. This receipt is also sealed sender (? → Alice)
3. But the *timing* creates a correlation

The server monitors "epochs" (time windows) after Bob receives messages:

```
Bob receives sealed message at T₀
    → In the epoch [T₀, T₀ + 1s], someone receives a delivery receipt
    → Over many messages, Alice consistently appears in these epochs
    → Alice is statistically identified as Bob's correspondent
```

The paper's simulations show that with 1 million users and realistic message patterns, a single correspondent can be uniquely identified after **fewer than 10 messages**.

### Why This Matters

You might think: "Just disable delivery receipts." But:
1. Signal's delivery receipts **cannot be disabled** by users
2. Even without receipts, normal reply patterns create timing correlations
3. VPNs and Tor don't help—this attack works at the application layer

The fundamental problem: **both users communicate via their long-term identities**. Over time, any correlation between these identities can be exploited.

## The Solution: Ephemeral Anonymous Mailboxes

The paper proposes a elegant solution: **decouple user identity from mailbox identity** using ephemeral key pairs and blind signatures.

### Core Concepts

1. **Ephemeral Mailboxes**: Each conversation uses fresh Ed25519 key pairs. The server sees mailbox addresses, never user identities.

2. **Blind Signatures**: Users obtain "tokens" to create mailboxes without the server learning which user created which mailbox.

3. **Two-Way Exchange**: Alice embeds her ephemeral mailbox address in her first message. Bob does the same in his reply. Future messages route through these anonymous mailboxes.

### The Privacy Guarantee

After the initial message exchange:
- Server knows: Mailbox A sends to Mailbox B
- Server doesn't know: Alice owns Mailbox A, Bob owns Mailbox B

**Why can't the server link mailboxes to users?** The answer lies in the mathematics of blind signatures:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      BLIND SIGNATURE PROTOCOL                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ALICE (authenticated)                         SERVER                      │
│   ─────────────────────                         ──────                      │
│                                                                             │
│   1. Generate ephemeral keypair (pk, sk)                                    │
│   2. Hash: h = SHA256(pk)                                                   │
│   3. Generate random r (coprime to n)                                       │
│   4. Blind: m' = h × rᵉ mod n                                               │
│                                                                             │
│              ══════════ m' (blinded) ══════════════►                        │
│                                                                             │
│                                         5. Sign: s' = (m')ᵈ mod n           │
│                                            Server ONLY sees m'              │
│                                            (looks like random garbage)      │
│                                                                             │
│              ◄════════ s' (blind signature) ═══════                         │
│                                                                             │
│   6. Unblind: s = s' × r⁻¹ mod n                                            │
│      Result: s is valid signature on h                                      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│   THE MATH GUARANTEE:                                                       │
│                                                                             │
│   • Server sees: m' = h × rᵉ mod n         (random-looking, h is hidden)    │
│   • Server computes: s' = (m')ᵈ = hᵈ × r mod n                              │
│   • Alice unblinds: s = s' × r⁻¹ = hᵈ mod n   (valid RSA signature on h)    │
│                                                                             │
│   The blinding factor r perfectly masks h. The server cannot reverse        │
│   the blinding to learn which ephemeral public key Alice is signing.        │
└─────────────────────────────────────────────────────────────────────────────┘
```

**The result**: Two completely separate server logs with no cryptographic connection:

| Authenticated Log | Anonymous Log |
|-------------------|---------------|
| "User Alice requested 3 tokens at 10:00" | "Mailbox `a1b2c3...` created at 10:05" |
| "User Bob requested 2 tokens at 10:02" | "Mailbox `x7y8z9...` created at 10:03" |

The server cannot determine which user created which mailbox—even with complete access to both logs.

Even if the server logs every message, it cannot link mailboxes to user identities because:
- Mailbox creation used blind signatures (cryptographically unlinkable to user)
- Mailbox authentication uses challenge-response (proves key ownership, not identity)
- No `user_id` field exists in the mailbox database table

## Backend Implementation

Here's how we implemented this in Chatter's Go backend.

### Database Schema: Privacy by Design

The critical design decision: **no `user_id` column in the mailbox table**.

```sql
CREATE TABLE ephemeral_mailboxes (
    id UUID PRIMARY KEY,
    public_key BYTEA NOT NULL,           -- Ed25519 key (32 bytes)
    public_key_hash BYTEA NOT NULL UNIQUE, -- SHA-256 for lookups
    created_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    last_polled_at TIMESTAMPTZ,
    message_count INT,
    is_active BOOLEAN
    -- NOTABLY: NO user_id column
);

-- Separate table for quota tracking (user-linked)
CREATE TABLE mailbox_token_grants (
    user_id UUID REFERENCES users(id),
    grant_date DATE,
    tokens_issued INT,
    max_daily_tokens INT DEFAULT 10,
    CONSTRAINT unique_user_date UNIQUE (user_id, grant_date)
);

-- Spent signatures (prevents double-spending)
CREATE TABLE spent_mailbox_signatures (
    signature_hash BYTEA PRIMARY KEY,    -- SHA-256 of signature
    spent_at TIMESTAMPTZ DEFAULT NOW()
);
```

The `mailbox_token_grants` table links users to quotas, but the **tokens themselves are cryptographically unlinkable** to the mailboxes they create.

### Blind Signature Protocol

We implement Chaum's RSA blind signature scheme (1982):

```go
// internal/utils/crypto/blind_signature.go
type BlindSigner struct {
    privateKey *rsa.PrivateKey
    publicKey  *rsa.PublicKey
}

// Server signs blinded message without seeing the original
func (s *BlindSigner) SignBlinded(blindedMsg []byte) ([]byte, error) {
    // s' = blinded^d mod n
    blindedInt := new(big.Int).SetBytes(blindedMsg)
    signed := new(big.Int).Exp(blindedInt, s.privateKey.D, s.privateKey.N)
    return signed.Bytes(), nil
}

// Verify unblinded signature (used during mailbox creation)
func (s *BlindSigner) Verify(message, signature []byte) bool {
    // m' = s^e mod n, compare to padded(hash(message))
    sigInt := new(big.Int).SetBytes(signature)
    decrypted := new(big.Int).Exp(sigInt,
        big.NewInt(int64(s.publicKey.E)), s.publicKey.N)
    expected := pkcs1Pad(sha256Hash(message), 256)
    return bytes.Equal(decrypted.Bytes(), expected)
}
```

### The Token Issuance Flow

**Step 1: User requests tokens (authenticated)**

```go
func (s *serviceImpl) IssueTokens(ctx context.Context, userID string,
    blindedKeys [][]byte) ([][]byte, int, error) {

    // Check daily quota
    grant, err := s.repo.GetOrCreateGrant(ctx, userID, time.Now())
    if grant.TokensIssued >= grant.MaxDailyTokens {
        return nil, 0, ErrQuotaExceeded
    }

    // Sign each blinded key (server never sees actual ephemeral PKs)
    signatures := make([][]byte, len(blindedKeys))
    for i, blinded := range blindedKeys {
        sig, err := s.signer.SignBlinded(blinded)
        signatures[i] = sig
    }

    // Update quota
    s.repo.IncrementTokensIssued(ctx, grant.ID, len(signatures))

    return signatures, grant.MaxDailyTokens - grant.TokensIssued - len(signatures), nil
}
```

**Step 2: User creates mailbox (anonymous)**

```go
func (s *serviceImpl) CreateMailbox(ctx context.Context,
    publicKey, signature []byte, ttlSeconds uint64) (string, time.Time, error) {

    // No authentication header - completely anonymous request

    // Verify blind signature is valid
    if !s.signer.Verify(publicKey, signature) {
        return "", time.Time{}, ErrInvalidSignature
    }

    // Check signature hasn't been spent
    sigHash := sha256.Sum256(signature)
    if s.repo.IsSignatureSpent(ctx, sigHash[:]) {
        return "", time.Time{}, ErrSignatureAlreadySpent
    }

    // Mark signature as spent (atomic)
    s.repo.MarkSignatureSpent(ctx, sigHash[:])

    // Create mailbox with SHA-256(publicKey) as lookup key
    mailbox := &EphemeralMailbox{
        ID:            uuid.New().String(),
        PublicKey:     publicKey,
        PublicKeyHash: sha256.Sum256(publicKey)[:],
        ExpiresAt:     time.Now().Add(time.Duration(ttlSeconds) * time.Second),
        IsActive:      true,
    }

    s.repo.CreateMailbox(ctx, mailbox)
    return mailbox.ID, mailbox.ExpiresAt, nil
}
```

### Challenge-Response Authentication

To poll a mailbox, users must prove they own the private key—without revealing their identity:

```go
func (s *serviceImpl) PollMailbox(ctx context.Context,
    publicKey, challengeSig, challenge []byte,
    afterID string, limit int) ([]*EphemeralMessage, bool, error) {

    // Look up mailbox by public key hash (not ID)
    pkHash := sha256.Sum256(publicKey)
    mailbox, err := s.repo.GetMailboxByPKHash(ctx, pkHash[:])

    // Retrieve and delete challenge atomically (one-time use)
    storedChallenge, err := s.repo.GetAndDeleteChallenge(ctx, pkHash[:])
    if !bytes.Equal(storedChallenge, challenge) {
        return nil, false, ErrInvalidChallenge
    }

    // Verify Ed25519 signature proves key ownership
    if !ed25519.Verify(publicKey, challenge, challengeSig) {
        return nil, false, ErrInvalidSignature
    }

    // Fetch messages (pagination via afterID)
    messages, hasMore := s.repo.GetMessages(ctx, mailbox.ID, afterID, limit)
    return messages, hasMore, nil
}
```

### Privacy-Safe Logging

We explicitly prevent correlation in logs:

```go
// PRIVACY GUIDELINES:
// 1. NEVER log userID and mailboxID in same line
// 2. Mailbox operations log only truncated mailbox_id
// 3. Token issuance may log userID (authenticated context)

func truncateID(id string) string {
    if len(id) > 8 {
        return id[:8] + "..."
    }
    return id
}

// Safe: mailbox context
s.log.Info("mailbox polled",
    "mailbox_id", truncateID(mailbox.ID),
    "messages_retrieved", len(messages),
)

// Safe: user context (separate operation)
s.log.Info("tokens issued",
    "user_id", userID,
    "count", len(signatures),
)
```

## Frontend Implementation

The client handles key generation, blind signatures, and message routing.

### Client-Side Blind Signatures

```typescript
// frontend/src/lib/ephemeral-mailbox/blind-signature.ts

class BlindClient {
  private n: bigint;  // RSA modulus
  private e: bigint;  // RSA exponent

  async blind(message: Uint8Array): Promise<{
    blinded: Uint8Array;
    blindingFactor: Uint8Array;
  }> {
    // Hash the ephemeral public key
    const msgHash = await crypto.subtle.digest('SHA-256', message);
    const padded = pkcs1Pad(new Uint8Array(msgHash), 256);
    const m = bytesToBigInt(padded);

    // Generate random blinding factor r (coprime to n)
    const r = await generateCoprime(this.n);

    // Blind: blinded = m * r^e mod n
    const rPowE = modPow(r, this.e, this.n);
    const blinded = (m * rPowE) % this.n;

    return {
      blinded: bigIntToBytes(blinded, 256),
      blindingFactor: bigIntToBytes(r, 256),
    };
  }

  unblind(blindSig: Uint8Array, blindingFactor: Uint8Array): Uint8Array {
    const sPrime = bytesToBigInt(blindSig);
    const r = bytesToBigInt(blindingFactor);

    // Unblind: s = s' * r^(-1) mod n
    const rInv = modInverse(r, this.n);
    const s = (sPrime * rInv) % this.n;

    return bigIntToBytes(s, 256);
  }
}
```

### The Two-Way Flow

Here's how two users establish a private channel:

```typescript
// Alice initiates conversation
async function sendFirstMessage(recipientId: string, text: string) {
  // 1. Create Alice's ephemeral mailbox
  const aliceMailbox = await ephemeralMailboxManager.createMailbox();

  // 2. Build message with embedded reply address
  const content = {
    type: 'chat_message',
    text: text,
    ephemeralReplyTo: base64Encode(aliceMailbox.publicKey),  // 32 bytes
    sentAt: Date.now(),
  };

  // 3. Encrypt with sealed sender (hides Alice's identity)
  const envelope = await sealedSenderEncrypt(recipientId, JSON.stringify(content));

  // 4. Send to Bob's device inbox (long-term identity, necessary for bootstrap)
  await sendSealedSenderMessage(recipientId, envelope);

  // 5. Start polling Alice's new mailbox for Bob's reply
  ephemeralMailboxManager.startPolling(aliceMailbox);
}
```

```typescript
// Bob receives and replies
async function handleIncomingMessage(envelope: Uint8Array) {
  // 1. Decrypt sealed sender message
  const { senderId, plaintext } = await sealedSenderDecrypt(envelope);
  const content = JSON.parse(plaintext);

  // 2. Extract Alice's ephemeral mailbox address
  if (content.ephemeralReplyTo) {
    const aliceMailboxPK = base64Decode(content.ephemeralReplyTo);
    await storeTheirEphemeralPK(conversationId, aliceMailboxPK);
  }

  // 3. When Bob replies: create his own mailbox
  const bobMailbox = await ephemeralMailboxManager.createMailbox();

  // 4. Send reply to Alice's MAILBOX (not device inbox)
  const reply = {
    type: 'chat_message',
    text: 'Hey Alice!',
    ephemeralReplyTo: base64Encode(bobMailbox.publicKey),
    sentAt: Date.now(),
  };

  const replyEnvelope = await sealedSenderEncrypt(senderId, JSON.stringify(reply));

  // 5. Send to Alice's ephemeral mailbox (anonymous endpoint)
  await anonymousMailboxClient.sendToMailbox({
    destinationPublicKey: aliceMailboxPK,
    envelope: replyEnvelope,
  });
}
```

After this exchange:
- Alice's future messages → Bob's ephemeral mailbox
- Bob's future messages → Alice's ephemeral mailbox
- Server sees: Mailbox₁ ↔ Mailbox₂ (no user identities)

### Anti-Correlation Polling

To prevent timing analysis on polling patterns:

```typescript
// frontend/src/lib/ephemeral-mailbox/polling-config.ts

const POLLING_CONFIG = {
  baseInterval: 2000,        // 2 seconds
  jitterPercent: 50,         // ±50% randomization
  backoffMultiplier: 1.5,    // Exponential backoff when idle
  maxInterval: 30000,        // Cap at 30 seconds
  postMessageDelay: [300, 1500],  // Random delay after sending
  initialStagger: [0, 10000],     // Stagger first poll
};

function getNextPollInterval(consecutiveEmpty: number): number {
  const base = POLLING_CONFIG.baseInterval;
  const backoff = Math.pow(POLLING_CONFIG.backoffMultiplier, consecutiveEmpty);
  const interval = Math.min(base * backoff, POLLING_CONFIG.maxInterval);

  // Add jitter: ±50%
  const jitter = interval * POLLING_CONFIG.jitterPercent / 100;
  return interval + (Math.random() * 2 - 1) * jitter;
}
```

## Comparison to the Paper

| Paper Proposal | Chatter Implementation |
|----------------|------------------------|
| Ephemeral mailbox IDs | Ed25519 public keys (32 bytes), SHA-256 for lookup |
| Server unlinkability | No `user_id` in mailbox table |
| Quota enforcement | Per-user daily tokens (default: 10) |
| Anonymous token issuance | RSA-2048 Chaum blind signatures |
| Sender anonymity | Anonymous `SendToMailbox` endpoint |
| Receiver authentication | Ed25519 challenge-response |
| Forward secrecy | Daily RSA signing key rotation |
| Token replay prevention | `spent_mailbox_signatures` table |
| Mailbox expiry | Configurable TTL (default: 7 days) |

### Extensions Beyond the Paper

1. **Reactions**: Emoji reactions routed through mailboxes
2. **Typing Indicators**: Encrypted, indistinguishable from chat messages
3. **Adaptive Polling**: Exponential backoff with jitter
4. **Message Types**: Read receipts, delivery receipts, reactions all via mailbox
5. **Temporal Workflows**: Reliable cleanup of expired mailboxes

## Deployment Considerations

### Cost Estimate

The paper estimates running blind signatures for 10 million mailboxes per day:
- **Compute**: ~$10/month (AWS Lambda for RSA operations)
- **Database**: ~$20/month (DynamoDB for signature tracking)
- **Total**: **~$40/month** for 10 million daily mailboxes

### Key Rotation

We rotate RSA signing keys daily with overlapping validity:
- Day N: Keys valid for Day N and N+1
- Day N+1: Keys valid for Day N+1 and N+2
- Clients fetch new keys daily; old keys remain valid for in-flight tokens

### Graceful Degradation

If mailbox creation fails:
1. Message still sends via device inbox (less private, but functional)
2. Token manager auto-refreshes when pool runs low
3. Mailbox rotation handles expired mailboxes gracefully

## Conclusion

Anonymous Inboxes represent a significant privacy upgrade over basic sealed sender. By decoupling user identity from mailbox identity through blind signatures, we defeat statistical disclosure attacks that could otherwise de-anonymize users in just a few messages.

The key insight from the paper: **one-sided anonymity doesn't compose**. Hiding the sender isn't enough when timing correlations across multiple messages reveal patterns. True conversation privacy requires:

1. **Ephemeral identities** (mailboxes) for both parties
2. **Unlinkable token issuance** (blind signatures)
3. **Anonymous operations** (no auth headers)
4. **Timing countermeasures** (jitter, backoff)

We've implemented all of these in Chatter, following the paper's recommendations closely while adding practical features like reactions and typing indicators.

For users communicating over sensitive topics—journalists with sources, activists in repressive regimes, or anyone who values metadata privacy—anonymous inboxes provide a meaningful privacy guarantee that sealed sender alone cannot offer.

---

*This implementation is based on "Improving Signal's Sealed Sender" by Martiny et al., presented at NDSS 2021. The paper is available at [ndss-symposium.org](https://www.ndss-symposium.org/wp-content/uploads/ndss2021_1C-4_24180_paper.pdf).*
