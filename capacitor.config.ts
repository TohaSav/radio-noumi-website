import { CapacitorConfig } from "@capacitor/core";

const config: CapacitorConfig = {
  appId: "com.radionoumi.app",
  appName: "Radio Noumi",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    StatusBar: {
      style: "DARK",
      backgroundColor: "#1f2937",
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1f2937",
      showSpinner: true,
      spinnerColor: "#a855f7",
    },
    App: {
      launchUrl: "",
    },
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      releaseType: "APK",
    },
  },
};

export default config;
