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
        <div className="max-w-screen-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Кнопка воспроизведения */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Icon
                  name={isPlaying ? "Pause" : "Play"}
                  size={20}
                  className="text-slate-800 ml-0.5"
                />
              </button>
            </div>

            {/* Информация о треке */}
            <div className="flex-1 min-w-0 text-center md:text-left">
              <div className="text-white font-semibold truncate text-lg">
                {currentTrack}
              </div>
              <div className="text-white/70 text-sm truncate">{subtitle}</div>
            </div>

            {/* Управление громкостью и статистика */}
            <div className="flex items-center gap-4">
              {/* Индикатор LIVE */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-red-500 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-xs font-semibold">LIVE</span>
              </div>

              {/* Слушатели */}
              <div className="hidden md:flex items-center gap-2 text-white/80">
                <Icon name="Users" size={16} />
                <span className="text-sm font-medium">
                  {stats.listeners.toLocaleString()}
                </span>
              </div>

              {/* Громкость */}
              <div className="hidden lg:flex items-center gap-2">
                <Icon name="Volume2" size={16} className="text-white/80" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-white/80 text-sm w-8 text-right">
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
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
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
