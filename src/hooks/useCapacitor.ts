import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { App } from "@capacitor/app";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Device } from "@capacitor/device";

export const useCapacitor = () => {
  const isNative = Capacitor.isNativePlatform();
  const platform = Capacitor.getPlatform();

  const initializeApp = async () => {
    if (isNative) {
      // Настройка статус бара
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: "#1f2937" });

      // Скрытие сплеш скрина
      setTimeout(async () => {
        await SplashScreen.hide();
      }, 2000);

      // Получение информации об устройстве
      const deviceInfo = await Device.getInfo();
      console.log("Device Info:", deviceInfo);
    }
  };

  const playHaptic = async (style: ImpactStyle = ImpactStyle.Medium) => {
    if (isNative) {
      await Haptics.impact({ style });
    }
  };

  const exitApp = async () => {
    if (isNative) {
      await App.exitApp();
    }
  };

  return {
    isNative,
    platform,
    initializeApp,
    playHaptic,
    exitApp,
  };
};
