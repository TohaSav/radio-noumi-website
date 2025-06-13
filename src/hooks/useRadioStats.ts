import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  songs: number;
}

export const useRadioStats = () => {
  const [stats, setStats] = useState<RadioStats | null>(null);

  useEffect(() => {
    // Имитация статистики радио
    setStats({
      listeners: Math.floor(Math.random() * 1000) + 500,
      songs: Math.floor(Math.random() * 5000) + 10000,
    });
  }, []);

  return stats;
};
