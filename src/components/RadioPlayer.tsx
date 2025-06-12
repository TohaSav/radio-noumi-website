import { useState, useRef, useEffect } from "react";
import { useAudioAnalysis } from "@/hooks/useAudioAnalysis";
import { useFireworks } from "@/hooks/useFireworks";
import { AudioData, MusicType } from "@/types/radio";
import Icon from "@/components/ui/icon";
import MusicWaves from "@/components/MusicWaves";

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

  // Состояние для счетчика слушателей
  const [listenerCount, setListenerCount] = useState(() => {
    const saved = localStorage.getItem("radioListenerCount");
    return saved ? parseInt(saved, 10) : 2987250;
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

  // Эффект для увеличения счетчика слушателей
  useEffect(() => {
    const interval = setInterval(() => {
      setListenerCount((prev) => {
        const newCount = prev + Math.floor(Math.random() * 3) + 1; // Увеличиваем на 1-3
        localStorage.setItem("radioListenerCount", newCount.toString());
        return newCount;
      });
    }, 5000); // Обновляем каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

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
    <>
      {/* Анимированные музыкальные волны */}
      <MusicWaves isPlaying={isPlaying} audioData={audioData} />

      <audio
        ref={audioRef}
        src={streamUrl}
        preload="auto"
        crossOrigin="anonymous"
      />

      {/* Фиксированный плеер внизу */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
            {/* Левая часть - иконка музыки */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                <Icon
                  name="Music"
                  size={16}
                  className="text-white sm:w-5 sm:h-5"
                />
              </div>
            </div>

            {/* Кнопка play/pause */}
            <button
              onClick={togglePlay}
              className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                isPlaying
                  ? "bg-gray-800 text-white shadow-lg"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {isPlaying && (
                <div className="absolute -inset-1 rounded-full border-2 border-gray-400/50 animate-ping" />
              )}
              <Icon
                name={isPlaying ? "Pause" : "Play"}
                size={16}
                className="transition-colors duration-200 sm:w-5 sm:h-5"
              />
            </button>

            {/* Центральная часть - время и название */}
            <div className="flex-1 min-w-0 px-2 sm:px-3">
              <div className="text-gray-500 text-xs sm:text-sm font-mono">
                {currentTime}
              </div>
              <div className="text-gray-800 text-sm sm:text-base font-medium truncate">
                Открой глаза
              </div>
            </div>

            {/* Правая часть - управление */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Кнопка меню - скрыта на очень маленьких экранах */}
              <button className="hidden xs:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors items-center justify-center">
                <Icon
                  name="Menu"
                  size={16}
                  className="text-gray-600 sm:w-5 sm:h-5"
                />
              </button>

              {/* Счетчик слушателей */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Icon name="Users" size={16} />
                <span>{listenerCount.toLocaleString("ru-RU")}</span>
              </div>

              {/* Интерактивный счетчик лайков */}
              <button
                onClick={() => {
                  const currentLikes = parseInt(
                    localStorage.getItem("radioLikes") || "79580",
                  );
                  const userLikes = parseInt(
                    localStorage.getItem("userLikes") || "0",
                  );
                  const newUserLikes = userLikes + 1;

                  localStorage.setItem(
                    "radioLikes",
                    (currentLikes + 1).toString(),
                  );
                  localStorage.setItem("userLikes", newUserLikes.toString());

                  // Обновить состояние для перерендера
                  window.dispatchEvent(new Event("storage"));
                }}
                className="flex items-center space-x-2 text-sm hover:text-red-500 transition-colors group"
              >
                <Icon
                  name="Heart"
                  size={16}
                  className={`transition-colors ${parseInt(localStorage.getItem("userLikes") || "0") > 0 ? "text-red-500 fill-red-500" : "group-hover:text-red-500"}`}
                />
                <span className="group-hover:text-red-500">
                  {(() => {
                    const baseCount = 79580;
                    const stored = localStorage.getItem("radioLikes");
                    const savedTime = localStorage.getItem("radioLikesTime");

                    if (stored && savedTime) {
                      const timeDiff = Math.floor(
                        (Date.now() - parseInt(savedTime)) / 60000,
                      );
                      const currentCount = parseInt(stored) + timeDiff * 10;
                      localStorage.setItem(
                        "radioLikes",
                        currentCount.toString(),
                      );
                      localStorage.setItem(
                        "radioLikesTime",
                        Date.now().toString(),
                      );

                      if (currentCount >= 1000000) {
                        return (currentCount / 1000000).toFixed(1) + "M";
                      } else if (currentCount >= 1000) {
                        return (currentCount / 1000).toFixed(1) + "K";
                      }
                      return currentCount.toLocaleString("ru-RU");
                    }

                    localStorage.setItem("radioLikes", baseCount.toString());
                    localStorage.setItem(
                      "radioLikesTime",
                      Date.now().toString(),
                    );
                    return "79.6K";
                  })()}
                </span>
              </button>

              {/* Кнопка поделиться */}
              <button
                onClick={handleShare}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <Icon
                  name="Share2"
                  size={16}
                  className="text-gray-600 sm:w-5 sm:h-5"
                />
              </button>

              {/* Громкость */}
              <div className="relative">
                <button
                  onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <Icon
                    name={
                      volume === 0
                        ? "VolumeX"
                        : volume < 0.5
                          ? "Volume1"
                          : "Volume2"
                    }
                    size={16}
                    className="text-gray-600 sm:w-5 sm:h-5"
                  />
                </button>

                {/* Слайдер громкости */}
                {showVolumeSlider && (
                  <div className="absolute right-0 bottom-full mb-2 bg-white shadow-xl rounded-lg p-3 border border-gray-200">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                                 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-800
                                 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Эффекты остаются */}
      <div className="fixed inset-0 pointer-events-none z-40">
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
    </>
  );
};

export default RadioPlayer;
