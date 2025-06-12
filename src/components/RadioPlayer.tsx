import { useState, useRef, useEffect } from "react";
import { useAudioAnalysis } from "@/hooks/useAudioAnalysis";
import { useFireworks } from "@/hooks/useFireworks";
import { AudioData, MusicType } from "@/types/radio";
import Icon from "@/components/ui/icon";

interface RadioPlayerProps {
  streamUrl?: string;
  likes?: number;
  dislikes?: number;
  listeners?: number;
}

const RadioPlayer = ({
  streamUrl = "https://myradio24.org/61673",
  likes = 0,
  dislikes = 0,
  listeners = 0,
}: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [audioData, setAudioData] = useState<AudioData>({
    bassLevel: 0,
    midLevel: 0,
    trebleLevel: 0,
    overall: 0,
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const { setupAudioAnalysis, analyzeAudio, stopAnalysis } = useAudioAnalysis();
  const {
    fireworks,
    heartEmojis,
    cryingEmojis,
    createFirework,
    createHeartEmoji,
    createCryingEmoji,
  } = useFireworks();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.preload = "auto";
      audioRef.current.crossOrigin = "anonymous";
    }
  }, [volume]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const now = new Date();
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        setCurrentTime(`${minutes}:${seconds}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        stopAnalysis();
        // Плачущие смайлики при остановке
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            createCryingEmoji(
              Math.random() * window.innerWidth,
              Math.random() * 100,
            );
          }, i * 200);
        }
      } else {
        try {
          await audioRef.current.play();
          setupAudioAnalysis(audioRef.current);
          analyzeAudio(setAudioData);
          // Фейерверки при запуске
          setTimeout(
            () =>
              createFirework(window.innerWidth * 0.3, window.innerHeight * 0.4),
            200,
          );
          setTimeout(
            () =>
              createFirework(window.innerWidth * 0.7, window.innerHeight * 0.3),
            400,
          );
        } catch (error) {
          console.error("Ошибка воспроизведения:", error);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Radio Noumi",
        text: "Слушаю крутое радио!",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      createHeartEmoji(window.innerWidth * 0.8, window.innerHeight * 0.3);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <audio
        ref={audioRef}
        src={streamUrl}
        preload="auto"
        crossOrigin="anonymous"
      />

      {/* Основной плеер */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl border border-white/20">
        <div className="flex items-center justify-between gap-4">
          {/* Левая часть - иконка музыки */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-800 rounded-xl flex items-center justify-center">
              <Icon name="Music" size={24} className="text-white" />
            </div>
          </div>

          {/* Центральная часть - кнопка play и информация */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Кнопка play/pause */}
            <button
              onClick={togglePlay}
              className={`relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                isPlaying
                  ? "bg-white text-gray-800 shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {isPlaying && (
                <div className="absolute -inset-1 rounded-full border-2 border-white/50 animate-ping" />
              )}
              <Icon
                name={isPlaying ? "Pause" : "Play"}
                size={20}
                className="transition-colors duration-200"
              />
            </button>

            {/* Время и название */}
            <div className="flex-1 min-w-0">
              <div className="text-white/60 text-sm md:text-base font-mono">
                {currentTime}
              </div>
              <div className="text-white text-sm md:text-lg font-medium truncate">
                Открой глаза
              </div>
            </div>
          </div>

          {/* Правая часть - управление */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Кнопка меню */}
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">
              <Icon name="Menu" size={18} className="text-white" />
            </button>

            {/* Кнопка поделиться */}
            <button
              onClick={handleShare}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <Icon name="Share2" size={18} className="text-white" />
            </button>

            {/* Громкость */}
            <div className="relative">
              <button
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <Icon
                  name={
                    volume === 0
                      ? "VolumeX"
                      : volume < 0.5
                        ? "Volume1"
                        : "Volume2"
                  }
                  size={18}
                  className="text-white"
                />
              </button>

              {/* Слайдер громкости */}
              {showVolumeSlider && (
                <div className="absolute right-0 top-full mt-2 bg-black/80 backdrop-blur-sm rounded-lg p-3 z-10">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                               [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Статистика внизу для мобильных */}
        <div className="mt-4 pt-4 border-t border-white/10 md:hidden">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              />
              <span className="text-white/80">2.1M слушателей</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Icon name="ThumbsUp" size={16} className="text-green-500" />
                <span className="text-white/80">67K</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="ThumbsDown" size={16} className="text-red-500" />
                <span className="text-white/80">115</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Статистика для десктопа */}
      <div className="hidden md:flex items-center justify-center gap-8 mt-6 text-white/80">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
          />
          <span className="text-lg">2.1M слушателей</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Icon name="ThumbsUp" size={20} className="text-green-500" />
            <span className="text-lg">67K</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="ThumbsDown" size={20} className="text-red-500" />
            <span className="text-lg">115</span>
          </div>
        </div>
      </div>

      {/* Эффекты остаются */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {fireworks.map((firework) => (
          <div
            key={firework.id}
            className="absolute text-4xl animate-ping"
            style={{
              left: firework.x,
              top: firework.y,
              animationDuration: "1s",
            }}
          >
            🎆
          </div>
        ))}
        {heartEmojis.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-3xl animate-bounce"
            style={{
              left: heart.x,
              top: heart.y,
              animationDuration: "2s",
            }}
          >
            ❤️
          </div>
        ))}
        {cryingEmojis.map((crying) => (
          <div
            key={crying.id}
            className="absolute text-3xl animate-pulse"
            style={{
              left: crying.x,
              top: crying.y,
              animationDuration: "1.5s",
            }}
          >
            😢
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioPlayer;
