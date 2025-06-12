import { useState, useRef, useEffect } from "react";
import { useAudioAnalysis } from "@/hooks/useAudioAnalysis";
import { useFireworks } from "@/hooks/useFireworks";
import { AudioData, MusicType } from "@/types/radio";
import PlayButton from "@/components/radio/PlayButton";
import VolumeControl from "@/components/radio/VolumeControl";
import LiveStats from "@/components/radio/LiveStats";
import FireworksEffect from "@/components/radio/FireworksEffect";
import Balloons from "@/components/radio/Balloons";

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
  const [showEffects, setShowEffects] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const { setupAudioAnalysis, analyzeAudio, stopAnalysis } = useAudioAnalysis();
  const { fireworks, heartEmojis, createFirework, createHeartEmoji } =
    useFireworks();

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
  }, [audioData]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        stopAnalysis();
        setShowEffects(false);
      } else {
        audioRef.current.play();
        setupAudioAnalysis(audioRef.current);
        analyzeAudio(setAudioData);

        // Запускаем эффекты при нажатии Play
        setShowEffects(true);

        // Создаем фейерверки в разных местах экрана
        setTimeout(
          () =>
            createFirework(window.innerWidth * 0.2, window.innerHeight * 0.3),
          200,
        );
        setTimeout(
          () =>
            createFirework(window.innerWidth * 0.8, window.innerHeight * 0.4),
          400,
        );
        setTimeout(
          () =>
            createFirework(window.innerWidth * 0.5, window.innerHeight * 0.2),
          600,
        );
        setTimeout(
          () =>
            createFirework(window.innerWidth * 0.1, window.innerHeight * 0.6),
          800,
        );
        setTimeout(
          () =>
            createFirework(window.innerWidth * 0.9, window.innerHeight * 0.7),
          1000,
        );

        // Скрываем эффекты через 3 секунды
        setTimeout(() => setShowEffects(false), 3000);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex flex-col items-center py-8">
      <audio ref={audioRef} src={streamUrl} />

      {/* Кнопка воспроизведения */}
      <PlayButton isPlaying={isPlaying} onToggle={togglePlay} />

      {/* Регулятор громкости */}
      <VolumeControl volume={volume} onVolumeChange={setVolume} />

      {/* Живая статистика */}
      <LiveStats isPlaying={isPlaying} />

      {/* Эффекты */}
      <FireworksEffect fireworks={fireworks} heartEmojis={heartEmojis} />
      <Balloons show={showEffects} />
    </div>
  );
};

export default RadioPlayer;
