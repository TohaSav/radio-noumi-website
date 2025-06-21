import { useEffect, useRef } from "react";

interface HiddenRadioProps {
  streamUrl: string;
}

const HiddenRadio = ({ streamUrl }: HiddenRadioProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Попытка автозапуска с обработкой ошибок
    const playAudio = async () => {
      try {
        audio.volume = 0.3; // Умеренная громкость
        await audio.play();
      } catch (error) {
        // Браузер заблокировал автовоспроизведение
        console.log("Автовоспроизведение заблокировано браузером");
      }
    };

    playAudio();

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [streamUrl]);

  return (
    <audio
      ref={audioRef}
      src={streamUrl}
      preload="auto"
      loop
      style={{ display: "none" }}
    />
  );
};

export default HiddenRadio;
