# Frontend Setup
1. Follow instructions on [this documentation](https://reactnative.dev/docs/environment-setup) to install necessary environment (click **macOS** or **Windows**, then click **Android**)
    2. For Mac: 
        3. Install **Node** & **Watchman** & **Java Development Kit** & **Android Studio** & **Android SDK**
        4. Then ***Configure the ANDROID_HOME environment variable***
    5. For windows:
        6. Install **Node** & **JDK** & **Android Studio** & **Android SDK**
        7. ***Configure the ANDROID_HOME environment variable***
        8. ***Add platform-tools to Path***
9. git clone the repository
10. run "***npm install***" under the root of '/Frontend' directory (the one your just cloned) using your terminal
11. Install react native cli (if you don't have it) using your terminal
    12. ***sudo npm install -g react-native-cli***
11. Open Android Studio
    12. Open an existing Android Studio Project
    13. Choose '/Frontend/android'
    14. Click on AVD Manager icon
        15. Check out [this documentation](https://reactnative.dev/docs/environment-setup) and search "AVD Manager" if you don't know where that is
    16. Select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the Q API Level 29 image.
17. Go back and cd into your directory "/Frontend"
    18. Run "***react-native start***" in your terminal
19. Go back to your project in android studio
20. Click the green arrow run button on the top to run your program
21. Wait a few minutes for the emulator to start running
    22. If it doesn't run the program, try rebooting the device and clicking the green arrow run button again.
