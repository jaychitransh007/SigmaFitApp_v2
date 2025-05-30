# FitSigma - Fitness Tracking App

A modern fitness tracking application built with React Native, designed to help users achieve their fitness goals through personalized workout plans and progress tracking.

## 🚀 Features

- User onboarding with profile setup
- Goal setting and tracking
- Workout planning and scheduling
- Progress visualization
- Responsive design for both iOS and Android
- Dark/Light theme support

## 🛠 Prerequisites

- Node.js (v16 or later)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)
- Watchman (for macOS users)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/FitSigma.git
   cd SigmaFit
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

#### iOS

```bash
npx react-native run-ios
# or
npm run ios
```

#### Android

```bash
npx react-native run-android
# or
npm run android
```

## 📱 Running on a Device

### iOS
1. Open the `.xcworkspace` file in the `ios` folder using Xcode
2. Connect your iOS device or select a simulator
3. Click the Run button or press `Cmd + R`

### Android
1. Connect your Android device with USB debugging enabled or start an emulator
2. Run `adb devices` to verify your device is connected
3. Run the app using the commands above

## 🏗 Project Structure

```
SigmaFit/
├── android/           # Android native code
├── ios/               # iOS native code
├── src/               # Source code
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # Reusable components
│   ├── hooks/         # Custom React hooks
│   ├── navigation/    # Navigation configuration
│   ├── screens/       # App screens
│   ├── services/      # API services
│   ├── store/         # State management
│   └── utils/         # Utility functions
├── App.tsx            # Main application component
└── package.json       # Project dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Native Paper](https://reactnativepaper.com/)
- And all the amazing open-source libraries used in this project
