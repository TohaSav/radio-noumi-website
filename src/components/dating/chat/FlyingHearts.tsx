import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

interface Heart {
  id: string;
  x: number;
  y: number;
}

interface FlyingHeartsProps {
  onCreateHearts: (callback: (element: HTMLElement) => void) => void;
}

export default function FlyingHearts({ onCreateHearts }: FlyingHeartsProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  const createHearts = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const newHearts = Array.from({ length: 6 }, (_, i) => ({
      id: `heart-${Date.now()}-${i}`,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }));

    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) =>
        prev.filter(
          (heart) => !newHearts.find((newHeart) => newHeart.id === heart.id),
        ),
      );
    }, 2000);
  };

  useEffect(() => {
    onCreateHearts(createHearts);
  }, [onCreateHearts]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {hearts.map((heart, index) => (
        <div
          key={heart.id}
          className="absolute animate-heart-float"
          style={{
            left: heart.x,
            top: heart.y,
            animationDelay: `${index * 100}ms`,
          }}
        >
          <Icon
            name="Heart"
            size={20}
            className="text-red-500"
            fill="currentColor"
          />
        </div>
      ))}
    </div>
  );
}
