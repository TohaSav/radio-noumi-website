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

export const getSpecialViewsCount = (listeners: number): string => {
  if (listeners >= 1000000) {
    return `${(listeners / 1000000).toFixed(1)}M`;
  } else if (listeners >= 1000) {
    return `${(listeners / 1000).toFixed(0)}K`;
  }
  return listeners.toString();
};
