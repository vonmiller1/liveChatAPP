# LiveChatAPP

Cross-platform group chat demo built with React Native and Firebase for learning and prototyping real-time messaging.

## Overview

LiveChatAPP lets users enter a display name, sign in anonymously through Firebase Authentication, and exchange text messages stored in Firebase Realtime Database. The UI uses `react-native-gifted-chat` for the message list and composer, with navigation handled by `react-native-router-flux`.

The project targets **React Native 0.35** and **Firebase JavaScript SDK 3.x**. These are legacy dependencies; expect to use an older Node.js and native toolchain, or plan a dependency upgrade before targeting current Android/iOS SDKs.

## Features

- Android and iOS entry points (`index.android.js`, `index.ios.js`).
- Home screen for display-name entry with basic input validation.
- Anonymous Firebase Authentication.
- Realtime message sync on the shared `messages` database path (latest 20 messages via `limitToLast`).
- Gifted Chat UI for sending and viewing messages.

## Tech stack

| Layer | Technology |
|-------|------------|
| Mobile UI | React Native 0.35, React 15.3 |
| Navigation | react-native-router-flux 3.x |
| Chat UI | react-native-gifted-chat 0.0.10 |
| Backend | Firebase 3.4 (Auth + Realtime Database) |
| Android | Gradle, AppCompat (compile/target SDK 22–23 era) |
| iOS | Xcode project under `ios/` |
| Tests | Jest 16 with jest-react-native preset |

## Prerequisites

- **Node.js** and **npm** compatible with React Native 0.35 (often Node 6–8 era; not pinned in this repo).
- **Android:** Android SDK, emulator or device, JDK for the Gradle version in `android/`.
- **iOS:** macOS, Xcode, simulator or device.
- **Firebase:** project with **Anonymous Authentication** and **Realtime Database** enabled.

## Getting started

1. Clone the repository:

   ```sh
   git clone https://github.com/vonmiller1/liveChatAPP.git
   cd liveChatAPP
   ```

2. Install JavaScript dependencies:

   ```sh
   npm install
   ```

3. Configure Firebase (see [Configuration](#configuration)).

4. Start Metro:

   ```sh
   npm start
   ```

5. In another terminal, run the native app:

   ```sh
   node node_modules/react-native/local-cli/cli.js run-android
   ```

   On macOS for iOS:

   ```sh
   node node_modules/react-native/local-cli/cli.js run-ios
   ```

Keep Metro running while developing. Native run commands require SDKs and an emulator, simulator, or device.

## Running locally

| Command | Purpose |
|---------|---------|
| `npm start` | Start the React Native packager (Metro). |
| `node node_modules/react-native/local-cli/cli.js run-android` | Build and launch on Android. |
| `node node_modules/react-native/local-cli/cli.js run-ios` | Build and launch on iOS (macOS only). |

Default app registration name: **ChatApp** (see `AppRegistry.registerComponent` in the index files).

## Testing

Tests are not executed as part of repository maintenance in this workflow. To run them locally when dependencies are installed:

```sh
npm test
```

Jest entry points live under `__tests__/`.

## Project structure

```text
src/
  App.js                 Router scenes (Home, Chat)
  Backend.js             Firebase init, auth, message read/write
  components/
    Home.js              Display name entry
    Chat.js              Gifted Chat screen
android/                 Android native project
ios/                     iOS native project
__tests__/               Jest smoke tests
```

## Configuration

Firebase settings are defined in `src/Backend.js` (`apiKey`, `authDomain`, `databaseURL`, `storageBucket`). Replace them with your own Firebase project values before production use.

**Security:** deploy Realtime Database rules that restrict reads/writes to authenticated users. Anonymous auth alone does not protect a publicly writable database. Do not commit secret keys or service account JSON; use `.env` locally if you externalize config (see `.gitignore`).

There is no checked-in `.env.example`; copy values from the Firebase console into your local setup or refactor `Backend.js` to load from environment variables.

## Deployment

This repo is a demo app, not a production deployment template. For release builds:

- **Android:** use Gradle `assembleRelease` from `android/` after configuring signing (not documented here).
- **iOS:** archive from Xcode with valid provisioning profiles.

Ensure Firebase rules and project configuration match your deployment environment before shipping.

## Contributing

1. Fork the repository and create a feature branch from `main`.
2. Keep commits focused; use imperative messages (for example, `fix(chat): guard empty outbound messages`).
3. Open a pull request with a short description of the change and any behavior impact.

## License

No `LICENSE` file is present in this repository. Treat the code as all-rights-reserved by the repository owner unless a license file is added later.
