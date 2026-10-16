# LiveChatAPP

A small cross-platform group-chat demo built with React Native. Users enter a display name, sign in anonymously through Firebase Authentication, and exchange text messages stored in Firebase Realtime Database.

> This repository uses React Native 0.35 and Firebase 3.4.1. These are legacy dependencies; the original native build toolchain may be required, and newer Android/iOS SDKs may not be compatible without a planned upgrade.

## Features

- React Native application entry points for Android and iOS.
- Simple name-entry screen and chat navigation.
- Anonymous Firebase authentication.
- Realtime message updates, with the latest 20 messages loaded from the shared `messages` database path.
- Chat UI provided by `react-native-gifted-chat`.

## Requirements

- Node.js and npm.
- Android: Android SDK and an emulator or connected device.
- iOS: macOS, Xcode, and an iOS simulator or connected device.
- A Firebase project with Anonymous Authentication and Realtime Database enabled.

Because this app is based on an older React Native release, use a Node.js and native toolchain version compatible with React Native 0.35. The project does not pin or document a currently supported toolchain.

## Getting started

1. Install the JavaScript dependencies from the repository root:

   ```sh
   npm install
   ```

2. Configure the Firebase project settings used by `src/Backend.js`. Enable anonymous sign-in and create a Realtime Database. The sample currently connects to the Firebase project configured in that file; replace its settings with your own before using another project.

3. Review and deploy Firebase Realtime Database security rules before using the app with real users or data. Authentication alone does not restrict access to chat messages.

4. Start the Metro bundler:

   ```sh
   npm start
   ```

5. In a second terminal, launch the native app:

   ```sh
   node node_modules/react-native/local-cli/cli.js run-android
   ```

   On macOS, use the iOS command instead:

   ```sh
   node node_modules/react-native/local-cli/cli.js run-ios
   ```

Keep Metro running while developing. The Android and iOS commands require their respective native SDKs and an available emulator, simulator, or device.

## Project layout

```text
src/
  App.js                 Navigation and screen registration
  Backend.js             Firebase initialization and message access
  components/
    Home.js              Display-name entry
    Chat.js              Chat UI and message subscription
android/                 Android native project
ios/                     iOS native project
__tests__/               React Native starter tests
```

## Tests

The package defines a Jest test script:

```sh
npm test
```

## Current limitations

- The display name is local to the current chat session; authentication is anonymous.
- Messages use one shared database collection, and the client loads only the latest 20.
- The repository does not include application-specific Firebase rules or a supported modern dependency/toolchain matrix.
- The checked-in configuration targets a sample Firebase project. Configure an owned project and secure its database before deployment.
