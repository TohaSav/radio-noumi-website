import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { useRadioStats } from "@/hooks/useRadioStats";

interface RadioPlayerProps {
  streamUrl: string;
}

const RadioPlayer = ({ streamUrl }: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTrack, setCurrentTrack] = useState("");
  const [subtitle, setSubtitle] = useState("Naturalize & Second Sun - 3am");
  const audioRef = useRef<HTMLAudioElement>(null);
  const stats = useRadioStats();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={streamUrl}
        preload="none"
        onLoadStart={() => console.log("Loading started")}
        onCanPlay={() => console.log("Can play")}
        onError={(e) => console.error("Audio error:", e)}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800/95 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          {/* Мобильная версия */}
          <div className="flex md:hidden flex-col gap-3">
            {/* Верхняя строка: кнопка воспроизведения + индикатор LIVE + слушатели */}
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Icon
                  name={isPlaying ? "Pause" : "Play"}
                  size={24}
                  className="text-slate-800 ml-0.5"
                />
              </button>

              <div className="flex items-center gap-3">
                {/* Индикатор LIVE */}
                <div className="flex items-center gap-2 px-3 py-2 bg-red-500 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-semibold">LIVE</span>
                </div>

                {/* Слушатели */}
                <div className="flex items-center gap-2 text-white/80">
                  <Icon name="Users" size={18} />
                  <span className="text-sm">{stats.listeners}</span>
                </div>
              </div>
            </div>

            {/* Нижняя строка: информация о треке */}
            <div className="text-center">
              <div className="text-white font-semibold truncate text-lg">
                {currentTrack || "Naturalize & Second Sun - 3am"}
              </div>
            </div>

            {/* Громкость на всю ширину */}
            <div className="flex items-center gap-3">
              <Icon name="Volume2" size={20} className="text-white/80" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-white/80 text-sm w-12 text-right">
                {volume}%
              </span>
            </div>
          </div>

          {/* Планшетная и десктопная версия */}
          <div className="hidden md:flex items-center justify-between gap-4">
            {/* Кнопка воспроизведения */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Icon
                  name={isPlaying ? "Pause" : "Play"}
                  size={20}
                  className="text-slate-800 ml-0.5 lg:text-2xl"
                />
              </button>
            </div>

            {/* Информация о треке */}
            <div className="flex-1 min-w-0 text-center lg:text-left">
              <div className="text-white font-semibold truncate text-lg lg:text-xl">
                {currentTrack || "Naturalize & Second Sun - 3am"}
              </div>
            </div>

            {/* Управление громкостью и статистика */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Индикатор LIVE */}
              <div className="flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-2 bg-red-500 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-xs lg:text-sm font-semibold">
                  LIVE
                </span>
              </div>

              {/* Слушатели */}
              <div className="flex items-center gap-2 text-white/80">
                <Icon name="Users" size={16} className="lg:w-5 lg:h-5" />
                <span className="lg:text-lg">{stats.listeners}</span>
              </div>

              {/* Громкость */}
              <div className="hidden lg:flex items-center gap-3">
                <Icon name="Volume2" size={18} className="text-white/80" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-white/80 text-sm w-10 text-right">
                  {volume}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default RadioPlayer;
