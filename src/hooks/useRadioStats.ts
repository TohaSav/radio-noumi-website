import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  isOnline: boolean;
}

export const useRadioStats = (): RadioStats => {
  const [stats, setStats] = useState<RadioStats>({
    listeners: 1247,
    isOnline: true,
  });

  useEffect(() => {
    // Симуляция изменения количества слушателей
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        listeners: Math.floor(Math.random() * 2000) + 800,
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};
