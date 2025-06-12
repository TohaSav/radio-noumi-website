import { useState, useRef, useEffect } from "react";
import { useAudioAnalysis } from "@/hooks/useAudioAnalysis";
import { AudioData, MusicType } from "@/types/radio";
import AnimatedWaves from "@/components/radio/AnimatedWaves";
import AudioVisualizer from "@/components/radio/AudioVisualizer";
import PlayButton from "@/components/radio/PlayButton";
import Icon from "@/components/ui/icon";

interface RadioPlayerProps {
  streamUrl: string;
  likes?: number;
  dislikes?: number;
  listeners?: number;
}

const RadioPlayer = ({
  streamUrl,
  likes = 0,
  dislikes = 0,
  listeners = 0,
}: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [audioData, setAudioData] = useState<AudioData>({
    bassLevel: 0,
    midLevel: 0,
    trebleLevel: 0,
    overall: 0,
  });
  const [musicType, setMusicType] = useState<MusicType>("normal");
  const [pulseIntensity, setPulseIntensity] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const { setupAudioAnalysis, analyzeAudio, stopAnalysis } = useAudioAnalysis();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const { bassLevel, midLevel, overall } = audioData;

    // Определение типа музыки на основе анализа
    if (bassLevel > 0.7 && midLevel > 0.6) {
      setMusicType("club");
    } else if (bassLevel > 0.6) {
      setMusicType("bass");
    } else if (overall < 0.3) {
      setMusicType("slow");
    } else {
      setMusicType("normal");
    }

    // Установка интенсивности пульса
    setPulseIntensity(overall);
  }, [audioData]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        stopAnalysis();
      } else {
        audioRef.current.play();
        setupAudioAnalysis(audioRef.current);
        analyzeAudio(setAudioData);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-br from-purple-900/95 via-violet-800/95 to-indigo-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl md:bottom-4 md:left-4 md:right-4 md:max-w-md md:mx-auto md:rounded-3xl md:border md:border-white/10 lg:max-w-lg">
      <audio ref={audioRef} src={streamUrl} />

      {/* Анимированные волны */}
      <AnimatedWaves
        audioData={audioData}
        isPlaying={isPlaying}
        musicType={musicType}
        pulseIntensity={pulseIntensity}
      />

      {/* Заголовок */}
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
          Radio Noumi
        </h2>
        <p className="text-white/80 text-sm">
          {isPlaying ? "В эфире" : "Готов к воспроизведению"}
        </p>
      </div>

      {/* Аудиовизуализатор */}
      <AudioVisualizer
        audioData={audioData}
        isPlaying={isPlaying}
        musicType={musicType}
        pulseIntensity={pulseIntensity}
      />

      {/* Кнопка воспроизведения */}
      <div className="flex items-center justify-center mb-8 relative z-10">
        <PlayButton isPlaying={isPlaying} onToggle={togglePlay} />
      </div>

      {/* Управление громкостью */}
      <div className="flex items-center space-x-4 mb-6 relative z-10">
        <Icon name="Volume2" className="w-5 h-5 text-white/70" />
        <div className="flex-1 relative">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div
            className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-400 to-violet-600 rounded-lg pointer-events-none"
            style={{ width: `${volume * 100}%` }}
          />
        </div>
        <span className="text-sm text-white/70 w-10 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>

      {/* Статистика */}
      <div className="flex justify-between items-center text-sm text-white/60 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Heart" className="w-4 h-4" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" className="w-4 h-4" />
            <span>{listeners}</span>
          </div>
        </div>
        <div className="text-xs opacity-70">
          {musicType === "club" && "🎵 Клубная"}
          {musicType === "bass" && "🎸 Басы"}
          {musicType === "slow" && "🎼 Медленная"}
          {musicType === "normal" && "🎶 Обычная"}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #a855f7, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #a855f7, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.6);
        }
      `}</style>
    </div>
  );
};

export default RadioPlayer;
