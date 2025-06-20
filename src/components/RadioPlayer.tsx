import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface RadioPlayerProps {
  streamUrl: string;
}

// Функция для получения уральского времени
const getUralTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const uralTime = new Date(utc + 5 * 3600000); // UTC+5
  return uralTime;
};

// Функция для форматирования числа в сокращенный вид
const formatListeners = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Функция для получения диапазона слушателей по времени
const getListenerRange = (hour: number) => {
  if (hour >= 9 && hour < 15) {
    return { min: 3150129, max: 12458760 };
  } else if (hour >= 15 && hour < 21) {
    return { min: 4789236, max: 78960456 };
  } else if (hour >= 21 || hour < 3) {
    return { min: 7963509, max: 96350521 };
  } else {
    return { min: 5698750, max: 9321456 };
  }
};

const RadioPlayer = ({ streamUrl }: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [listeners, setListeners] = useState(3150084);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Инициализация счетчика слушателей
  useEffect(() => {
    const savedListeners = localStorage.getItem("radioListeners");
    const savedTime = localStorage.getItem("radioLastUpdate");

    if (savedListeners && savedTime) {
      const lastUpdate = new Date(savedTime);
      const now = getUralTime();
      const timeDiff = (now.getTime() - lastUpdate.getTime()) / 1000 / 60; // в минутах

      if (timeDiff < 60) {
        // Если прошло меньше часа, используем сохраненное значение
        setListeners(parseInt(savedListeners));
        return;
      }
    }

    // Генерируем новое значение на основе времени
    const uralTime = getUralTime();
    const hour = uralTime.getHours();
    const range = getListenerRange(hour);
    const randomListeners =
      Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

    setListeners(randomListeners);
    localStorage.setItem("radioListeners", randomListeners.toString());
    localStorage.setItem("radioLastUpdate", new Date().toISOString());
  }, []);

  // Обновление счетчика каждые 2-5 минут на небольшое значение
  useEffect(() => {
    const interval = setInterval(
      () => {
        const uralTime = getUralTime();
        const hour = uralTime.getHours();
        const range = getListenerRange(hour);

        setListeners((current) => {
          // Небольшое изменение в пределах ±50-200 слушателей
          const change = Math.floor(Math.random() * 401) - 200;
          let newValue = current + change;

          // Ограничиваем значение диапазоном для текущего времени
          newValue = Math.max(range.min, Math.min(range.max, newValue));

          localStorage.setItem("radioListeners", newValue.toString());
          localStorage.setItem("radioLastUpdate", new Date().toISOString());

          return newValue;
        });
      },
      Math.random() * 180000 + 120000,
    ); // 2-5 минут

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume / 100;

    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("error", handleError);
    };
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Ошибка воспроизведения:", error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl px-4 sm:px-0">
      <div className="bg-black/80 backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 shadow-2xl border border-white/10">
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-105 transition-transform duration-200 disabled:opacity-50 flex-shrink-0"
          >
            {isLoading ? (
              <Icon
                name="Loader2"
                size={16}
                className="text-white animate-spin sm:w-[18px] sm:h-[18px] md:w-5 md:h-5"
              />
            ) : (
              <Icon
                name={isPlaying ? "Pause" : "Play"}
                size={16}
                className="text-white ml-0.5 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5"
              />
            )}
          </button>

          {/* Now Playing */}
          <div className="text-white min-w-0 flex-1">
            <div className="text-sm sm:text-base font-medium flex items-center space-x-1 sm:space-x-2">
              <span className="truncate">Радио Noumi</span>
              <span className="text-xs sm:text-sm text-green-400 px-1.5 sm:px-2 py-0.5 rounded-full bg-green-400/10 whitespace-nowrap">
                {formatListeners(listeners)} слушателей
              </span>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 truncate">
              {isPlaying ? "В эфире..." : "Нажмите для воспроизведения"}
            </div>
          </div>

          {/* Volume Control */}
          <div className="hidden sm:flex items-center space-x-2 flex-shrink-0">
            <Icon
              name="Volume2"
              size={18}
              className="text-gray-400 md:w-5 md:h-5"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-16 sm:w-18 md:w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={streamUrl}
        preload="none"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default RadioPlayer;
