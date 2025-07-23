import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface EmbeddedRadioPlayerProps {
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

const EmbeddedRadioPlayer = ({ streamUrl }: EmbeddedRadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [audioData, setAudioData] = useState({ bass: 0, mid: 0, treble: 0, overall: 0 });
  const [listeners, setListeners] = useState(3150084);
  
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

        const bass = dataArray.slice(0, 32).reduce((a, b) => a + b, 0) / 32 / 255;
        const mid = dataArray.slice(32, 96).reduce((a, b) => a + b, 0) / 64 / 255;
        const treble = dataArray.slice(96, 128).reduce((a, b) => a + b, 0) / 32 / 255;
        const overall = dataArray.reduce((a, b) => a + b, 0) / bufferLength / 255;

        setAudioData({ bass, mid, treble, overall });
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
  }, [volume, isPlaying]);

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

  // Динамический стиль фона на основе аудиоданных
  const backgroundStyle = {
    background: isPlaying 
      ? `radial-gradient(circle at center, 
          rgba(${Math.floor(audioData.bass * 255)}, ${Math.floor(audioData.mid * 100)}, ${Math.floor(audioData.treble * 200)}, 0.8),
          rgba(147, 51, 234, ${0.4 + audioData.overall * 0.3}),
          rgba(219, 39, 119, ${0.3 + audioData.mid * 0.4}),
          rgba(59, 130, 246, ${0.2 + audioData.treble * 0.3})
        )`
      : 'linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(219, 39, 119, 0.3), rgba(59, 130, 246, 0.2))',
    transform: isPlaying ? `scale(${1 + audioData.overall * 0.1})` : 'scale(1)',
    transition: 'transform 0.1s ease-out'
  };

  return (
    <div 
      className="relative w-full max-w-2xl mx-auto p-8 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl"
      style={backgroundStyle}
    >
      {/* Музыкальные волны */}
      {isPlaying && (
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full opacity-60"
              style={{
                left: `${20 + i * 15}%`,
                height: `${30 + (audioData.bass + audioData.mid + audioData.treble) * 50}px`,
                bottom: '20px',
                animation: `musicWave ${0.5 + i * 0.1}s infinite ease-in-out`,
                animationDelay: `${i * 0.1}s`,
                transform: `scaleY(${0.5 + audioData.overall * 2})`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Центральная кнопка воспроизведения */}
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-50 border border-white/30"
          style={{
            boxShadow: isPlaying 
              ? `0 0 ${20 + audioData.overall * 30}px rgba(147, 51, 234, ${0.5 + audioData.overall * 0.5})`
              : '0 0 20px rgba(147, 51, 234, 0.3)'
          }}
        >
          {isLoading ? (
            <Icon name="Loader2" size={32} className="text-white animate-spin mx-auto" />
          ) : (
            <Icon 
              name={isPlaying ? "Pause" : "Play"} 
              size={32} 
              className={`text-white mx-auto transition-all duration-200 ${
                isPlaying ? 'scale-110' : 'scale-100'
              }`} 
            />
          )}
        </button>

        {/* Название станции */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Радио Noumi</h2>
          <p className="text-white/80 text-sm mb-2">
            {isPlaying ? "В эфире..." : "Нажмите для воспроизведения"}
          </p>
          <div className="text-sm text-green-400 px-3 py-1 rounded-full bg-green-400/10 inline-block">
            {formatListeners(listeners)} слушателей
          </div>
        </div>

        {/* Регулятор громкости */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <Icon name="Volume2" size={18} className="text-white/80" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="w-32 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, rgba(147, 51, 234, 0.8) 0%, rgba(147, 51, 234, 0.8) ${volume}%, rgba(255, 255, 255, 0.2) ${volume}%, rgba(255, 255, 255, 0.2) 100%)`
            }}
          />
          <span className="text-white/80 text-sm min-w-[2rem]">{volume}%</span>
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

export default EmbeddedRadioPlayer;