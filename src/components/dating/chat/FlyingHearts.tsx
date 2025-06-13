import { useState, useEffect, useRef } from "react";

interface FlyingHeart {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  scale: number;
  opacity: number;
  life: number;
}

interface FlyingHeartsProps {
  onCreateHearts: (callback: () => void) => void;
}

const FlyingHearts = ({ onCreateHearts }: FlyingHeartsProps) => {
  const [flyingHearts, setFlyingHearts] = useState<FlyingHeart[]>([]);
  const animationRef = useRef<number>();

  const createHearts = (buttonElement: HTMLElement) => {
    const rect = buttonElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newHearts: FlyingHeart[] = [];
    const heartsCount = 8 + Math.floor(Math.random() * 5);

    for (let i = 0; i < heartsCount; i++) {
      const angle = (Math.PI * 2 * i) / heartsCount + Math.random() * 0.5;
      const speed = 2 + Math.random() * 4;

      newHearts.push({
        id: `heart_${Date.now()}_${i}`,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 2,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
        opacity: 1,
        life: 60 + Math.random() * 40,
      });
    }

    setFlyingHearts((prev) => [...prev, ...newHearts]);
  };

  useEffect(() => {
    onCreateHearts(createHearts);
  }, [onCreateHearts]);

  useEffect(() => {
    const animate = () => {
      setFlyingHearts((hearts) => {
        return hearts
          .map((heart) => ({
            ...heart,
            x: heart.x + heart.vx,
            y: heart.y + heart.vy,
            vy: heart.vy + 0.1,
            rotation: heart.rotation + 3,
            opacity: heart.opacity - 1 / heart.life,
            life: heart.life - 1,
          }))
          .filter((heart) => heart.life > 0 && heart.opacity > 0);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (flyingHearts.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [flyingHearts.length]);

  return (
    <>
      {flyingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 text-red-500"
          style={{
            left: heart.x,
            top: heart.y,
            transform: `translate(-50%, -50%) rotate(${heart.rotation}deg) scale(${heart.scale})`,
            opacity: heart.opacity,
            fontSize: "16px",
          }}
        >
          ❤️
        </div>
      ))}
    </>
  );
};

export default FlyingHearts;
