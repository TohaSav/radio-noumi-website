import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  likes: number;
  dislikes: number;
}

export const useRadioStats = (): RadioStats => {
  // Функция для получения начального количества слушателей в зависимости от времени суток
  const getInitialListenerCount = (): number => {
    const currentHour = new Date().getHours();
    const isEvening = currentHour >= 18 || currentHour <= 2;

    if (isEvening) {
      // Вечернее время: от 15,130,589 до 49,789,245
      return Math.floor(Math.random() * (49789245 - 15130589 + 1)) + 15130589;
    } else {
      // Утро/день: от 2,984,173 до 9,780,258
      return Math.floor(Math.random() * (9780258 - 2984173 + 1)) + 2984173;
    }
  };

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
      listeners: getInitialListenerCount(),
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
        const isEvening = currentHour >= 18 || currentHour <= 2;

        // Определяем диапазон для текущего времени суток
        const minListeners = isEvening ? 15130589 : 2984173;
        const maxListeners = isEvening ? 49789245 : 9780258;

        // Случайные колебания: 60% шанс роста, 40% шанс падения
        const shouldGrow = Math.random() > 0.4;

        // Размер изменения зависит от времени суток и текущего значения
        const currentRange = maxListeners - minListeners;
        const baseChange = Math.floor(currentRange * 0.01); // 1% от диапазона
        const randomChange =
          Math.floor(Math.random() * baseChange) + Math.floor(baseChange * 0.1);

        // Применяем рост или падение
        const change = shouldGrow
          ? randomChange
          : -Math.floor(randomChange * 0.7);

        // Ограничиваем значение в пределах диапазона для текущего времени
        const newListeners = Math.max(
          minListeners,
          Math.min(maxListeners, prev.listeners + change),
        );

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
