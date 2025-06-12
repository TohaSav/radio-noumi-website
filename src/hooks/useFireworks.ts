import { useState, useCallback } from "react";
import { Firework, HeartEmoji, CryingEmoji } from "@/types/radio";

export const useFireworks = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [heartEmojis, setHeartEmojis] = useState<HeartEmoji[]>([]);
  const [cryingEmojis, setCryingEmojis] = useState<CryingEmoji[]>([]);

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

  const createCryingEmoji = (x: number, y: number) => {
    const newCryingEmoji: CryingEmoji = {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
    };

    setCryingEmojis((prev) => [...prev, newCryingEmoji]);

    setTimeout(() => {
      setCryingEmojis((prev) =>
        prev.filter((emoji) => emoji.id !== newCryingEmoji.id),
      );
    }, 3000);
  };

  return {
    fireworks,
    heartEmojis,
    cryingEmojis,
    createFirework,
    createHeartEmoji,
    createCryingEmoji,
  };
};
