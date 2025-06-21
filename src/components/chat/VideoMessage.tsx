import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface VideoMessageProps {
  videoUrl: string;
  duration: number;
  thumbnail?: string;
}

const VideoMessage = ({ videoUrl, duration, thumbnail }: VideoMessageProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Ошибка воспроизведения видео:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex items-center gap-3 max-w-xs">
      <div className="relative">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-16 h-16 rounded-xl object-cover"
          poster={thumbnail}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          muted
          playsInline
        />

        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          disabled={isLoading}
          className="absolute inset-0 h-16 w-16 p-0 text-white hover:bg-black/20 rounded-xl backdrop-blur-sm"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
          )}
        </Button>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Icon
            name="Video"
            size={14}
            className="text-purple-300 flex-shrink-0"
          />
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-400 transition-all duration-300"
              style={{
                width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-300">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoMessage;
