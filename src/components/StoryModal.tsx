import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Story {
  id: string;
  image: string;
  author: string;
  timestamp: number;
  type: "image" | "video";
  reactions?: { [emoji: string]: number };
}

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  initialStoryIndex: number;
  onAddReaction: (storyId: string, emoji: string) => void;
}

const StoryModal = ({
  isOpen,
  onClose,
  stories,
  initialStoryIndex,
  onAddReaction,
}: StoryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
      y: Math.random() * 100 + 300,
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

  useEffect(() => {
    if (!isOpen) return;

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
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isOpen, currentIndex, stories.length, onClose, initialStoryIndex]);

  const currentStory = stories[currentIndex];

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  if (!currentStory) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto p-0 bg-black border-none">
        <div className="relative h-[600px] bg-black rounded-lg overflow-hidden">
          {/* Progress bars */}
          <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
            {stories.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
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
          <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Icon name="Music" size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {currentStory.author}
                </p>
                <p className="text-white/70 text-xs">
                  {new Date(currentStory.timestamp).toLocaleDateString("ru-RU")}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Story content */}
          {currentStory.type === "video" ? (
            <video
              src={currentStory.image}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              loop
            />
          ) : (
            <img
              src={currentStory.image}
              alt="Story"
              className="w-full h-full object-cover"
            />
          )}

          {/* Floating emojis */}
          {floatingEmojis.map(({ id, emoji, x, y }) => (
            <div
              key={id}
              className="absolute pointer-events-none text-2xl animate-bounce"
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
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <Icon name="Heart" size={20} className="text-white" />
              </button>

              {/* Показать реакции */}
              {currentStory.reactions &&
                Object.keys(currentStory.reactions).length > 0 && (
                  <div className="flex gap-1">
                    {Object.entries(currentStory.reactions)
                      .slice(0, 3)
                      .map(([emoji, count]) => (
                        <span
                          key={emoji}
                          className="bg-black/30 px-2 py-1 rounded-full text-white text-sm"
                        >
                          {emoji} {count}
                        </span>
                      ))}
                  </div>
                )}
            </div>
          </div>

          {/* Emoji picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-16 left-4 right-4 bg-black/80 rounded-2xl p-3 z-20">
              <div className="grid grid-cols-4 gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl hover:bg-white/20 transition-colors"
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
            className="absolute left-0 top-0 w-1/3 h-full z-10"
          />
          <button
            onClick={goToNext}
            className="absolute right-0 top-0 w-1/3 h-full z-10"
          />
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
      transform: translateY(0) scale(1);
    }
    50% {
      opacity: 0.8;
      transform: translateY(-100px) scale(1.2);
    }
    100% {
      opacity: 0;
      transform: translateY(-200px) scale(0.8);
    }
  }
`;
if (!document.head.querySelector("style[data-story-modal]")) {
  style.setAttribute("data-story-modal", "true");
  document.head.appendChild(style);
}

export default StoryModal;
