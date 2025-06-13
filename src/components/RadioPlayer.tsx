import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import AudioVisualizer from "@/components/radio/AudioVisualizer";
import LiveStats from "@/components/radio/LiveStats";
import { useAudioAnalysis } from "@/hooks/useAudioAnalysis";
import { AudioData, MusicType } from "@/types/radio";

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioData, setAudioData] = useState<AudioData>({
    bassLevel: 0,
    midLevel: 0,
    trebleLevel: 0,
    overall: 0,
  });
  const [musicType, setMusicType] = useState<MusicType>("calm");
  const [pulseIntensity, setPulseIntensity] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const { setupAudioAnalysis, analyzeAudio, stopAnalysis } = useAudioAnalysis();

  // Определяем тип музыки по уровню басов
  useEffect(() => {
    const { bassLevel, overall } = audioData;

    if (bassLevel > 0.7 && overall > 0.6) {
      setMusicType("club");
      setPulseIntensity(Math.min(1, bassLevel * 1.5));
    } else if (bassLevel > 0.5) {
      setMusicType("bass");
      setPulseIntensity(Math.min(1, bassLevel * 1.2));
    } else {
      setMusicType("calm");
      setPulseIntensity(Math.min(0.6, overall * 0.8));
    }
  }, [audioData]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        stopAnalysis();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setupAudioAnalysis(audioRef.current);
        analyzeAudio(setAudioData);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Ошибка воспроизведения:", error);
    }
  };

  return (
    <div className="text-center">
      <audio
        ref={audioRef}
        src="https://myradio24.org/61673"
        crossOrigin="anonymous"
        preload="none"
      />

      <div className="mb-6">
        <div className="w-32 h-32 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 relative overflow-hidden">
          {/* Пульсирующий фон */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-opacity duration-200 ${
              isPlaying ? "animate-pulse opacity-30" : "opacity-0"
            }`}
            style={{
              animationDuration:
                musicType === "club"
                  ? "0.8s"
                  : musicType === "bass"
                    ? "1.2s"
                    : "2s",
            }}
          />
          <Icon name="Radio" size={48} className="text-white relative z-10" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Сейчас играет</h2>
        <p className="text-white/80">Популярная музыка 24/7</p>
      </div>

      <AudioVisualizer
        audioData={audioData}
        isPlaying={isPlaying}
        musicType={musicType}
        pulseIntensity={pulseIntensity}
      />

      <button
        onClick={togglePlayPause}
        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-4 transition-all duration-200 hover:scale-105"
      >
        <Icon
          name={isPlaying ? "Pause" : "Play"}
          size={32}
          className="text-white ml-1"
        />
      </button>

      <LiveStats isPlaying={isPlaying} />
    </div>
  );
};

export default RadioPlayer;
