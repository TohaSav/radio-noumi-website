import { useRef } from "react";
import Icon from "@/components/ui/icon";
import { Story } from "@/types/story";

interface StoryMediaProps {
  story: Story;
  currentMediaIndex: number;
  showLikeHeart: boolean;
  onDoubleTap: (e: React.TouchEvent | React.MouseEvent) => void;
  onPreviousMedia: () => void;
  onNextMedia: () => void;
}

const StoryMedia = ({
  story,
  currentMediaIndex,
  showLikeHeart,
  onDoubleTap,
  onPreviousMedia,
  onNextMedia,
}: StoryMediaProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentMedia = story.media[currentMediaIndex];

  return (
    <div
      className="relative w-full h-full max-w-md mx-auto"
      onClick={onDoubleTap}
      onTouchEnd={onDoubleTap}
    >
      {currentMedia?.type === "video" ? (
        <video
          ref={videoRef}
          src={currentMedia.url}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />
      ) : (
        <img
          src={currentMedia?.url}
          alt="Story"
          className="w-full h-full object-cover"
        />
      )}

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

      {story.media.length > 1 && (
        <>
          {currentMediaIndex > 0 && (
            <button
              onClick={onPreviousMedia}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center z-20"
            >
              <Icon name="ChevronLeft" size={16} className="text-white" />
            </button>
          )}
          {currentMediaIndex < story.media.length - 1 && (
            <button
              onClick={onNextMedia}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center z-20"
            >
              <Icon name="ChevronRight" size={16} className="text-white" />
            </button>
          )}
        </>
      )}

      {story.media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
          {story.media.map((_, index) => (
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
  );
};

export default StoryMedia;
