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

const getUralTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const uralTime = new Date(utc + 5 * 3600000);
  return uralTime;
};

const formatListeners = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const getListenerRange = (uralHour: number) => {
  if (uralHour >= 18 || uralHour === 23 || uralHour === 0) {
    return { min: 359941258, max: 1579352698 };
  } 
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

const generateBaseListeners = (uralTime: Date): number => {
  const hour = uralTime.getHours();
  const day = uralTime.getDate();
  const range = getListenerRange(hour);

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

  useEffect(() => {
    const tempModeKey = 'radioTempMode_5_87B';
    const tempStartTime = localStorage.getItem(tempModeKey);
    
    if (tempStartTime) {
      const startTime = new Date(tempStartTime);
      const now = new Date();
      const hoursElapsed = (now.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursElapsed < 3) {
        const baseTemp = 5879250300;
        const variation = Math.floor(baseTemp * (Math.random() * 0.001 - 0.0005));
        setListeners(baseTemp + variation);
        return;
      } else {
        localStorage.removeItem(tempModeKey);
      }
    } else {
      localStorage.setItem(tempModeKey, new Date().toISOString());
      const baseTemp = 5879250300;
      const variation = Math.floor(baseTemp * (Math.random() * 0.001 - 0.0005));
      setListeners(baseTemp + variation);
      return;
    }

    const uralTime = getUralTime();
    const currentHour = uralTime.getHours();
    const currentDay = uralTime.getDate();

    const storageKey = `radioListeners_${currentDay}_${currentHour}`;
    const savedListeners = localStorage.getItem(storageKey);
    const lastUpdateKey = `radioLastUpdate_${currentDay}_${currentHour}`;
    const savedTime = localStorage.getItem(lastUpdateKey);

    if (savedListeners && savedTime) {
      const lastUpdate = new Date(savedTime);
      const now = getUralTime();
      const timeDiff = (now.getTime() - lastUpdate.getTime()) / 1000 / 60;

      if (timeDiff < 60) {
        setListeners(parseInt(savedListeners));
        return;
      }
    }

    const baseListeners = generateBaseListeners(uralTime);

    const variation = Math.floor(baseListeners * (Math.random() * 0.06 - 0.03));
    let finalListeners = baseListeners + variation;
    
    if (uralTime.getHours() >= 18 || uralTime.getHours() < 1) {
      finalListeners = Math.max(359941258, finalListeners);
    } else {
      finalListeners = Math.max(3150084, finalListeners);
    }

    setListeners(finalListeners);
    localStorage.setItem(storageKey, finalListeners.toString());
    localStorage.setItem(lastUpdateKey, new Date().toISOString());
  }, []);

  useEffect(() => {
    const updateListeners = () => {
      const uralTime = getUralTime();
      const hour = uralTime.getHours();
      const day = uralTime.getDate();
      const range = getListenerRange(hour);
      const storageKey = `radioListeners_${day}_${hour}`;
      const lastUpdateKey = `radioLastUpdate_${day}_${hour}`;

      setListeners((current) => {
        const tempModeKey = 'radioTempMode_2_95B';
        const tempStartTime = localStorage.getItem(tempModeKey);
        
        if (tempStartTime) {
          const startTime = new Date(tempStartTime);
          const now = new Date();
          const hoursElapsed = (now.getTime() - startTime.getTime()) / (1000 * 60 * 60);
          
          if (hoursElapsed < 3) {
            const baseTemp = 2954120359;
            const changePercent = Math.random() * 0.002 - 0.001;
            const change = Math.floor(baseTemp * changePercent);
            return Math.max(2950000000, Math.min(2960000000, baseTemp + change));
          }
        }

        const changePercent = Math.random() * 0.035 - 0.0175;
        const change = Math.floor(current * changePercent);
        let newValue = current + change;

        newValue = Math.max(range.min, Math.min(range.max, newValue));
        
        if (hour >= 18 || hour === 23 || hour === 0) {
          newValue = Math.max(359941258, newValue);
        } else {
          newValue = Math.max(3150084, newValue);
        }

        localStorage.setItem(storageKey, newValue.toString());
        localStorage.setItem(lastUpdateKey, new Date().toISOString());

        return newValue;
      });
    };

    const initialTimeout = setTimeout(updateListeners, 30000);

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
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
      <div className={`relative backdrop-blur-2xl px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 md:py-6 shadow-2xl border-t transition-all duration-700 overflow-hidden ${
        isPlaying 
          ? 'bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 border-purple-500/30 shadow-purple-500/30' 
          : 'bg-slate-900/60 border-slate-700/40'
      }`}>
        {/* Animated gradient overlay when playing */}
        {isPlaying && (
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 animate-pulse"></div>
          </div>
        )}

        {/* Animated frequency bars */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 flex items-end justify-around px-8 pb-2 gap-1">
            {[...Array(32)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-60"
                style={{
                  height: `${8 + (audioData.bass + audioData.mid + audioData.treble) * 20}px`,
                  animation: `musicWave ${0.3 + i * 0.03}s infinite ease-in-out`,
                  animationDelay: `${i * 0.03}s`,
                  transform: `scaleY(${0.5 + audioData.overall * 1.5})`
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10 flex items-center gap-3 sm:gap-4 md:gap-6">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl transition-all duration-500 disabled:opacity-50 flex-shrink-0 shadow-xl ${
              isPlaying 
                ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50' 
                : 'bg-gradient-to-br from-slate-700 to-slate-600 hover:scale-105'
            }`}
          >
            {isLoading ? (
              <Icon
                name="Loader2"
                size={20}
                className="text-white animate-spin sm:w-6 sm:h-6"
              />
            ) : (
              <Icon
                name={isPlaying ? "Pause" : "Play"}
                size={20}
                className="text-white sm:w-6 sm:h-6"
              />
            )}
          </button>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <h3 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent truncate">
                Радио Noumi
              </h3>
              {isPlaying && (
                <span className="hidden sm:flex items-center gap-2 text-xs font-medium text-purple-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm whitespace-nowrap">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                  В эфире
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <Icon name="Users" size={12} className="text-purple-400 sm:w-3.5 sm:h-3.5" />
                <span className="text-xs sm:text-sm">{formatListeners(listeners)}</span>
              </span>
              <button
                onClick={() => setShowCountries(true)}
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all duration-300 text-xs sm:text-sm whitespace-nowrap"
              >
                🌍 Страны
              </button>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-3">
              <Icon
                name={volume === 0 ? "VolumeX" : "Volume2"}
                size={18}
                className="text-slate-400"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-20 lg:w-24 h-2 bg-slate-600/50 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-pink-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
              />
              <span className="text-xs font-medium text-slate-400 w-8 lg:w-10 text-right">{volume}%</span>
            </div>

            {/* Mobile Volume */}
            <div className="lg:hidden relative">
              <button
                onClick={() => setShowVolumeSlider(!showVolumeSlider)}
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl hover:bg-white/5 transition-colors"
              >
                <Icon name={volume === 0 ? "VolumeX" : "Volume2"} size={18} className="text-slate-400 sm:w-5 sm:h-5" />
              </button>

              {showVolumeSlider && (
                <div className="absolute bottom-full right-0 mb-3 bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50 shadow-2xl">
                  <div className="flex flex-col items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => handleVolumeChange(Number(e.target.value))}
                      className="w-24 h-2 bg-slate-600 rounded-full appearance-none cursor-pointer transform rotate-180 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-purple-500 [&::-webkit-slider-thumb]:to-pink-500"
                    />
                    <span className="text-xs font-medium text-slate-300">{volume}%</span>
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