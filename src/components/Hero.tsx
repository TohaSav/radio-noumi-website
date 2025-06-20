import { useState } from "react";
import Icon from "@/components/ui/icon";

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative z-10 container mx-auto px-4 py-20 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            Радио <span className="text-purple-400">Noumi</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Твоя музыка, твое настроение. Слушай любимые треки 24/7 в прямом
            эфире
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">Прямой эфир</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">HD</div>
            <div className="text-gray-400">Качество звука</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">∞</div>
            <div className="text-gray-400">Хитов в плейлисте</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
