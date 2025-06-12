import { useState, useRef, useEffect } from "react";
import { useRadioStats } from "@/hooks/useRadioStats";
import { useAudioAnalysis } from "@/hooks/useAudioAnalysis";
import { useFireworks } from "@/hooks/useFireworks";
import RadioHeader from "@/components/radio/RadioHeader";
import AudioVisualizer from "@/components/radio/AudioVisualizer";
import AnimatedWaves from "@/components/radio/AnimatedWaves";
import PlayButton from "@/components/radio/PlayButton";
import VolumeControl from "@/components/radio/VolumeControl";
import RadioStats from "@/components/radio/RadioStats";
import FireworksEffect from "@/components/radio/FireworksEffect";
import { AudioData, MusicType, RadioPlayerProps } from "@/types/radio";

const RadioPlayer = ({ streamUrl }: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [userLiked, setUserLiked] = useState<boolean | null>(null);
  const [audioData, setAudioData] = useState<AudioData>({
    bassLevel: 0,
    midLevel: 0,
    trebleLevel: 0,
    overall: 0,
  });

  const { listeners, likes, dislikes } = useRadioStats();
  const { setupAudioAnalysis, analyzeAudio, stopAnalysis } = useAudioAnalysis();
  const { fireworks, heartEmojis, createFirework, createHeartEmoji } =
    useFireworks();

  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopAnalysis();
    };
  }, [stopAnalysis]);

  const getMusicType = (): MusicType => {
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
      } else {
        audioRef.current.play();
        if (!audioRef.current) {
          // Исправлено условие
          setupAudioAnalysis(audioRef.current);
        }
        analyzeAudio(setAudioData);
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

  const musicType = getMusicType();
  const pulseIntensity = getPulseIntensity();

  return (
    <div
      ref={playerRef}
      onClick={handlePlayerClick}
      className="relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer backdrop-blur-sm border border-white/10"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.6) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.5) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 50%, rgba(30, 58, 138, 0.95) 100%)
        `,
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(168, 85, 247, 0.3)",
      }}
    >
      <audio ref={audioRef} src={streamUrl} crossOrigin="anonymous" />

      {/* Анимированный фон с пульсацией */}
      <div
        className="absolute inset-0 opacity-20 animate-pulse"
        style={{
          background: `
            conic-gradient(from ${audioData.overall * 360}deg at 50% 50%, 
              rgba(168, 85, 247, 0.8), 
              rgba(59, 130, 246, 0.6), 
              rgba(236, 72, 153, 0.4), 
              rgba(34, 197, 94, 0.3),
              rgba(168, 85, 247, 0.8))
          `,
          transform: `rotate(${audioData.overall * 45}deg) scale(${1 + pulseIntensity * 0.1})`,
          transition: "all 0.3s ease-out",
        }}
      />

      {/* Дополнительный слой с мерцанием */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at ${50 + audioData.bassLevel * 20}% ${50 + audioData.midLevel * 20}%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)`,
          transform: `scale(${1 + audioData.trebleLevel * 0.2})`,
          transition: "all 0.2s ease-out",
        }}
      />

      <div className="relative z-10 p-8">
        <RadioHeader musicType={musicType} />

        <AudioVisualizer
          audioData={audioData}
          isPlaying={isPlaying}
          musicType={musicType}
          pulseIntensity={pulseIntensity}
        />

        {/* Центральная кнопка воспроизведения */}
        <div className="flex items-center justify-center mb-8">
          <AnimatedWaves
            audioData={audioData}
            isPlaying={isPlaying}
            musicType={musicType}
            pulseIntensity={pulseIntensity}
          />

          <PlayButton isPlaying={isPlaying} onToggle={togglePlay} />
        </div>

        <VolumeControl volume={volume} onVolumeChange={setVolume} />

        <RadioStats
          listeners={listeners}
          likes={likes}
          dislikes={dislikes}
          userLiked={userLiked}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      </div>

      <FireworksEffect fireworks={fireworks} heartEmojis={heartEmojis} />
    </div>
  );
};

export default RadioPlayer;
