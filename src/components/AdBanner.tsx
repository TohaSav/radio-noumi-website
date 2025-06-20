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

  // Ротация баннеров каждые 15 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);

      // Увеличиваем просмотры
      setBannerMetrics((prev) => {
        const updated = {
          ...prev,
          [currentBannerIndex]: {
            ...prev[currentBannerIndex],
            views: (prev[currentBannerIndex]?.views || 0) + 1,
          },
        };
        localStorage.setItem("banner-metrics", JSON.stringify(updated));
        return updated;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [currentBannerIndex, banners.length]);

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

  const handleBannerClick = () => {
    const bannerId = currentBannerIndex.toString();

    // Увеличиваем клики
    setBannerMetrics((prev) => {
      const updated = {
        ...prev,
        [bannerId]: {
          ...prev[bannerId],
          clicks: (prev[bannerId]?.clicks || 0) + 1,
          uniqueClicks: (prev[bannerId]?.uniqueClicks || 0) + 1,
        },
      };
      localStorage.setItem("banner-metrics", JSON.stringify(updated));
      return updated;
    });

    if (clickUrl) {
      window.open(clickUrl, "_blank");
    }
  };

  const currentBanner = imageUrl || banners[currentBannerIndex];
  const currentMetrics = bannerMetrics[currentBannerIndex] || {
    views: 0,
    clicks: 0,
    uniqueClicks: 0,
  };

  // Расчет дохода от рекламы (условный)
  const adRevenue = Math.floor(
    currentMetrics.views * 0.1 + currentMetrics.clicks * 2.5,
  );

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {/* Баннер */}
      <div
        className="relative overflow-hidden rounded-xl shadow-2xl cursor-pointer group"
        onClick={handleBannerClick}
      >
        <img
          src={currentBanner}
          alt={altText}
          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          Реклама
        </div>
      </div>

      {/* Метрики рекламы */}
      <div className="flex justify-between items-center text-xs text-white/60 bg-white/5 rounded-lg p-2">
        <div className="flex items-center">
          <Eye size={12} className="mr-1" />
          {currentMetrics.views}
        </div>
        <div className="flex items-center">
          <MousePointer size={12} className="mr-1" />
          {currentMetrics.clicks}
        </div>
        <div className="flex items-center">
          <Users size={12} className="mr-1" />
          {listeners}
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
