import { useEffect, useRef, useState } from "react";

interface WaveVisualizerProps {
  audioElement?: HTMLAudioElement | null;
}

const WaveVisualizer = ({ audioElement }: WaveVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [audioData, setAudioData] = useState({
    bassLevel: 0,
    midLevel: 0,
    trebleLevel: 0,
    overall: 0,
  });

  // Настройка анализа аудио
  useEffect(() => {
    if (!audioElement) return;

    const setupAudio = () => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext ||
            window.webkitAudioContext)();
          const source =
            audioContextRef.current.createMediaElementSource(audioElement);
          analyserRef.current = audioContextRef.current.createAnalyser();

          analyserRef.current.fftSize = 512;
          const bufferLength = analyserRef.current.frequencyBinCount;
          dataArrayRef.current = new Uint8Array(bufferLength);

          source.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }
      } catch (error) {
        console.warn("Web Audio API не поддерживается:", error);
      }
    };

    audioElement.addEventListener("play", setupAudio);

    return () => {
      audioElement.removeEventListener("play", setupAudio);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [audioElement]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Настройка размера канваса
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;
    const bars = 64;
    const barWidth = canvas.offsetWidth / bars;
    let time = 0;

    const analyzeAudio = () => {
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        const bassEnd = Math.floor(dataArrayRef.current.length * 0.15);
        const midEnd = Math.floor(dataArrayRef.current.length * 0.5);

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
      }
    };

    const animate = () => {
      analyzeAudio();
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Определяем интенсивность на основе аудио данных
      const bassIntensity = audioData.bassLevel * 3;
      const midIntensity = audioData.midLevel * 2;
      const overallIntensity = audioData.overall;

      // Скорость анимации зависит от интенсивности
      const speedMultiplier = Math.max(
        0.5,
        overallIntensity * 4 + bassIntensity * 2,
      );

      for (let i = 0; i < bars; i++) {
        // Высота волны зависит от частотных данных
        let height = 20; // Базовая высота

        if (dataArrayRef.current && analyserRef.current) {
          const freqIndex = Math.floor(
            (i / bars) * dataArrayRef.current.length,
          );
          const freqValue = dataArrayRef.current[freqIndex] / 255;
          height = freqValue * 80 + 20;
        } else {
          // Фоллбэк анимация без аудио
          height = Math.sin(time + i * 0.3) * 30 + Math.random() * 20 + 20;
        }

        // Дополнительные эффекты для басов
        if (bassIntensity > 0.3) {
          height += Math.sin(time * 2 + i * 0.1) * bassIntensity * 40;
        }

        const x = i * barWidth;
        const y = canvas.offsetHeight - height;

        // Градиент зависит от интенсивности
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.offsetHeight);
        const alpha = Math.max(0.5, overallIntensity + bassIntensity * 0.6);

        gradient.addColorStop(0, `rgba(147, 51, 234, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(236, 72, 153, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(59, 130, 246, ${alpha * 0.6})`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, height);
      }

      time += 0.05 * speedMultiplier;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [audioData]);

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-32 bg-black/20 backdrop-blur-sm overflow-hidden z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default WaveVisualizer;