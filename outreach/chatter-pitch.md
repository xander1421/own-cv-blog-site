# Chatter team-pilot positioning

Live pilot page: **https://www.alexpruteanu.cloud/chatter-teams/**
Technical handover brief: **https://www.alexpruteanu.cloud/chatter-teams/deployment/**

Use the pilot page for team and IT-partner outreach. The general product overview
and demonstrations remain at `/chatter-waitlist/`. Only send to recipients whose
source and country-specific requirements have been reviewed; a footer alone does
not establish legal compliance.

The offer is a supported self-hosted evaluation for two small teams, ideally
5–15 people, lasting 60 days. The team covers VM hosting; setup, maintenance,
updates and bug fixes have no service fee during the pilot. Availability, devices,
features, backups, restore and handover are agreed before deploying. Optional
ongoing maintenance is discussed before the pilot starts, with no obligation.
Do not offer an unlimited number of free pilots through automatic mail.

## Technical team: native client and private conversations

**Subject:** Self-hosted team chat with a native Linux client

Hello [team],

[One verified sentence about their Linux, Debian or open-source engineering work.]
I'm building Chatter: a native Rust + Slint client with Signal Protocol encryption
for private conversations, backed by a self-hosted Go service stack.

I'm looking for a small team to evaluate it on its own infrastructure. I'd handle
deployment, updates and maintenance directly, with an agreed operational handover.
It's an early supported pilot; Linux and Android are the current development focus.

Would a short technical breakdown of the deployment and client architecture be useful?

[Team pilot overview — use the live URL]

Alexandru Pruteanu

*Reply “unsubscribe” to stop further messages. Include any required contact-source
information and jurisdiction-specific sender details in the footer.*

For Freexian, the verified opening can be: “Given your work on Debian long-term
support and packaging, I thought a native Linux client and a documented self-hosted
stack might be relevant.” They have already received an introduction: this is a
copy example, not an instruction to send another first contact.

## IT partner: something to evaluate for clients

**Subject:** Privately hosted team chat for your clients

Hello [team],

[One verified sentence about their managed IT or hosting services.] Chatter could
be an option to evaluate when a client wants team communication on infrastructure
they control.

I'm building the app and can handle deployment, updates and maintenance directly.
It includes private messaging, file sharing and calls, with a native client and an
agreed handover if your team wants to operate the server. It's still in early testing;
we would check the exact devices and workflows before a pilot.

Would a short deployment outline help you assess whether it fits any of your clients?

[Team pilot overview — use the live URL]

Alexandru Pruteanu

*Reply “unsubscribe” to stop further messages. Retain required source and sender details.*

## Claims to keep precise

- Rust + Slint is the shared client implementation. The current focus is Linux and
  Android; do not imply equivalent feature coverage on Windows, macOS or iOS.
- Signal Protocol through libsignal applies to private conversations. Do not imply
  public channels or every feature have the same end-to-end-encryption properties.
- Sealed Sender is a specific delivery path, not a claim that all service operations
  hide the sender. Server-managed channel posts remain identified.
- Shield/Tor and anonymous mailboxes reduce particular metadata exposures. Never
  claim zero metadata, universal anonymity or immunity to traffic analysis.
- A Go application does not make the whole deployment a single binary. The stack
  includes PostgreSQL, Redis, Temporal, storage, authorization and call services.
- No resource-use, comparative deployment or independent-audit claims without evidence.
- Employee provisioning/offboarding, device control, SSO, retention and legal-hold
  requirements need a capability review. Do not claim enterprise coverage or compliance.
- Source: Chatter README.md; linux-client/crates/chatter-ui-slint/Cargo.toml;
  docker-compose.yml and deploy/RUNBOOK.md, checked against the local source on 2026-11-21.

## Ready-to-use follow-up for Freexian

This company has already received an introduction. Use only as a reply in that
existing thread, after the normal due date and reply/suppression checks.

Hello Freexian team,

A more concrete follow-up to my earlier note: Chatter has a native Rust + Slint
Linux client and uses Signal Protocol through libsignal for private conversations.
The self-hosted Go service stack is documented, and I can handle deployment and
maintenance during a supported team pilot.

Given your Debian support and packaging work, would a short deployment and
client-architecture breakdown be useful?

https://www.alexpruteanu.cloud/chatter-teams/

Alexandru Pruteanu

Reply “unsubscribe” to stop further messages.
