import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { useRadioStats } from "@/hooks/useRadioStats";

interface RadioPlayerProps {
  streamUrl: string;
}

interface Firework {
  id: number;
  x: number;
  y: number;
}

interface HeartEmoji {
  id: number;
  x: number;
  y: number;
}

interface AudioData {
  bassLevel: number;
  midLevel: number;
  trebleLevel: number;
  overall: number;
}

const RadioPlayer = ({ streamUrl }: { streamUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [userLiked, setUserLiked] = useState<boolean | null>(null);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [heartEmojis, setHeartEmojis] = useState<HeartEmoji[]>([]);
  const [audioData, setAudioData] = useState<AudioData>({
    bassLevel: 0,
    midLevel: 0,
    trebleLevel: 0,
    overall: 0,
  });

  const { listeners, likes, dislikes } = useRadioStats();

  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const setupAudioAnalysis = () => {
    if (!audioRef.current || audioContextRef.current) return;

    try {
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaElementSource(
        audioRef.current,
      );
      analyserRef.current = audioContextRef.current.createAnalyser();

      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);

      analyzeAudio();
    } catch (error) {
      console.warn("Web Audio API not supported:", error);
    }
  };

  const analyzeAudio = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    const bassEnd = Math.floor(dataArrayRef.current.length * 0.1);
    const midEnd = Math.floor(dataArrayRef.current.length * 0.4);

    let bassSum = 0;
    let midSum = 0;
    let trebleSum = 0;
    let overallSum = 0;

    for (let i = 0; i < dataArrayRef.current.length; i++) {
      const value = dataArrayRef.current[i];
      overallSum += value;

      if (i < bassEnd) {
        bassSum += value;
      } else if (i < midEnd) {
        midSum += value;
      } else {
        trebleSum += value;
      }
    }

    setAudioData({
      bassLevel: bassSum / bassEnd / 255,
      midLevel: midSum / (midEnd - bassEnd) / 255,
      trebleLevel: trebleSum / (dataArrayRef.current.length - midEnd) / 255,
      overall: overallSum / dataArrayRef.current.length / 255,
    });

    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  };

  const getMusicType = () => {
    const { bassLevel, midLevel, overall } = audioData;

    if (bassLevel > 0.7 && overall > 0.6) return "club";
    if (bassLevel > 0.5 && midLevel > 0.4) return "bass";
    if (overall < 0.3) return "slow";
    return "normal";
  };

  const getPulseIntensity = () => {
    const musicType = getMusicType();
    const { bassLevel, overall } = audioData;

    switch (musicType) {
      case "club":
        return Math.max(0.8, bassLevel * 1.5);
      case "bass":
        return Math.max(0.6, bassLevel * 1.2);
      case "slow":
        return Math.max(0.2, overall * 0.5);
      default:
        return Math.max(0.4, overall * 0.8);
    }
  };

  const getVisualizerBars = () => {
    const musicType = getMusicType();
    const intensity = getPulseIntensity();

    return Array.from({ length: 12 }, (_, i) => {
      const baseHeight = 20;
      const maxHeight =
        musicType === "club" ? 80 : musicType === "bass" ? 60 : 40;
      const randomFactor = Math.random() * intensity;

      return baseHeight + (maxHeight - baseHeight) * randomFactor;
    });
  };

  const createFirework = (x: number, y: number) => {
    const newFirework: Firework = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    setFireworks((prev) => [...prev, newFirework]);

    setTimeout(() => {
      setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
    }, 1500);
  };

  const createHeartEmoji = (x: number, y: number) => {
    const newHeart: HeartEmoji = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    setHeartEmojis((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHeartEmojis((prev) =>
        prev.filter((heart) => heart.id !== newHeart.id),
      );
    }, 2000);
  };

  const handlePlayerClick = (e: React.MouseEvent) => {
    if (playerRef.current) {
      const rect = playerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      createFirework(x, y);
      createHeartEmoji(x, y);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      } else {
        audioRef.current.play();
        if (!audioContextRef.current) {
          setupAudioAnalysis();
        } else {
          analyzeAudio();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    setUserLiked(userLiked === true ? null : true);
  };

  const handleDislike = () => {
    setUserLiked(userLiked === false ? null : false);
  };

  return (
    <div
      ref={playerRef}
      onClick={handlePlayerClick}
      className="relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)
        `,
      }}
    >
      <audio ref={audioRef} src={streamUrl} crossOrigin="anonymous" />

      {/* Анимированный фон */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            conic-gradient(from 0deg at 50% 50%, 
              rgba(168, 85, 247, 0.8), 
              rgba(59, 130, 246, 0.6), 
              rgba(236, 72, 153, 0.4), 
              rgba(168, 85, 247, 0.8))
          `,
        }}
      />

      <div className="relative z-10 p-8">
        {/* Логотип и название */}
        <div className="text-center mb-8">
          <h1
            className="text-5xl font-bold text-white mb-3 font-montserrat drop-shadow-lg"
            style={{
              textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
            }}
          >
            Radio Noumi
          </h1>
          <p className="text-purple-200 text-lg">
            Твоя музыка, твое настроение
          </p>
          <div className="mt-2 text-sm text-purple-300">
            Режим:{" "}
            {getMusicType() === "club"
              ? "🎵 Клубная"
              : getMusicType() === "bass"
                ? "🎶 С басами"
                : getMusicType() === "slow"
                  ? "🎼 Медленная"
                  : "🎵 Обычная"}
          </div>
        </div>

        {/* Современная визуализация */}
        <div className="flex justify-center mb-8">
          <div className="flex items-end space-x-1 h-20">
            {getVisualizerBars().map((height, i) => (
              <div
                key={i}
                className="w-2 rounded-t-full transition-all duration-75 ease-out"
                style={{
                  height: isPlaying ? `${height}px` : "20px",
                  background: `linear-gradient(to top, 
                    rgba(168, 85, 247, ${0.8 + audioData.bassLevel * 0.4}), 
                    rgba(59, 130, 246, ${0.6 + audioData.midLevel * 0.4}), 
                    rgba(236, 72, 153, ${0.4 + audioData.trebleLevel * 0.6}))`,
                  boxShadow: isPlaying
                    ? `0 0 ${10 + getPulseIntensity() * 20}px rgba(168, 85, 247, 0.6)`
                    : "none",
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Центральная кнопка воспроизведения */}
        <div className="flex items-center justify-center mb-8">
          {/* Анимированные волны от плеера */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(6)].map((_, i) => {
              const musicType = getMusicType();
              const intensity = getPulseIntensity();
              const delay = i * 200;

              let animationDuration;
              let waveSize;
              let opacity;

              switch (musicType) {
                case "club":
                  animationDuration = `${0.8 + Math.sin(audioData.bassLevel * 10) * 0.2}s`;
                  waveSize = `${300 + i * 100 + audioData.bassLevel * 200}px`;
                  opacity = 0.6 + audioData.bassLevel * 0.4;
                  break;
                case "bass":
                  animationDuration = `${1.2 + Math.sin(audioData.bassLevel * 8) * 0.3}s`;
                  waveSize = `${250 + i * 80 + audioData.bassLevel * 150}px`;
                  opacity = 0.5 + audioData.bassLevel * 0.3;
                  break;
                case "slow":
                  animationDuration = `${3 + audioData.overall * 2}s`;
                  waveSize = `${200 + i * 60 + audioData.overall * 100}px`;
                  opacity = 0.2 + audioData.overall * 0.2;
                  break;
                default:
                  animationDuration = `${1.5 + audioData.overall}s`;
                  waveSize = `${225 + i * 70 + audioData.overall * 120}px`;
                  opacity = 0.4 + audioData.overall * 0.2;
              }

              return (
                <div
                  key={i}
                  className="absolute rounded-full border-2 animate-pulse"
                  style={{
                    width: isPlaying ? waveSize : "100px",
                    height: isPlaying ? waveSize : "100px",
                    borderColor:
                      musicType === "club"
                        ? `rgba(168, 85, 247, ${opacity})`
                        : musicType === "bass"
                          ? `rgba(59, 130, 246, ${opacity})`
                          : musicType === "slow"
                            ? `rgba(236, 72, 153, ${opacity})`
                            : `rgba(34, 197, 94, ${opacity})`,
                    animationDuration: isPlaying ? animationDuration : "2s",
                    animationDelay: `${delay}ms`,
                    transform: `scale(${1 + intensity * 0.3})`,
                    boxShadow: isPlaying
                      ? `0 0 ${30 + intensity * 50}px ${
                          musicType === "club"
                            ? `rgba(168, 85, 247, ${opacity * 0.8})`
                            : musicType === "bass"
                              ? `rgba(59, 130, 246, ${opacity * 0.8})`
                              : musicType === "slow"
                                ? `rgba(236, 72, 153, ${opacity * 0.8})`
                                : `rgba(34, 197, 94, ${opacity * 0.8})`
                        }`
                      : "none",
                    transition: "all 0.1s ease-out",
                  }}
                />
              );
            })}
          </div>

          {/* Дополнительные волны для клубной музыки */}
          {getMusicType() === "club" && isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <div
                  key={`club-${i}`}
                  className="absolute rounded-full"
                  style={{
                    width: `${150 + i * 50 + audioData.bassLevel * 100}px`,
                    height: `${150 + i * 50 + audioData.bassLevel * 100}px`,
                    background: `radial-gradient(circle, transparent 60%, rgba(168, 85, 247, ${0.3 + audioData.bassLevel * 0.4}) 70%, transparent 80%)`,
                    animation: `pulse ${0.3 + Math.sin(audioData.bassLevel * 15) * 0.1}s ease-in-out infinite`,
                    animationDelay: `${i * 100}ms`,
                    transform: `scale(${1 + audioData.bassLevel * 0.5}) rotate(${audioData.overall * 360}deg)`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Дополнительные медленные волны для спокойной музыки */}
          {getMusicType() === "slow" && isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <div
                  key={`slow-${i}`}
                  className="absolute rounded-full border border-pink-300/20"
                  style={{
                    width: `${400 + i * 150}px`,
                    height: `${400 + i * 150}px`,
                    animation: `pulse ${4 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 500}ms`,
                    transform: `scale(${0.8 + audioData.overall * 0.4})`,
                    opacity: 0.1 + audioData.overall * 0.2,
                  }}
                />
              ))}
            </div>
          )}

          <button onClick={togglePlay} className="relative group z-10">
            <div
              className="absolute inset-0 rounded-full blur-lg opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)",
              }}
            />
            <div className="relative bg-white text-purple-900 p-6 rounded-full hover:bg-purple-50 transition-all duration-200 shadow-2xl group-hover:shadow-purple-500/25">
              <Icon name={isPlaying ? "Pause" : "Play"} size={40} />
            </div>
          </button>
        </div>

        {/* Громкость */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Icon name="Volume2" size={24} className="text-white" />
          <div className="relative w-40">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, 
                  rgba(168, 85, 247, 0.8) 0%, 
                  rgba(168, 85, 247, 0.8) ${volume * 100}%, 
                  rgba(255, 255, 255, 0.2) ${volume * 100}%, 
                  rgba(255, 255, 255, 0.2) 100%)`,
              }}
            />
          </div>
        </div>

        {/* Счетчик слушателей */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center space-x-3 text-purple-200">
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{
                backgroundColor: "#10b981",
                boxShadow: "0 0 10px rgba(16, 185, 129, 0.8)",
              }}
            />
            <span className="text-xl">
              <span className="font-bold text-white">
                {listeners.toLocaleString()}
              </span>{" "}
              слушают
            </span>
          </div>
        </div>

        {/* Лайки и дизлайки */}
        <div className="flex justify-center space-x-8">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
              userLiked === true
                ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
            }`}
          >
            <Icon
              name="Heart"
              size={24}
              className={userLiked === true ? "fill-current" : ""}
            />
            <span className="font-semibold">{likes.toLocaleString()}</span>
          </button>

          <button
            onClick={handleDislike}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
              userLiked === false
                ? "bg-gray-500 text-white shadow-lg shadow-gray-500/25"
                : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
            }`}
          >
            <Icon
              name="HeartCrack"
              size={24}
              className={userLiked === false ? "fill-current" : ""}
            />
            <span className="font-semibold">{dislikes.toLocaleString()}</span>
          </button>
        </div>
      </div>

      {/* Фейерверки и сердечки остаются без изменений */}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute pointer-events-none z-20"
          style={{
            left: firework.x,
            top: firework.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="firework">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="firework-particle"
                style={
                  {
                    "--angle": `${i * 45}deg`,
                    "--color": `hsl(${Math.random() * 360}, 70%, 60%)`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      ))}

      {heartEmojis.map((heart) => (
        <div
          key={heart.id}
          className="absolute pointer-events-none text-4xl animate-heart-float z-20"
          style={{
            left: heart.x,
            top: heart.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          💕
        </div>
      ))}
    </div>
  );
};

export default RadioPlayer;
