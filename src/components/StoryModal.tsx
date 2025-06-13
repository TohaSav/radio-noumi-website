import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import {
  Story,
  Comment,
  FloatingEmoji as FloatingEmojiType,
} from "@/types/story";
import StoryProgressBar from "@/components/story/StoryProgressBar";
import StoryHeader from "@/components/story/StoryHeader";
import StoryMedia from "@/components/story/StoryMedia";
import StoryControls from "@/components/story/StoryControls";
import CommentsSection from "@/components/story/CommentsSection";
import EmojiPicker from "@/components/story/EmojiPicker";
import FloatingEmoji from "@/components/story/FloatingEmoji";

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
  const [showComments, setShowComments] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showLikeHeart, setShowLikeHeart] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmojiType[]>([]);
  const [comments, setComments] = useState<{ [storyId: string]: Comment[] }>(
    {},
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStory = stories[currentIndex];

  const handleEmojiSelect = (emoji: string) => {
    onAddReaction(currentStory.id, emoji);

    const floatingEmoji = {
      id: Date.now().toString(),
      emoji,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 200,
    };

    setFloatingEmojis((prev) => [...prev, floatingEmoji]);
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
      if (onLikeStory) {
        onLikeStory(currentStory.id);
      }
      setShowLikeHeart(true);
      setTimeout(() => setShowLikeHeart(false), 1000);
    } else {
      goToNextMedia();
    }
    setLastTap(now);
  };

  const handleAddComment = (text: string) => {
    const comment: Comment = {
      id: Date.now().toString(),
      author: "Гость",
      text,
      timestamp: Date.now(),
    };

    setComments((prev) => ({
      ...prev,
      [currentStory.id]: [...(prev[currentStory.id] || []), comment],
    }));
  };

  const handleMouseDown = () => setIsPaused(true);
  const handleMouseUp = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => setIsPaused(false);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const goToPreviousMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentMediaIndex(stories[currentIndex - 1]?.media.length - 1 || 0);
    }
  };

  const goToNextMedia = () => {
    if (currentMediaIndex < currentStory.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    } else {
      goToNext();
    }
  };

  // Автоматическое воспроизведение и прогресс
  useEffect(() => {
    if (!isOpen || isPaused) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      return;
    }

    const currentMedia = currentStory?.media[currentMediaIndex];
    if (!currentMedia) return;

    setProgress(0);

    if (currentMedia.type === "video") {
      const video = videoRef.current;
      if (video) {
        const handleVideoEnd = () => goToNextMedia();
        const handleTimeUpdate = () => {
          if (video.duration) {
            const progress = (video.currentTime / video.duration) * 100;
            setProgress(progress);
          }
        };

        video.addEventListener("ended", handleVideoEnd);
        video.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
          video.removeEventListener("ended", handleVideoEnd);
          video.removeEventListener("timeupdate", handleTimeUpdate);
        };
      }
    } else {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            goToNextMedia();
            return 0;
          }
          return prev + 100 / 300;
        });
      }, 100);
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isOpen, currentIndex, currentMediaIndex, isPaused, currentStory]);

  useEffect(() => {
    setCurrentMediaIndex(0);
    setProgress(0);
    setShowComments(false);
  }, [currentIndex]);

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
          <StoryProgressBar
            totalStories={stories.length}
            currentIndex={currentIndex}
            progress={progress}
          />

          <StoryHeader
            story={currentStory}
            currentMediaIndex={currentMediaIndex}
            onClose={onClose}
          />

          <StoryMedia
            story={currentStory}
            currentMediaIndex={currentMediaIndex}
            showLikeHeart={showLikeHeart}
            onDoubleTap={handleDoubleTap}
            onPreviousMedia={goToPreviousMedia}
            onNextMedia={goToNextMedia}
          />

          {isPaused && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                <Icon name="Pause" size={24} className="text-white" />
              </div>
            </div>
          )}

          <FloatingEmoji emojis={floatingEmojis} />

          <StoryControls
            story={currentStory}
            comments={comments}
            onLike={() => onLikeStory?.(currentStory.id)}
            onEmojiClick={() => setShowEmojiPicker(!showEmojiPicker)}
            onCommentsClick={() => setShowComments(!showComments)}
          />

          <CommentsSection
            isVisible={showComments}
            comments={comments[currentStory.id] || []}
            onClose={() => setShowComments(false)}
            onAddComment={handleAddComment}
          />

          <EmojiPicker
            isVisible={showEmojiPicker && !showComments}
            onEmojiSelect={handleEmojiSelect}
          />

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
