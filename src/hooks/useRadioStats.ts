import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  currentTrack: string;
  isLive: boolean;
}

export const useRadioStats = (): RadioStats => {
  const [stats, setStats] = useState<RadioStats>({
    listeners: 1247,
    currentTrack: "Naturalize & Second Sun - 3am",
    isLive: true,
  });

  useEffect(() => {
    // Симуляция изменения количества слушателей
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        listeners: prev.listeners + Math.floor(Math.random() * 10) - 5,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};
