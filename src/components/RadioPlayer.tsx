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

// Функция для получения диапазона слушателей по времени (по Уральскому времени UTC+5)
const getListenerRange = (uralHour: number) => {
  // Пиковое время с 18:00 до 00:00 по Уральскому времени - много слушателей
  if (uralHour >= 18 || uralHour === 23 || uralHour === 0) {
    return { min: 359941258, max: 1579352698 };
  } 
  // Обычное время с 00:00 до 18:00 по Уральскому времени - стандартные показатели
  else if (uralHour >= 9 && uralHour < 15) {
    return { min: 3150129, max: 12458760 };
  } else if (uralHour >= 15 && uralHour < 18) {
    return { min: 4789236, max: 78960456 };
  } else if (uralHour >= 1 && uralHour < 3) {
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
  const [listeners, setListeners] = useState(2954120359);
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
    // Проверяем временный режим "5.87 млрд на 3 часа"
    const tempModeKey = 'radioTempMode_5_87B';
    const tempStartTime = localStorage.getItem(tempModeKey);
    
    if (tempStartTime) {
      const startTime = new Date(tempStartTime);
      const now = new Date();
      const hoursElapsed = (now.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursElapsed < 3) {
        // Ещё в временном режиме - показываем ~5.87 млрд с небольшими колебаниями
        const baseTemp = 5879250300;
        const variation = Math.floor(baseTemp * (Math.random() * 0.001 - 0.0005)); // ±0.05%
        setListeners(baseTemp + variation);
        return;
      } else {
        // 3 часа прошло - убираем временный режим
        localStorage.removeItem(tempModeKey);
      }
    } else {
      // Устанавливаем временный режим (первый запуск)
      localStorage.setItem(tempModeKey, new Date().toISOString());
      const baseTemp = 5879250300;
      const variation = Math.floor(baseTemp * (Math.random() * 0.001 - 0.0005));
      setListeners(baseTemp + variation);
      return;
    }

    // Обычная логика после окончания временного режима
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
    let finalListeners = baseListeners + variation;
    
    // Для пикового времени (18:00-00:00) устанавливаем высокий минимум
    if (uralTime.getHours() >= 18 || uralTime.getHours() < 1) {
      finalListeners = Math.max(359941258, finalListeners);
    } else {
      finalListeners = Math.max(3150084, finalListeners);
    }

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
        // Проверяем временный режим "2.95 млрд на 3 часа"
        const tempModeKey = 'radioTempMode_2_95B';
        const tempStartTime = localStorage.getItem(tempModeKey);
        
        if (tempStartTime) {
          const startTime = new Date(tempStartTime);
          const now = new Date();
          const hoursElapsed = (now.getTime() - startTime.getTime()) / (1000 * 60 * 60);
          
          if (hoursElapsed < 3) {
            // В временном режиме - небольшие колебания вокруг 2.95 млрд
            const baseTemp = 2954120359;
            const changePercent = Math.random() * 0.002 - 0.001; // ±0.1%
            const change = Math.floor(baseTemp * changePercent);
            return Math.max(2950000000, Math.min(2960000000, baseTemp + change));
          }
        }

        // Обычная логика изменений
        const changePercent = Math.random() * 0.035 - 0.0175; // от -1.75% до +1.75%
        const change = Math.floor(current * changePercent);
        let newValue = current + change;

        // Ограничиваем значение диапазоном для текущего времени
        newValue = Math.max(range.min, Math.min(range.max, newValue));
        
        // Для пикового времени (18:00-00:00) по Уральскому времени устанавливаем высокий минимум
        if (hour >= 18 || hour === 23 || hour === 0) {
          newValue = Math.max(359941258, newValue);
        } else {
          // Для обычного времени не опускаем ниже стартового значения
          newValue = Math.max(3150084, newValue);
        }

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
      <div className={`relative backdrop-blur-xl rounded-2xl sm:rounded-3xl px-4 sm:px-5 md:px-7 py-4 sm:py-5 shadow-2xl border transition-all duration-700 overflow-hidden ${
        isPlaying 
          ? 'bg-gradient-to-r from-emerald-950/90 via-teal-950/90 to-cyan-950/90 border-emerald-500/40 shadow-emerald-500/20' 
          : 'bg-zinc-950/95 border-zinc-800/50'
      }`}
        {/* Музыкальные волны */}
        {isPlaying && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 sm:w-1.5 bg-gradient-to-t from-emerald-400 via-teal-400 to-cyan-400 rounded-full opacity-50"
                style={{
                  left: `${10 + i * 10}%`,
                  height: `${15 + (audioData.bass + audioData.mid + audioData.treble) * 35}px`,
                  bottom: '10px',
                  animation: `musicWave ${0.4 + i * 0.08}s infinite ease-in-out`,
                  animationDelay: `${i * 0.08}s`,
                  transform: `scaleY(${0.4 + audioData.overall * 1.8})`
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
            className="flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-full hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 disabled:opacity-50 flex-shrink-0"
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
              <span className="text-xs sm:text-sm text-emerald-400 px-2 sm:px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-500/20 whitespace-nowrap"
                {formatListeners(listeners)} слушателей
              </span>
              <button
                onClick={() => setShowCountries(true)}
                className="text-teal-300 hover:text-teal-200 transition-colors text-xs px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
              >
                Страны
              </button>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 truncate">
              {isPlaying ? (
                <div>
                  <span className="text-emerald-400">● В эфире</span>
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
                <div className="absolute bottom-full right-0 mb-2 bg-zinc-950/95 backdrop-blur-xl rounded-xl p-4 border border-zinc-800/50 shadow-2xl">
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