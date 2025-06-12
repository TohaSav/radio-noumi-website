import { useState, useCallback } from "react";
import { Firework, HeartEmoji } from "@/types/radio";

export const useFireworks = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [heartEmojis, setHeartEmojis] = useState<HeartEmoji[]>([]);

  const createFirework = useCallback((x: number, y: number) => {
    const newFirework: Firework = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    setFireworks((prev) => [...prev, newFirework]);

    setTimeout(() => {
      setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
    }, 1500);
  }, []);

  const createHeartEmoji = useCallback((x: number, y: number) => {
    const newHeart: HeartEmoji = {
      id: Date.now() + Math.random(),
      x,
      y,
    };
    setHeartEmojis((prev) => [...prev, newHeart]);

    setTimeout(() => {
      setHeartEmojis((prev) =>
        prev.filter((heart) => heart.id !== newHeart.id),
      );
    }, 2000);
  }, []);

  return {
    fireworks,
    heartEmojis,
    createFirework,
    createHeartEmoji,
  };
};
