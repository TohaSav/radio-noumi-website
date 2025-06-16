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
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [bannerMetrics, setBannerMetrics] = useState<{
    [key: string]: { views: number; clicks: number; uniqueClicks: number };
  }>({});
  const { listeners } = useRadioStats();

  // Массив баннеров
  const banners = [
    "https://cdn.poehali.dev/files/33f524f4-ccfa-4987-a539-c7b0736e31b3.png",
    "https://cdn.poehali.dev/files/a58ab521-5eed-4cf3-850a-df83e88e9382.png",
    "https://cdn.poehali.dev/files/a48fd9c3-3e70-42e0-907b-f89f14ed22e9.png",
  ];

  useEffect(() => {
    // Загружаем метрики для каждого баннера
    const savedMetrics = localStorage.getItem("banner-metrics");
    if (savedMetrics) {
      setBannerMetrics(JSON.parse(savedMetrics));
    } else {
      // Инициализируем метрики для каждого баннера
      const initialMetrics = banners.reduce(
        (acc, banner, index) => {
          acc[index] = {
            views: 0,
            clicks: Math.floor(Math.random() * 2000) + 500,
            uniqueClicks: Math.floor(Math.random() * 100) + 50,
          };
          return acc;
        },
        {} as {
          [key: string]: {
            views: number;
            clicks: number;
            uniqueClicks: number;
          };
        },
      );
      setBannerMetrics(initialMetrics);
      localStorage.setItem("banner-metrics", JSON.stringify(initialMetrics));
    }

    // Автоматический рост кликов для текущего баннера
    const clickInterval = setInterval(
      () => {
        setBannerMetrics((prev) => {
          const updated = { ...prev };
          const currentKey = currentBannerIndex.toString();
          if (updated[currentKey]) {
            updated[currentKey] = {
              ...updated[currentKey],
              clicks:
                updated[currentKey].clicks + Math.floor(Math.random() * 3) + 1,
            };
            localStorage.setItem("banner-metrics", JSON.stringify(updated));
          }
          return updated;
        });
      },
      Math.random() * 3000 + 2000,
    );

    // Рост уникальных кликов каждые 5 минут
    const uniqueInterval = setInterval(
      () => {
        setBannerMetrics((prev) => {
          const updated = { ...prev };
          banners.forEach((_, index) => {
            const key = index.toString();
            if (updated[key]) {
              updated[key] = {
                ...updated[key],
                uniqueClicks:
                  updated[key].uniqueClicks +
                  Math.floor(Math.random() * 10) +
                  5,
              };
            }
          });
          localStorage.setItem("banner-metrics", JSON.stringify(updated));
          return updated;
        });
      },
      5 * 60 * 1000,
    );

    return () => {
      clearInterval(clickInterval);
      clearInterval(uniqueInterval);
    };
  }, [currentBannerIndex, banners.length]);

  // Автоматическая смена баннеров каждые 60 секунд
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 60000); // 60 секунд

    return () => clearInterval(bannerInterval);
  }, [banners.length]);

  // Обновляем просмотры для текущего баннера
  useEffect(() => {
    setBannerMetrics((prev) => {
      const updated = { ...prev };
      const currentKey = currentBannerIndex.toString();
      if (updated[currentKey]) {
        updated[currentKey] = {
          ...updated[currentKey],
          views: listeners,
        };
        localStorage.setItem("banner-metrics", JSON.stringify(updated));
      }
      return updated;
    });
  }, [listeners, currentBannerIndex]);

  const handleClick = () => {
    setBannerMetrics((prev) => {
      const updated = { ...prev };
      const currentKey = currentBannerIndex.toString();
      if (updated[currentKey]) {
        updated[currentKey] = {
          ...updated[currentKey],
          clicks: updated[currentKey].clicks + 1,
        };
        localStorage.setItem("banner-metrics", JSON.stringify(updated));
      }
      return updated;
    });

    if (clickUrl) {
      window.open(clickUrl, "_blank");
    } else {
      window.open("https://wa.me/79049808275", "_blank");
    }
  };

  const currentMetrics = bannerMetrics[currentBannerIndex.toString()] || {
    views: 0,
    clicks: 0,
    uniqueClicks: 0,
  };

  const placeholderText =
    "Место для вашей рекламы заказать рекламу можете написав нам на WhatsApp +79049808275";

  return (
    <div className="w-full max-w-[640px] mx-auto px-4 sm:px-0">
      {/* Баннер */}
      <div
        className="w-full h-[160px] sm:h-[180px] md:h-[200px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-dashed border-white/30 rounded-lg overflow-hidden cursor-pointer hover:border-white/50 transition-colors active:scale-95 touch-manipulation"
        style={{
          aspectRatio: "640/200",
          maxWidth: "100%",
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
      <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 text-white/60 text-sm sm:text-xs">
        <div className="flex items-center gap-1.5 sm:gap-1 min-w-[44px] justify-center">
          <Eye size={16} className="sm:w-3.5 sm:h-3.5" />
          <span className="font-medium">{currentMetrics.views}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-1 min-w-[44px] justify-center">
          <MousePointer size={16} className="sm:w-3.5 sm:h-3.5" />
          <span className="font-medium">{currentMetrics.clicks}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-1 min-w-[44px] justify-center">
          <Users size={16} className="sm:w-3.5 sm:h-3.5" />
          <span className="font-medium">{currentMetrics.uniqueClicks}</span>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
