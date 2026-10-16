# Optimization Plan

## Goal

Improve the reliability, security, maintainability, and startup experience of this React Native chat demo while preserving its simple cross-platform group-chat behavior. The app currently runs on React Native 0.35 with Firebase 3.4.1, so work should be staged around the legacy platform dependencies rather than assuming a modern toolchain.

## Priorities

### P0 — Protect chat data and make setup reproducible

- Configure and document Firebase Realtime Database rules that require an authenticated user and validate message fields and size. Do not treat anonymous authentication or the Firebase client configuration as database access control.
- Replace the sample Firebase project settings with an explicit, documented per-environment configuration approach. Keep credentials and project-specific values out of source where appropriate; Firebase client API keys are identifiers, not substitutes for security rules.
- Record the supported Node.js, Android SDK/Gradle, and Xcode versions for the existing React Native 0.35 baseline before changing native build dependencies.

**Done when:** a new developer can configure their own Firebase project, connect without relying on the sample project, and verify that unauthenticated or malformed database writes are rejected.

### P1 — Make authentication and chat lifecycle dependable

- Gate message sending and subscription startup on successful authentication so a message cannot be sent with a missing user ID.
- Surface authentication, database-read, and message-write errors in the UI rather than only using an alert or silently failing.
- Make Firebase initialization safe against repeated initialization and provide explicit subscription cleanup when the chat screen unmounts.
- Validate and normalize the display name before navigation; define a clear fallback for empty or whitespace-only input.

**Done when:** authentication failures are visible and recoverable, valid messages always carry an authenticated user identity, and leaving the screen stops its listener.

### P2 — Improve message correctness and scalability

- Define and validate the persisted message schema (`text`, `user`, and server timestamp), and handle incomplete or invalid historical records safely.
- Preserve predictable chronological ordering when loading and receiving messages, including ties and out-of-order network events.
- Add bounded pagination or an explicit history-loading strategy before increasing the current latest-20-message window.
- Prevent duplicate subscriptions and avoid unnecessary state updates when the screen is inactive.

**Done when:** messages remain correctly ordered across initial load and live updates, malformed records do not crash rendering, and older history can be fetched without unbounded reads.

### P3 — Modernize with compatibility checkpoints

- Upgrade React Native, Firebase, navigation, and chat UI dependencies as a coordinated change, not independent version bumps.
- Replace deprecated lifecycle patterns and APIs as part of that upgrade; retain equivalent Android and iOS behavior.
- Add focused tests for name validation, authentication readiness, message mapping/order, send failures, and subscription cleanup.
- Add a repeatable CI check for the supported JavaScript tests and native build configurations once the toolchain is documented.

**Done when:** dependency versions and platform prerequisites are explicit, automated checks cover the critical chat paths, and both platforms build using the documented toolchain.

## Execution guidance

1. Complete P0 before exposing this app to real users or production data.
2. Capture the current dependency/toolchain baseline, then complete P1 and P2 with targeted tests.
3. Plan P3 as a separately reviewable migration with platform-by-platform checkpoints and a rollback path.
4. Measure startup time, bundle size, and message-load behavior before making performance changes; optimize only against observed bottlenecks.

## Out of scope

- Introducing a new chat backend or changing the app's group-chat product behavior.
- Adding media, push notifications, accounts, or multi-room chat before the current authentication and message model are made reliable.
- Claiming performance or security improvements without corresponding measurements or rule verification.
