import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const AdBanner = () => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    // Получаем начальное количество просмотров
    const currentViews = parseInt(
      localStorage.getItem("adBannerViews") || "1247",
    );
    setViews(currentViews);

    // Автоматическое обновление счётчика каждые 3-7 секунд
    const interval = setInterval(
      () => {
        setViews((prevViews) => {
          const increment = Math.floor(Math.random() * 5) + 1;
          const newViews = prevViews + increment;
          localStorage.setItem("adBannerViews", newViews.toString());
          return newViews;
        });
      },
      Math.random() * 4000 + 3000,
    ); // 3-7 секунд

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full max-w-[450px] h-[130px] mx-auto bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-3 sm:p-4 flex items-center justify-between relative">
      {/* Метка "РЕКЛАМА" */}
      <div className="absolute top-2 right-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded">
        РЕКЛАМА
      </div>

      {/* Счётчик просмотров */}
      <div className="absolute top-2 left-2 bg-yellow-500/20 text-yellow-200 text-[10px] font-semibold px-2 py-1 rounded flex items-center space-x-1">
        <Icon name="Eye" size={12} />
        <span>{views.toLocaleString()}</span>
      </div>

      {/* Левая часть с иконкой */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="bg-yellow-400/20 rounded-full p-2">
          <Icon name="Radio" className="text-yellow-400" size={20} />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-bold text-yellow-300 uppercase tracking-wide">
            Реклама
          </h3>
          <p className="text-xs text-yellow-200/80 hidden sm:block">
            Ваша реклама здесь!
          </p>
        </div>
      </div>

      {/* Правая часть с кнопкой */}
      <div className="text-center space-y-1">
        <p className="text-xs sm:text-sm text-yellow-100 font-medium">
          🎵 Разместите рекламу
        </p>
        <Button
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm transition-all duration-300 transform hover:scale-105"
          onClick={() =>
            window.open(
              "https://wa.me/79049808275?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%20Radio%20Noumi%20%D1%8F%20%D1%85%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D1%83%20%D0%B2%D0%B0%D1%81%20%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80.%20%D0%A1%D0%BA%D0%B0%D0%B6%D0%B8%D1%82%D0%B5%20%D0%BF%D0%BE%D0%B6%D0%B0%D0%BB%D1%83%D0%B9%D1%81%D1%82%D0%B0%20%D1%86%D0%B5%D0%BD%D1%83%20%D0%B8%20%D1%81%D1%80%D0%BE%D0%BA%20%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D1%8F",
              "_blank",
            )
          }
        >
          <Icon name="Mail" className="mr-1" size={14} />
          Связаться
        </Button>
      </div>
    </div>
  );
};

export default AdBanner;
