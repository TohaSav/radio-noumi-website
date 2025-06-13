import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  likes: number;
  dislikes: number;
}

export const useRadioStats = (): RadioStats => {
  // Функция для получения начального количества слушателей в зависимости от времени суток
  const getInitialListenerCount = (): number => {
    // Случайное начальное значение в полном диапазоне
    return Math.floor(Math.random() * (79785211 - 2150000 + 1)) + 2150000;
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
        // Постоянный диапазон независимо от времени
        const minListeners = 2150000;
        const maxListeners = 79785211;

        // Более реалистичные колебания: 55% рост, 45% падение
        const shouldGrow = Math.random() > 0.45;

        // Размер изменения зависит от текущего значения (больше слушателей = больше колебания)
        const currentListeners = prev.listeners;
        const percentOfMax = currentListeners / maxListeners;

        // Базовое изменение: от 0.05% до 0.3% от текущего значения
        const baseChangePercent = 0.0005 + percentOfMax * 0.0025;
        const baseChange = Math.floor(currentListeners * baseChangePercent);

        // Добавляем случайность к изменению
        const randomMultiplier = 0.5 + Math.random();
        const change = Math.floor(baseChange * randomMultiplier);

        // Применяем рост или падение
        const finalChange = shouldGrow ? change : -Math.floor(change * 0.8);

        // Ограничиваем значение в пределах диапазона
        const newListeners = Math.max(
          minListeners,
          Math.min(maxListeners, currentListeners + finalChange),
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
