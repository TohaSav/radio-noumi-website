import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface RadioPlayerProps {
  streamUrl: string;
}

const RadioPlayer = ({ streamUrl }: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Ошибка воспроизведения:", error);
        } finally {
          setIsLoading(false);
        }
      }
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
        preload="metadata"
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Красивый градиентный фон */}
        <div className="bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Мобильная версия */}
            <div className="flex md:hidden flex-col gap-4">
              <div className="flex items-center justify-between">
                {/* Кнопка воспроизведения */}
                <Button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Icon
                      name={isPlaying ? "Pause" : "Play"}
                      size={28}
                      className="text-white ml-0.5"
                    />
                  )}
                </Button>

                {/* LIVE индикатор и статистика */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-sm font-bold">LIVE</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/90">
                    <Icon name="Users" size={18} />
                    <span className="text-sm font-semibold">1,247</span>
                  </div>
                </div>
              </div>

              {/* Информация о треке */}
              <div className="text-center">
                <div className="text-white font-bold text-lg mb-1">
                  🎵 Сейчас играет: Naturalize & Second Sun - 3am
                </div>
                <div className="text-white/70 text-sm">
                  Популярная музыка со всего мира
                </div>
              </div>

              {/* Управление громкостью */}
              <div className="flex items-center gap-3">
                <Icon name="Volume2" size={20} className="text-white/80" />
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div
                    className="absolute top-0 left-0 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg pointer-events-none"
                    style={{ width: `${volume}%` }}
                  />
                </div>
                <span className="text-white/80 text-sm font-semibold w-12 text-right">
                  {volume}%
                </span>
              </div>
            </div>

            {/* Десктопная версия */}
            <div className="hidden md:flex items-center justify-between gap-6">
              {/* Левая часть - управление */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Icon
                      name={isPlaying ? "Pause" : "Play"}
                      size={24}
                      className="text-white ml-0.5"
                    />
                  )}
                </Button>

                {/* Управление громкостью */}
                <div className="flex items-center gap-3">
                  <Icon name="Volume2" size={20} className="text-white/80" />
                  <div className="relative w-32">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div
                      className="absolute top-0 left-0 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg pointer-events-none"
                      style={{ width: `${volume}%` }}
                    />
                  </div>
                  <span className="text-white/80 text-sm font-semibold w-12">
                    {volume}%
                  </span>
                </div>
              </div>

              {/* Центральная часть - информация о треке */}
              <div className="flex-1"></div>

              {/* Правая часть - статистика */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-bold">LIVE</span>
                </div>

                <div className="flex items-center gap-2 text-white/90">
                  <Icon name="Users" size={20} />
                  <span className="font-semibold">1,247</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </>
  );
};

export default RadioPlayer;
