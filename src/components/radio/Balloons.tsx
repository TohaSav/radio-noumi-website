import { useEffect, useState } from "react";

interface Balloon {
  id: number;
  x: number;
  color: string;
  delay: number;
}

interface BalloonsProps {
  show: boolean;
}

const Balloons = ({ show }: BalloonsProps) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    if (show) {
      const newBalloons: Balloon[] = [];
      const colors = [
        "#ff6b6b",
        "#4ecdc4",
        "#45b7d1",
        "#96ceb4",
        "#feca57",
        "#ff9ff3",
        "#54a0ff",
      ];

      for (let i = 0; i < 15; i++) {
        newBalloons.push({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
        });
      }
      setBalloons(newBalloons);

      // Убираем шары через 6 секунд
      const timeout = setTimeout(() => {
        setBalloons([]);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [show]);

  if (!show || balloons.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="absolute animate-balloon-float"
          style={{
            left: `${balloon.x}%`,
            top: "100%",
            animationDelay: `${balloon.delay}s`,
            animationDuration: "6s",
          }}
        >
          <div
            className="w-8 h-10 rounded-full relative shadow-lg"
            style={{ backgroundColor: balloon.color }}
          >
            {/* Нитка шарика */}
            <div className="absolute top-full left-1/2 w-px h-16 bg-gray-400 transform -translate-x-1/2" />
            {/* Блик на шарике */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-white/40 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Balloons;
