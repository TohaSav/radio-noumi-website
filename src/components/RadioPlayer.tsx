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
    <div className="flex justify-center py-8">
      <div className="relative">
        <audio ref={audioRef} src={streamUrl} />

        {/* Кнопка воспроизведения по центру */}
        <PlayButton isPlaying={isPlaying} onToggle={togglePlay} />
      </div>
    </div>
  );
};

export default RadioPlayer;
