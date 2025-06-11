import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  likes: number;
  dislikes: number;
}

export const useRadioStats = (): RadioStats => {
  const [stats, setStats] = useState<RadioStats>({
    listeners: 1150000,
    likes: 58000,
    dislikes: 10,
  });

  useEffect(() => {
    // Обновление счетчика слушателей каждые 30 секунд
    const listenersInterval = setInterval(() => {
      setStats((prev) => {
        const currentHour = new Date().getHours();
        // Больше активности вечером/ночью (18-02)
        const isPeakTime = currentHour >= 18 || currentHour <= 2;
        const maxChange = isPeakTime ? 500 : 200;
        const change =
          Math.floor(Math.random() * maxChange) - Math.floor(maxChange / 3);

        return {
          ...prev,
          listeners: Math.max(1000000, prev.listeners + change),
        };
      });
    }, 30000);

    // Обновление лайков каждые 10 минут (+2)
    const likesInterval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        likes: prev.likes + 2,
      }));
    }, 600000);

    // Обновление дизлайков каждые 5 часов (+1)
    const dislikesInterval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        dislikes: prev.dislikes + 1,
      }));
    }, 18000000);

    return () => {
      clearInterval(listenersInterval);
      clearInterval(likesInterval);
      clearInterval(dislikesInterval);
    };
  }, []);

  return stats;
};
