import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Story {
  id: string;
  image: string;
  author: string;
  timestamp: number;
}

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: Story[];
  initialStoryIndex: number;
}

const StoryModal = ({
  isOpen,
  onClose,
  stories,
  initialStoryIndex,
}: StoryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);

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

          {/* Story image */}
          <img
            src={currentStory.image}
            alt="Story"
            className="w-full h-full object-cover"
          />

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

export default StoryModal;
