import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  currentTrack: string;
  isOnline: boolean;
}

export const useRadioStats = (): RadioStats => {
  const [stats, setStats] = useState<RadioStats>({
    listeners: 0,
    currentTrack: "Загрузка...",
    isOnline: false,
  });

  useEffect(() => {
    // Имитация загрузки статистики
    const timer = setTimeout(() => {
      setStats({
        listeners: Math.floor(Math.random() * 100) + 50,
        currentTrack: "Сейчас играет музыка",
        isOnline: true,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return stats;
};
