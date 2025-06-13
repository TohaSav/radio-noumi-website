import { useState } from "react";
import Icon from "@/components/ui/icon";

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
          <Icon name="Radio" size={48} className="text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Сейчас играет</h2>
        <p className="text-white/80">Популярная музыка 24/7</p>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-4 transition-all duration-200"
      >
        <Icon
          name={isPlaying ? "Pause" : "Play"}
          size={32}
          className="text-white ml-1"
        />
      </button>
    </div>
  );
};

export default RadioPlayer;
