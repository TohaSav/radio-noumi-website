import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Reel } from "@/pages/Reels";

interface ReelsViewerProps {
  reels: Reel[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onDeleteReel: (reelId: string) => void;
  onLikeReel: (reelId: string) => void;
  canDelete: boolean;
}

const ReelsViewer = ({
  reels,
  currentIndex,
  onIndexChange,
  onDeleteReel,
  onLikeReel,
  canDelete,
}: ReelsViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);

  const currentReel = reels[currentIndex];

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      onIndexChange(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  if (!currentReel) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pt-16 bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Основной контент Reel */}
      <div className="relative h-full w-full flex items-center justify-center">
        {/* Фоновое изображение/видео */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentReel.videoUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Навигация */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white disabled:opacity-30 transition-colors"
        >
          <Icon name="ChevronUp" size={32} />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === reels.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white disabled:opacity-30 transition-colors"
        >
          <Icon name="ChevronDown" size={32} />
        </button>

        {/* Боковая панель с действиями */}
        <div className="absolute right-4 bottom-20 flex flex-col gap-6">
          {/* Лайк */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onLikeReel(currentReel.id)}
              className={`p-3 rounded-full transition-colors ${
                currentReel.isLiked
                  ? "text-red-500"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Icon
                name="Heart"
                size={28}
                fill={currentReel.isLiked ? "currentColor" : "none"}
              />
            </button>
            <span className="text-white text-sm font-medium">
              {currentReel.likes}
            </span>
          </div>

          {/* Комментарии */}
          <div className="flex flex-col items-center">
            <button className="p-3 text-white/70 hover:text-white transition-colors">
              <Icon name="MessageCircle" size={28} />
            </button>
            <span className="text-white text-sm font-medium">
              {currentReel.comments}
            </span>
          </div>

          {/* Поделиться */}
          <button className="p-3 text-white/70 hover:text-white transition-colors">
            <Icon name="Share" size={28} />
          </button>

          {/* Удалить (только для админа) */}
          {canDelete && (
            <button
              onClick={() => onDeleteReel(currentReel.id)}
              className="p-3 text-red-400 hover:text-red-300 transition-colors"
            >
              <Icon name="Trash2" size={28} />
            </button>
          )}
        </div>

        {/* Информация о пользователе и описание */}
        <div className="absolute bottom-6 left-4 right-24">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={currentReel.avatar}
              alt={currentReel.username}
              className="w-12 h-12 rounded-full border-2 border-white"
            />
            <div>
              <h3 className="text-white font-semibold">
                {currentReel.username}
              </h3>
              <p className="text-white/70 text-sm">
                {Math.floor(
                  (Date.now() - currentReel.timestamp.getTime()) / (1000 * 60),
                )}{" "}
                мин назад
              </p>
            </div>
          </div>

          <p className="text-white text-lg leading-relaxed">
            {currentReel.description}
          </p>
        </div>

        {/* Индикатор позиции */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 flex gap-1">
          {reels.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-8 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReelsViewer;
