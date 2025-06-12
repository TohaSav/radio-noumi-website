import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  likes: number;
  dislikes: number;
}

export const useRadioStats = (): RadioStats => {
  // Функция для загрузки данных из localStorage
  const loadStatsFromStorage = (): RadioStats => {
    try {
      const saved = localStorage.getItem("radioStats");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn("Не удалось загрузить статистику из localStorage");
    }
    // Возвращаем начальные значения если нет сохраненных данных
    return {
      listeners: 2987250,
      likes: 58000,
      dislikes: 10,
    };
  };

  // Функция для сохранения данных в localStorage
  const saveStatsToStorage = (stats: RadioStats) => {
    try {
      localStorage.setItem("radioStats", JSON.stringify(stats));
    } catch (error) {
      console.warn("Не удалось сохранить статистику в localStorage");
    }
  };

  const [stats, setStats] = useState<RadioStats>(loadStatsFromStorage);

  useEffect(() => {
    // Обновление счетчика слушателей каждые 3 секунды для реалистичности
    const listenersInterval = setInterval(() => {
      setStats((prev) => {
        const currentHour = new Date().getHours();
        // Больше активности вечером/ночью (18-02)
        const isPeakTime = currentHour >= 18 || currentHour <= 2;

        // Случайные колебания: 70% шанс роста, 30% шанс падения
        const shouldGrow = Math.random() > 0.3;

        // Размер изменения зависит от времени суток
        const baseChange = isPeakTime ? 150 : 80;
        const randomChange = Math.floor(Math.random() * baseChange) + 10;

        // Применяем рост или падение
        const change = shouldGrow
          ? randomChange
          : -Math.floor(randomChange * 0.6);

        // Минимум 2,987,250 слушателей
        const newListeners = Math.max(2987250, prev.listeners + change);

        const newStats = {
          ...prev,
          listeners: newListeners,
        };

        // Сохраняем обновленную статистику
        saveStatsToStorage(newStats);

        return newStats;
      });
    }, 3000); // Обновление каждые 3 секунды

    // Обновление лайков каждые 10 минут (+2)
    const likesInterval = setInterval(() => {
      setStats((prev) => {
        const newStats = {
          ...prev,
          likes: prev.likes + 2,
        };
        saveStatsToStorage(newStats);
        return newStats;
      });
    }, 600000);

    // Обновление дизлайков каждые 5 часов (+1)
    const dislikesInterval = setInterval(() => {
      setStats((prev) => {
        const newStats = {
          ...prev,
          dislikes: prev.dislikes + 1,
        };
        saveStatsToStorage(newStats);
        return newStats;
      });
    }, 18000000);

    return () => {
      clearInterval(listenersInterval);
      clearInterval(likesInterval);
      clearInterval(dislikesInterval);
    };
  }, []);

  return stats;
};
