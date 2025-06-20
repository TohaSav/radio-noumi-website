import { useEffect, useRef } from "react";

const WaveVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation variables
    let animationId: number;
    const bars = 64;
    const barWidth = canvas.offsetWidth / bars;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (let i = 0; i < bars; i++) {
        const height = Math.sin(time + i * 0.3) * 50 + Math.random() * 30 + 20;
        const x = i * barWidth;
        const y = canvas.offsetHeight - height;

        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.offsetHeight);
        gradient.addColorStop(
          0,
          `rgba(168, 85, 247, ${0.8 + Math.sin(time + i) * 0.2})`,
        );
        gradient.addColorStop(
          1,
          `rgba(236, 72, 153, ${0.4 + Math.sin(time + i) * 0.2})`,
        );

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, height);
      }

      time += 0.1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

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
