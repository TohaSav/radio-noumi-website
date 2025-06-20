import { useEffect, useRef } from "react";

interface BackgroundWavesProps {
  isActive: boolean;
}

const BackgroundWaves = ({ isActive }: BackgroundWavesProps) => {
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
        color: "rgba(168, 85, 247, 0.15)",
        speed: 0.02,
        amplitude: 80,
        frequency: 0.004,
      },
      {
        color: "rgba(236, 72, 153, 0.12)",
        speed: 0.015,
        amplitude: 60,
        frequency: 0.005,
      },
      {
        color: "rgba(59, 130, 246, 0.1)",
        speed: 0.025,
        amplitude: 100,
        frequency: 0.003,
      },
      {
        color: "rgba(34, 197, 94, 0.08)",
        speed: 0.018,
        amplitude: 70,
        frequency: 0.006,
      },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isActive) {
        waves.forEach((wave, index) => {
          ctx.beginPath();
          ctx.fillStyle = wave.color;

          for (let x = 0; x <= canvas.width; x += 2) {
            const y =
              canvas.height / 2 +
              Math.sin(x * wave.frequency + time * wave.speed) *
                wave.amplitude +
              Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.5) *
                (wave.amplitude * 0.5);

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

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
        mixBlendMode: "overlay",
      }}
    />
  );
};

export default BackgroundWaves;
