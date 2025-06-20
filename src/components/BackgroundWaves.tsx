import { useEffect, useRef } from "react";

interface BackgroundWavesProps {
  isActive: boolean;
  audioData?: { bass: number; mid: number; treble: number; overall: number };
}

const BackgroundWaves = ({ isActive, audioData }: BackgroundWavesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let time = 0;
    const waves = [
      {
        color: "rgba(16, 185, 129, 0.4)", // яркий зеленый
        speed: 0.03,
        amplitude: 120,
        frequency: 0.005,
        audioReactive: "bass",
      },
      {
        color: "rgba(249, 115, 22, 0.35)", // яркий оранжевый
        speed: 0.025,
        amplitude: 90,
        frequency: 0.007,
        audioReactive: "mid",
      },
      {
        color: "rgba(236, 72, 153, 0.3)", // яркий розовый
        speed: 0.02,
        amplitude: 110,
        frequency: 0.004,
        audioReactive: "treble",
      },
      {
        color: "rgba(6, 182, 212, 0.25)", // яркий бирюзовый
        speed: 0.035,
        amplitude: 80,
        frequency: 0.006,
        audioReactive: "overall",
      },
      {
        color: "rgba(168, 85, 247, 0.2)", // фиолетовый для объема
        speed: 0.015,
        amplitude: 140,
        frequency: 0.003,
        audioReactive: "bass",
      },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isActive) {
        waves.forEach((wave) => {
          // Получаем аудио данные для реактивности
          let audioMultiplier = 1;
          if (audioData) {
            switch (wave.audioReactive) {
              case "bass":
                audioMultiplier = 1 + audioData.bass * 2;
                break;
              case "mid":
                audioMultiplier = 1 + audioData.mid * 1.5;
                break;
              case "treble":
                audioMultiplier = 1 + audioData.treble * 1.8;
                break;
              case "overall":
                audioMultiplier = 1 + audioData.overall * 1.2;
                break;
            }
          }

          ctx.beginPath();
          ctx.fillStyle = wave.color;

          // Создаем более сложную волну с несколькими гармониками
          for (let x = 0; x <= canvas.width; x += 1) {
            const baseY = canvas.height / 2;
            const wave1 =
              Math.sin(x * wave.frequency + time * wave.speed) *
              wave.amplitude *
              audioMultiplier;
            const wave2 =
              Math.sin(x * wave.frequency * 1.5 + time * wave.speed * 0.8) *
              (wave.amplitude * 0.6 * audioMultiplier);
            const wave3 =
              Math.sin(x * wave.frequency * 0.3 + time * wave.speed * 1.2) *
              (wave.amplitude * 0.3 * audioMultiplier);

            const y = baseY + wave1 + wave2 + wave3;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          // Заполняем до низа экрана для создания волнового эффекта
          ctx.lineTo(canvas.width, canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.closePath();
          ctx.fill();
        });
      }

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: "100%",
        height: "100%",
        mixBlendMode: "screen",
      }}
    />
  );
};

export default BackgroundWaves;
