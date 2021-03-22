# Frontend Setup
1. Follow instructions on [the official documentation](https://reactnative.dev/docs/environment-setup) to install necessary environment (click **macOS** or **Windows**, then click **Android**)
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
        1. Check out [the official documentation](https://reactnative.dev/docs/environment-setup) and search "AVD Manager" if you don't know where that is
    4. Select "Create Virtual Device..."
        1. then pick any Phone from the list and click "Next"
        2. then select the Q API Level 29 image.
        3. We recommend using Pixel3 for the device.
6. Go back and cd into your directory "/Frontend"
    1. Run "***react-native start***" in your terminal
7. Go back to your project in android studio
8. Run the program
    9. Click the green arrow run button on the top to run your program
    10. Wait a few minutes for the emulator to start running
        1. If it doesn't run the program, try rebooting the device and clicking the green arrow run button again.
        2. To run it on actual device, you need to connect it to your device, and then run the terminal command "react-native run-android" in the root directory.
    
# Programming Language and Framework and Tools
- React Native & Typescript & Firebase & Heroku & PostgreSql

# Troubleshooting
- contact Team 33 or email huan773@usc.edu if there's any problem in installing and setting up the environment
- For your best grading experience, we will demo the app to explain all the features. 

