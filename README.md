# Frontend Setup
1. Follow instructions on [this documentation](https://reactnative.dev/docs/environment-setup) to install necessary environment (click **macOS** or **Windows**, then click **Android**)
    1. For Mac: 
        1. Install **Node** & **Watchman** & **Java Development Kit** & **Android Studio** & **Android SDK**
        2. Then ***Configure the ANDROID_HOME environment variable***
    2. For windows:
        1. Install **Node** & **JDK** & **Android Studio** & **Android SDK**
        2. ***Configure the ANDROID_HOME environment variable***
        3. ***Add platform-tools to Path***
2. git clone the repository
3. run "***npm install***" under the root of '/Frontend' directory (the one your just cloned) using your terminal
4. Install react native cli (if you don't have it) using your terminal
    1. ***sudo npm install -g react-native-cli***
5. Open Android Studio
    1. Open an existing Android Studio Project
    2. Choose '/Frontend/android'
    3. Click on AVD Manager icon
        15. Check out [this documentation](https://reactnative.dev/docs/environment-setup) and search "AVD Manager" if you don't know where that is
    4. Select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the Q API Level 29 image.
6. Go back and cd into your directory "/Frontend"
    1. Run "***react-native start***" in your terminal
7. Go back to your project in android studio
8. Click the green arrow run button on the top to run your program
9. Wait a few minutes for the emulator to start running
    1. If it doesn't run the program, try rebooting the device and clicking the green arrow run button again.
