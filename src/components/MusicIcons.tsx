import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface MusicIcon {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
}

interface MusicIconsProps {
  isPlaying: boolean;
  triggerPosition: { x: number; y: number };
}

const MusicIcons = ({ isPlaying, triggerPosition }: MusicIconsProps) => {
  const [icons, setIcons] = useState<MusicIcon[]>([]);

  const colors = [
    "text-pink-500",
    "text-blue-500",
    "text-green-500",
    "text-purple-500",
    "text-yellow-500",
    "text-red-500",
  ];

  useEffect(() => {
    if (isPlaying) {
      const newIcons: MusicIcon[] = [];

      // Создаем 8 иконок с разными задержками
      for (let i = 0; i < 8; i++) {
        newIcons.push({
          id: Date.now() + i,
          x: triggerPosition.x + (Math.random() - 0.5) * 60,
          y: triggerPosition.y,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: i * 150,
        });
      }

      setIcons(newIcons);

      // Очищаем иконки через 3 секунды
      setTimeout(() => {
        setIcons([]);
      }, 3000);
    }
  }, [isPlaying, triggerPosition.x, triggerPosition.y]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className={`absolute ${icon.color} animate-fade-in`}
          style={{
            left: icon.x,
            top: icon.y,
            animationDelay: `${icon.delay}ms`,
            animationDuration: "2.5s",
            animationFillMode: "forwards",
          }}
        >
          <div className="animate-[slide-up_2.5s_ease-out_forwards] opacity-100">
            <Icon name="Music" size={20} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MusicIcons;
