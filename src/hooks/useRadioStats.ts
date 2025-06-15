import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  currentTrack: string;
  isOnline: boolean;
}

export const useRadioStats = (): RadioStats => {
  const [stats, setStats] = useState<RadioStats>({
    listeners: 1250000, // базовое значение
    currentTrack: "Сейчас играет...",
    isOnline: true,
  });

  useEffect(() => {
    // Симуляция изменения количества слушателей
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        listeners: prev.listeners + Math.floor(Math.random() * 1000) - 500,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};
