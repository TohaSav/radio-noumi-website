import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface VoiceMessageProps {
  audioUrl: string;
  duration: number;
}

const VoiceMessage = ({ audioUrl, duration }: VoiceMessageProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlayback = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      };
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-lg p-3 min-w-[200px]">
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlayback}
        className="h-10 w-10 p-0 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
      >
        <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
      </Button>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="Mic" size={14} className="text-purple-400" />
          <span className="text-xs text-gray-300">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="w-full bg-white/10 rounded-full h-1">
          <div
            className="bg-purple-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default VoiceMessage;
