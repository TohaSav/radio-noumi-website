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
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 w-[270px] h-[350px] bg-gradient-to-b from-yellow-400/20 via-orange-500/20 to-red-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-xl p-4 flex flex-col items-center justify-between relative overflow-hidden z-50 hidden lg:flex">
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-orange-500/5 animate-pulse"></div>

      {/* Метка "РЕКЛАМА" */}
      <div className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded z-10">
        РЕКЛАМА
      </div>

      {/* Счётчик просмотров */}
      <div className="absolute top-2 left-2 bg-yellow-500/20 text-yellow-200 text-xs font-semibold px-2 py-1 rounded flex items-center space-x-1 z-10">
        <Icon name="Eye" size={12} />
        <span>{views.toLocaleString()}</span>
      </div>

      {/* Верхняя часть с иконкой */}
      <div className="flex flex-col items-center text-center space-y-3 relative z-10 mt-8">
        <div className="bg-yellow-400/30 rounded-full p-4 animate-pulse">
          <Icon name="Radio" className="text-yellow-400" size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-bold text-yellow-300 uppercase tracking-wide">
            🎵 Ваша реклама здесь!
          </h3>
          <p className="text-sm text-yellow-200/80">На популярном радио</p>
        </div>
      </div>

      {/* Средняя часть со статистикой */}
      <div className="flex flex-col items-center text-center space-y-3 relative z-10">
        <div className="bg-yellow-500/10 rounded-lg p-3 border border-yellow-400/20">
          <div className="text-sm text-yellow-200/70 mb-1">Охват:</div>
          <div className="text-lg font-bold text-yellow-200">
            {views.toLocaleString()}+
          </div>
          <div className="text-xs text-yellow-200/60">слушателей</div>
        </div>
      </div>

      {/* Нижняя часть с кнопкой */}
      <div className="relative z-10 w-full">
        <Button
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold rounded-lg px-4 py-3 text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
          onClick={() =>
            window.open(
              "https://wa.me/79049808275?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%20Radio%20Noumi%20%D1%8F%20%D1%85%D0%BE%D1%87%D1%83%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D1%83%20%D0%B2%D0%B0%D1%81%20%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80.%20%D0%A1%D0%BA%D0%B0%D0%B6%D0%B8%D1%82%D0%B5%20%D0%BF%D0%BE%D0%B6%D0%B0%D0%BB%D1%83%D0%B9%D1%81%D1%82%D0%B0%20%D1%86%D0%B5%D0%BD%D1%83%20%D0%B8%20%D1%81%D1%80%D0%BE%D0%BA%20%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%89%D0%B5%D0%BD%D0%B8%D1%8F",
              "_blank",
            )
          }
        >
          <Icon name="MessageCircle" className="mr-2" size={16} />
          Связаться в WhatsApp
        </Button>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-yellow-400/10 to-transparent"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-yellow-400/30 to-orange-500/30 rounded-l"></div>
    </div>
  );
};

export default AdBanner;
