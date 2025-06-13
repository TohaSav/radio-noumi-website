import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Story {
  id: string;
  media: { url: string; type: "image" | "video" }[];
  author: string;
  timestamp: number;
  likes: number;
  reactions?: { [emoji: string]: number };
}

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  initialStoryIndex: number;
  onAddReaction: (storyId: string, emoji: string) => void;
  onLikeStory?: (storyId: string) => void;
}

const StoryModal = ({
  isOpen,
  onClose,
  stories,
  initialStoryIndex,
  onAddReaction,
  onLikeStory,
}: StoryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showLikeHeart, setShowLikeHeart] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [floatingEmojis, setFloatingEmojis] = useState<
    { id: string; emoji: string; x: number; y: number }[]
  >([]);

  const emojis = ["❤️", "😍", "😂", "😮", "😢", "👏", "🔥", "💯"];

  const handleEmojiSelect = (emoji: string) => {
    onAddReaction(currentStory.id, emoji);

    // Добавляем плавающий эмодзи
    const floatingEmoji = {
      id: Date.now().toString(),
      emoji,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 200,
    };

    setFloatingEmojis((prev) => [...prev, floatingEmoji]);

    // Убираем плавающий эмодзи через 3 секунды
    setTimeout(() => {
      setFloatingEmojis((prev) =>
        prev.filter((e) => e.id !== floatingEmoji.id),
      );
    }, 3000);

    setShowEmojiPicker(false);
  };

  const handleDoubleTap = (e: React.TouchEvent | React.MouseEvent) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      // Двойной тап - лайк
      if (onLikeStory) {
        onLikeStory(currentStory.id);
      }

      // Показываем анимацию сердечка
      setShowLikeHeart(true);
      setTimeout(() => setShowLikeHeart(false), 1000);
    }
    setLastTap(now);
  };

  // Обработка пауз и воспроизведения
  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUp = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  useEffect(() => {
    if (!isOpen || isPaused) return;

    setCurrentIndex(initialStoryIndex);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Переход к следующей истории
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
            return 0;
          } else {
            onClose();
            return 0;
          }
        }
        return prev + 0.67; // 15 секунд = 100 / 15 = 6.67 но делаем медленнее
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [
    isOpen,
    currentIndex,
    stories.length,
    onClose,
    initialStoryIndex,
    isPaused,
  ]);

  const currentStory = stories[currentIndex];

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentMediaIndex(0);
      setProgress(0);
    }
  };

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentMediaIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const goToPreviousMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
      setProgress(0);
    }
  };

  const goToNextMedia = () => {
    if (currentMediaIndex < currentStory.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
      setProgress(0);
    } else {
      goToNext();
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}ч`;
    if (minutes > 0) return `${minutes}м`;
    return "только что";
  };

  if (!currentStory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full p-0 bg-black border-none m-0 rounded-none">
        <div
          className="relative w-screen h-screen bg-black flex items-center justify-center overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
            {stories.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width:
                      index < currentIndex
                        ? "100%"
                        : index === currentIndex
                          ? `${progress}%`
                          : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-0.5">
                <div className="w-full h-full bg-black rounded-full p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={currentStory.media[0]?.url}
                      alt={currentStory.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {currentStory.author}
                </p>
                <p className="text-white/70 text-xs">
                  {formatTime(currentStory.timestamp)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Индикатор медиа */}
              {currentStory.media.length > 1 && (
                <div className="text-white/70 text-xs">
                  {currentMediaIndex + 1}/{currentStory.media.length}
                </div>
              )}
              <button className="text-white/70 hover:text-white transition-colors">
                <Icon name="MoreHorizontal" size={20} />
              </button>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Story content */}
          <div
            className="relative w-full h-full max-w-md mx-auto"
            onClick={handleDoubleTap}
            onTouchEnd={handleDoubleTap}
          >
            {currentStory.media[currentMediaIndex]?.type === "video" ? (
              <video
                src={currentStory.media[currentMediaIndex].url}
                className="w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                loop
              />
            ) : (
              <img
                src={currentStory.media[currentMediaIndex]?.url}
                alt="Story"
                className="w-full h-full object-cover"
              />
            )}

            {/* Анимация лайка */}
            {showLikeHeart && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="animate-ping">
                  <Icon
                    name="Heart"
                    size={60}
                    className="text-red-500 fill-red-500"
                  />
                </div>
              </div>
            )}

            {/* Навигация по медиа */}
            {currentStory.media.length > 1 && (
              <>
                {currentMediaIndex > 0 && (
                  <button
                    onClick={goToPreviousMedia}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center z-20"
                  >
                    <Icon name="ChevronLeft" size={16} className="text-white" />
                  </button>
                )}
                {currentMediaIndex < currentStory.media.length - 1 && (
                  <button
                    onClick={goToNextMedia}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center z-20"
                  >
                    <Icon
                      name="ChevronRight"
                      size={16}
                      className="text-white"
                    />
                  </button>
                )}
              </>
            )}

            {/* Точки индикации медиа */}
            {currentStory.media.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
                {currentStory.media.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentMediaIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pause indicator */}
          {isPaused && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                <Icon name="Pause" size={24} className="text-white" />
              </div>
            </div>
          )}

          {/* Floating emojis */}
          {floatingEmojis.map(({ id, emoji, x, y }) => (
            <div
              key={id}
              className="absolute pointer-events-none text-3xl z-10"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                animation: "float-up 3s ease-out forwards",
              }}
            >
              {emoji}
            </div>
          ))}

          {/* Bottom controls */}
          <div className="absolute bottom-8 left-4 right-4 flex items-center justify-between z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onLikeStory?.(currentStory.id)}
                className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <Icon name="Heart" size={24} className="text-red-500" />
              </button>

              {/* Счетчик лайков */}
              {currentStory.likes > 0 && (
                <span className="text-white text-sm font-medium">
                  {currentStory.likes}
                </span>
              )}

              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <Icon name="Smile" size={24} className="text-white" />
              </button>

              <button className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors">
                <Icon name="MessageCircle" size={24} className="text-white" />
              </button>

              <button className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors">
                <Icon name="Send" size={24} className="text-white" />
              </button>
            </div>

            <button className="w-12 h-12 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors">
              <Icon name="Bookmark" size={24} className="text-white" />
            </button>
          </div>

          {/* Emoji picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-24 left-4 right-4 bg-black/90 rounded-2xl p-4 z-30 backdrop-blur-sm">
              <div className="grid grid-cols-4 gap-3">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation areas */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-0 w-1/3 h-full z-10 flex items-center justify-start pl-4"
          >
            <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Icon name="ChevronLeft" size={20} className="text-white" />
            </div>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-0 w-1/3 h-full z-10 flex items-center justify-end pr-4"
          >
            <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <Icon name="ChevronRight" size={20} className="text-white" />
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add CSS animation for floating emojis
const style = document.createElement("style");
style.textContent = `
  @keyframes float-up {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1) rotate(0deg);
    }
    50% {
      opacity: 0.8;
      transform: translateY(-150px) scale(1.3) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-300px) scale(0.5) rotate(360deg);
    }
  }
`;
if (!document.head.querySelector("style[data-story-modal]")) {
  style.setAttribute("data-story-modal", "true");
  document.head.appendChild(style);
}

export default StoryModal;
