import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  isOnline: boolean;
}

const STORAGE_KEY = "radio_listeners_count";
const MIN_LISTENERS = 2_978_218;
const MAX_LISTENERS = 87_964_233;

export const useRadioStats = (): RadioStats => {
  const [stats, setStats] = useState<RadioStats>({
    listeners: MIN_LISTENERS,
    isOnline: true,
  });

  useEffect(() => {
    // Загружаем сохранённое значение или устанавливаем начальное
    const savedListeners = localStorage.getItem(STORAGE_KEY);
    const initialListeners = savedListeners
      ? Math.max(parseInt(savedListeners), MIN_LISTENERS)
      : MIN_LISTENERS;

    setStats((prev) => ({
      ...prev,
      listeners: Math.min(initialListeners, MAX_LISTENERS),
    }));

    // Медленное увеличение слушателей каждые 10-30 секунд
    const interval = setInterval(
      () => {
        setStats((prev) => {
          if (prev.listeners >= MAX_LISTENERS) return prev;

          // Случайное приращение от 1 до 15 слушателей
          const increment = Math.floor(Math.random() * 15) + 1;
          const newListeners = Math.min(
            prev.listeners + increment,
            MAX_LISTENERS,
          );

          // Сохраняем в localStorage
          localStorage.setItem(STORAGE_KEY, newListeners.toString());

          return {
            ...prev,
            listeners: newListeners,
          };
        });
      },
      Math.random() * 20000 + 10000,
    ); // 10-30 секунд

    return () => clearInterval(interval);
  }, []);

  return stats;
};
