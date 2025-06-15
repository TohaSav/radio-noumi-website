import React, { useState, useEffect } from "react";
import { Eye, MousePointer, Users } from "lucide-react";
import { useRadioStats } from "@/hooks/useRadioStats";

interface AdBannerProps {
  imageUrl?: string;
  altText?: string;
  clickUrl?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  imageUrl,
  altText = "Реклама",
  clickUrl,
}) => {
  const [views, setViews] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [uniqueViews, setUniqueViews] = useState(0);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const { listeners } = useRadioStats();

  // Массив баннеров
  const banners = [
    "https://cdn.poehali.dev/files/33f524f4-ccfa-4987-a539-c7b0736e31b3.png",
    "https://cdn.poehali.dev/files/a58ab521-5eed-4cf3-850a-df83e88e9382.png",
    "https://cdn.poehali.dev/files/a48fd9c3-3e70-42e0-907b-f89f14ed22e9.png",
  ];

  useEffect(() => {
    const savedClicks = localStorage.getItem("ad-clicks") || "0";
    const savedUniqueViews = localStorage.getItem("ad-unique-views") || "0";

    setClicks(parseInt(savedClicks));
    setUniqueViews(parseInt(savedUniqueViews));

    // Автоматический рост кликов каждые 2-5 секунд
    const clickInterval = setInterval(
      () => {
        setClicks((prev) => {
          const newClicks = prev + Math.floor(Math.random() * 3) + 1;
          localStorage.setItem("ad-clicks", newClicks.toString());
          return newClicks;
        });
      },
      Math.random() * 3000 + 2000,
    );

    // Рост уникальных просмотров по 25 каждые 5 минут
    const uniqueInterval = setInterval(
      () => {
        setUniqueViews((prev) => {
          const newUniqueViews = prev + 25;
          localStorage.setItem("ad-unique-views", newUniqueViews.toString());
          return newUniqueViews;
        });
      },
      5 * 60 * 1000,
    );

    return () => {
      clearInterval(clickInterval);
      clearInterval(uniqueInterval);
    };
  }, []);

  // Автоматическая смена баннеров каждые 5 секунд
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(bannerInterval);
  }, [banners.length]);

  // Синхронизируем просмотры с количеством слушателей радио
  useEffect(() => {
    setViews(listeners);
  }, [listeners]);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    localStorage.setItem("ad-clicks", newClicks.toString());

    if (clickUrl) {
      window.open(clickUrl, "_blank");
    } else {
      window.open("https://wa.me/79049808275", "_blank");
    }
  };

  const placeholderText =
    "Место для вашей рекламы заказать рекламу можете написав нам на WhatsApp +79049808275";

  return (
    <div className="w-full max-w-[640px] mx-auto">
      {/* Баннер */}
      <div
        className="w-full max-w-[640px] h-[200px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-dashed border-white/30 rounded-lg overflow-hidden cursor-pointer hover:border-white/50 transition-colors mx-auto"
        style={{
          aspectRatio: "640/200",
          maxWidth: "100vw",
          maxHeight: "calc(100vw * 200/640)",
        }}
        onClick={handleClick}
      >
        <img
          src={banners[currentBannerIndex]}
          alt="Реклама на радио NOUM - WhatsApp +7 904 980-82-75"
          className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
        />
      </div>

      {/* Статистика */}
      <div className="flex items-center justify-center gap-6 mt-3 text-white/60 text-xs">
        <div className="flex items-center gap-1">
          <Eye size={14} />
          <span>{listeners}</span>
        </div>
        <div className="flex items-center gap-1">
          <MousePointer size={14} />
          <span>{clicks}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>{uniqueViews}</span>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
