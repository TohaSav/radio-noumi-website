import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Reel } from "@/pages/Reels";
import ReelsComments from "@/components/ReelsComments";

interface ReelsViewerProps {
  reels: Reel[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onDeleteReel: (reelId: string) => void;
  onLikeReel: (reelId: string) => void;
  onAddComment: (reelId: string, comment: string) => void;
  canDelete: boolean;
}

const ReelsViewer = ({
  reels,
  currentIndex,
  onIndexChange,
  onDeleteReel,
  onLikeReel,
  onAddComment,
  canDelete,
}: ReelsViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [showComments, setShowComments] = useState(false);

  // Обработка клавиатуры для ПК
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          handlePrev();
          break;
        case "ArrowDown":
        case "ArrowRight":
        case " ":
          e.preventDefault();
          handleNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, reels.length]);

  // Фокус для работы клавиш
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

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
      className="fixed inset-0 pt-16 bg-black flex items-center justify-center outline-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
    >
      {/* Основной контент Reel - телефонный формат 9:16 */}
      <div className="relative w-80 h-[600px] bg-black rounded-2xl overflow-hidden shadow-2xl">
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
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white disabled:opacity-30 transition-colors bg-black/20 rounded-full"
        >
          <Icon name="ChevronUp" size={24} />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === reels.length - 1}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white disabled:opacity-30 transition-colors bg-black/20 rounded-full"
        >
          <Icon name="ChevronDown" size={24} />
        </button>

        {/* Боковая панель с действиями */}
        <div className="absolute right-3 bottom-20 flex flex-col gap-4">
          {/* Лайк */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onLikeReel(currentReel.id)}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentReel.isLiked
                  ? "text-red-500 bg-red-500/20 scale-110"
                  : "text-white/80 hover:text-white bg-black/20"
              }`}
            >
              <Icon
                name="Heart"
                size={24}
                fill={currentReel.isLiked ? "currentColor" : "none"}
              />
            </button>
            <span className="text-white text-sm font-bold mt-1">
              {currentReel.likes}
            </span>
          </div>

          {/* Комментарии */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setShowComments(true)}
              className="p-3 bg-black/20 rounded-full text-white/80 hover:text-white transition-colors"
            >
              <Icon name="MessageCircle" size={24} />
            </button>
            <span className="text-white text-sm font-bold mt-1">
              {currentReel.comments}
            </span>
          </div>

          {/* Поделиться */}
          <button className="p-3 bg-black/20 rounded-full text-white/80 hover:text-white transition-colors">
            <Icon name="Share" size={24} />
          </button>

          {/* Удалить (только для админа) */}
          {canDelete && (
            <button
              onClick={() => onDeleteReel(currentReel.id)}
              className="p-3 bg-red-500/20 rounded-full text-red-400 hover:text-red-300 transition-colors"
            >
              <Icon name="Trash2" size={20} />
            </button>
          )}
        </div>

        {/* Информация о пользователе и описание */}
        <div className="absolute bottom-3 left-3 right-16">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={currentReel.avatar}
              alt={currentReel.username}
              className="w-8 h-8 rounded-full border border-white"
            />
            <div>
              <h3 className="text-white font-semibold text-sm">
                {currentReel.username}
              </h3>
              <p className="text-white/70 text-xs">
                {Math.floor(
                  (Date.now() - currentReel.timestamp.getTime()) / (1000 * 60),
                )}{" "}
                мин назад
              </p>
            </div>
          </div>

          <p className="text-white text-sm leading-relaxed">
            {currentReel.description}
          </p>
        </div>

        {/* Индикатор позиции */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1">
          {reels.map((_, index) => (
            <div
              key={index}
              className={`w-0.5 h-6 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Модальное окно комментариев */}
      <ReelsComments
        reel={currentReel}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        onAddComment={onAddComment}
      />
    </div>
  );
};

export default ReelsViewer;
