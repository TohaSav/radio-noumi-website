import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  currentTrack: string;
  isOnline: boolean;
}

export const useRadioStats = (): RadioStats => {
  const [stats, setStats] = useState<RadioStats>({
    listeners: 2978218,
    currentTrack: "Hirschmilch Psytrance",
    isOnline: true,
  });

  useEffect(() => {
    // Реалистичное увеличение слушателей
    const interval = setInterval(
      () => {
        setStats((prev) => ({
          ...prev,
          listeners: prev.listeners + Math.floor(Math.random() * 12) + 1,
        }));
      },
      5000 + Math.random() * 10000,
    ); // Случайный интервал 5-15 сек

    return () => clearInterval(interval);
  }, []);

  return stats;
};
