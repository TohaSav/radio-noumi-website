import { useState } from "react";
import Icon from "@/components/ui/icon";

interface RadioPlayerProps {
  streamUrl: string;
}

const RadioPlayer = ({ streamUrl }: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <Icon name="Radio" size={32} className="text-white" />
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-1">
            Радио Онлайн
          </h3>
          <p className="text-white/80 text-sm">Слушайте музыку прямо сейчас</p>
        </div>

        <button
          onClick={togglePlay}
          className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <Icon
            name={isPlaying ? "Pause" : "Play"}
            size={24}
            className="text-white"
          />
        </button>
      </div>
    </div>
  );
};

export default RadioPlayer;
