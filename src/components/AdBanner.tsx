import React, { useState, useEffect } from "react";
import { Eye, MousePointer, Users } from "lucide-react";

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

  // Симуляция загрузки статистики
  useEffect(() => {
    const savedViews = localStorage.getItem("ad-views") || "0";
    const savedClicks = localStorage.getItem("ad-clicks") || "0";
    const savedUniqueViews = localStorage.getItem("ad-unique-views") || "0";

    setViews(parseInt(savedViews));
    setClicks(parseInt(savedClicks));
    setUniqueViews(parseInt(savedUniqueViews));

    // Увеличиваем просмотры при загрузке
    const newViews = parseInt(savedViews) + 1;
    setViews(newViews);
    localStorage.setItem("ad-views", newViews.toString());

    // Уникальные просмотры (простая логика по дате)
    const today = new Date().toDateString();
    const lastUniqueView = localStorage.getItem("ad-last-unique");
    if (lastUniqueView !== today) {
      const newUniqueViews = parseInt(savedUniqueViews) + 1;
      setUniqueViews(newUniqueViews);
      localStorage.setItem("ad-unique-views", newUniqueViews.toString());
      localStorage.setItem("ad-last-unique", today);
    }
  }, []);

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
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <p className="text-white/70 text-center text-sm leading-relaxed">
              {placeholderText}
            </p>
          </div>
        )}
      </div>

      {/* Статистика */}
      <div className="flex items-center justify-center gap-6 mt-3 text-white/60 text-xs">
        <div className="flex items-center gap-1">
          <Eye size={14} />
          <span>{views}</span>
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
