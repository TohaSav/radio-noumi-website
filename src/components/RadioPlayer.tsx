import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { RadioPlayerProps } from "@/types/radio";

const RadioPlayer = ({ streamUrl }: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <audio ref={audioRef} src={streamUrl} />

      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          Radio Player
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {isPlaying ? "Now Playing" : "Ready to Play"}
        </p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <button
          onClick={togglePlay}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </button>
      </div>

      <div className="flex items-center space-x-3">
        <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <span className="text-sm text-gray-600 dark:text-gray-300 w-8">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
};

export default RadioPlayer;
