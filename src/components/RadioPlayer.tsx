import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import CountriesModal from "@/components/radio/CountriesModal";

interface RadioPlayerProps {
  streamUrl: string;
  onPlayingChange?: (isPlaying: boolean) => void;
  onAudioData?: (data: {
    bass: number;
    mid: number;
    treble: number;
    overall: number;
  }) => void;
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

// Функция для генерации базового значения на основе времени и даты
const generateBaseListeners = (uralTime: Date): number => {
  const hour = uralTime.getHours();
  const day = uralTime.getDate();
  const range = getListenerRange(hour);

  // Используем день месяца и час для создания стабильного базового значения
  const seed = day * 100 + hour;
  const random = Math.sin(seed) * 10000;
  const normalizedRandom = random - Math.floor(random);

  return Math.floor(range.min + normalizedRandom * (range.max - range.min));
};

const RadioPlayer = (props: RadioPlayerProps) => {
  const { streamUrl, onPlayingChange } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [listeners, setListeners] = useState(3150084);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const [audioData, setAudioData] = useState({
    bass: 0,
    mid: 0,
    treble: 0,
    overall: 0,
  });
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>();

  // Инициализация счетчика слушателей
  useEffect(() => {
    const uralTime = getUralTime();
    const currentHour = uralTime.getHours();
    const currentDay = uralTime.getDate();

    // Ключ для хранения данных на основе дня и часа
    const storageKey = `radioListeners_${currentDay}_${currentHour}`;
    const savedListeners = localStorage.getItem(storageKey);
    const lastUpdateKey = `radioLastUpdate_${currentDay}_${currentHour}`;
    const savedTime = localStorage.getItem(lastUpdateKey);

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

    // Генерируем базовое значение для текущего часа
    const baseListeners = generateBaseListeners(uralTime);

    // Добавляем небольшую вариацию (±1-3%)
    const variation = Math.floor(baseListeners * (Math.random() * 0.06 - 0.03));
    const finalListeners = Math.max(3150084, baseListeners + variation);

    setListeners(finalListeners);
    localStorage.setItem(storageKey, finalListeners.toString());
    localStorage.setItem(lastUpdateKey, new Date().toISOString());
  }, []);

  // Обновление счетчика каждые 3-7 минут на небольшое значение
  useEffect(() => {
    const updateListeners = () => {
      const uralTime = getUralTime();
      const hour = uralTime.getHours();
      const day = uralTime.getDate();
      const range = getListenerRange(hour);
      const storageKey = `radioListeners_${day}_${hour}`;
      const lastUpdateKey = `radioLastUpdate_${day}_${hour}`;

      setListeners((current) => {
        // Реалистичные изменения: ±0.5-2% от текущего значения
        const changePercent = Math.random() * 0.035 - 0.0175; // от -1.75% до +1.75%
        const change = Math.floor(current * changePercent);
        let newValue = current + change;

        // Ограничиваем значение диапазоном для текущего времени
        newValue = Math.max(range.min, Math.min(range.max, newValue));
        // Не опускаем ниже стартового значения
        newValue = Math.max(3150084, newValue);

        // Сохраняем с привязкой к часу
        localStorage.setItem(storageKey, newValue.toString());
        localStorage.setItem(lastUpdateKey, new Date().toISOString());

        return newValue;
      });
    };

    // Первое обновление через 30 секунд
    const initialTimeout = setTimeout(updateListeners, 30000);

    // Затем обновления каждые 3-7 минут
    const interval = setInterval(
      updateListeners,
      Math.random() * 240000 + 180000,
    );

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
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

    const handlePlay = () => {
      if (!audioContextRef.current) {
        try {
          audioContextRef.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 256;

          if (!sourceRef.current) {
            sourceRef.current =
              audioContextRef.current.createMediaElementSource(audio);
            sourceRef.current.connect(analyserRef.current);
            analyserRef.current.connect(audioContextRef.current.destination);
          }

          startAudioAnalysis();
        } catch (error) {
          console.error("Audio context error:", error);
        }
      } else if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
        startAudioAnalysis();
      }
    };

    const handlePause = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    const startAudioAnalysis = () => {
      if (!analyserRef.current) return;

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const analyze = () => {
        if (!analyserRef.current || !isPlaying) return;

        analyserRef.current.getByteFrequencyData(dataArray);

        // Анализируем разные частотные диапазоны
        const bass =
          dataArray.slice(0, 32).reduce((a, b) => a + b, 0) / 32 / 255;
        const mid =
          dataArray.slice(32, 96).reduce((a, b) => a + b, 0) / 64 / 255;
        const treble =
          dataArray.slice(96, 128).reduce((a, b) => a + b, 0) / 32 / 255;
        const overall =
          dataArray.reduce((a, b) => a + b, 0) / bufferLength / 255;

        setAudioData({ bass, mid, treble, overall });
        props.onAudioData?.({ bass, mid, treble, overall });

        animationFrameRef.current = requestAnimationFrame(analyze);
      };

      analyze();
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("error", handleError);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [volume, isPlaying, props.onAudioData]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        onPlayingChange?.(false);
      } else {
        setIsLoading(true);
        await audio.play();
        setIsPlaying(true);
        onPlayingChange?.(true);
      }
    } catch (error) {
      console.error("Ошибка воспроизведения:", error);
      setIsLoading(false);
      setIsPlaying(false);
      onPlayingChange?.(false);
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
      <div className={`relative backdrop-blur-md rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 shadow-2xl border transition-all duration-1000 overflow-hidden ${
        isPlaying 
          ? 'bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-blue-900/80 border-purple-400/30 animate-pulse-slow' 
          : 'bg-black/80 border-white/10'
      }`}>
        {/* Музыкальные волны */}
        {isPlaying && (
          <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 sm:w-1.5 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full opacity-40"
                style={{
                  left: `${15 + i * 15}%`,
                  height: `${10 + (audioData.bass + audioData.mid + audioData.treble) * 30}px`,
                  bottom: '8px',
                  animation: `musicWave ${0.5 + i * 0.1}s infinite ease-in-out`,
                  animationDelay: `${i * 0.1}s`,
                  transform: `scaleY(${0.3 + audioData.overall * 1.5})`
                }}
              />
            ))}
          </div>
        )}
        <div className="relative z-10 flex items-center space-x-2 sm:space-x-3 md:space-x-4">
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
              <button
                onClick={() => setShowCountries(true)}
                className="text-purple-300 hover:text-purple-200 transition-colors text-xs px-1 py-0.5 rounded bg-white/10 hover:bg-white/20"
              >
                Страны
              </button>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 truncate">
              {isPlaying ? (
                <div>
                  <span className="text-green-400">В эфире...</span>
                </div>
              ) : (
                "Нажмите для воспроизведения"
              )}
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Desktop Volume */}
            <div className="hidden sm:flex items-center space-x-2">
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

            {/* Mobile Volume Button */}
            <div className="sm:hidden relative">
              <button
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
              >
                <Icon name="Volume2" size={16} className="text-gray-400" />
              </button>

              {/* Mobile Volume Slider */}
              {showVolumeSlider && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-md rounded-lg p-3 border border-white/10 shadow-lg">
                  <div className="flex flex-col items-center space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) =>
                        handleVolumeChange(Number(e.target.value))
                      }
                      className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider transform rotate-180"
                      style={{ writingMode: "bt-lr" }}
                    />
                    <span className="text-xs text-gray-300">{volume}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={streamUrl}
        preload="none"
        crossOrigin="anonymous"
      />
      <CountriesModal open={showCountries} onOpenChange={setShowCountries} />
    </div>
  );
};

export default RadioPlayer;