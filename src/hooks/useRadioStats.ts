import { useState, useEffect } from "react";

// Функция для получения уральского времени
const getUralTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const uralTime = new Date(utc + 5 * 3600000); // UTC+5
  return uralTime;
};

// Функция для расчета специального счетчика
const getSpecialViewsCount = () => {
  const uralTime = getUralTime();
  const hours = uralTime.getHours();
  const minutes = uralTime.getMinutes();

  // Проверяем, находимся ли в диапазоне 19:00 - 23:50
  if (hours >= 19 && hours <= 23) {
    if (hours === 23 && minutes > 50) {
      return null; // После 23:50 используем обычный счетчик
    }

    // Рассчитываем прогресс от 19:00 до 23:50 (290 минут)
    const startMinutes = 19 * 60; // 19:00 в минутах
    const endMinutes = 23 * 60 + 50; // 23:50 в минутах
    const currentMinutes = hours * 60 + minutes;

    const progress =
      (currentMinutes - startMinutes) / (endMinutes - startMinutes);
    const startValue = 4581269;
    const endValue = 24569120;

    return Math.floor(startValue + (endValue - startValue) * progress);
  }

  return null; // Используем обычный счетчик
};

export const useRadioStats = () => {
  const [listeners, setListeners] = useState(2985718);

  useEffect(() => {
    const updateListeners = () => {
      const specialCount = getSpecialViewsCount();

      if (specialCount !== null) {
        setListeners(specialCount);
      } else {
        // Обычная логика счетчика (с 00:00 до 19:00)
        setListeners((prev) => {
          const variation = Math.floor(Math.random() * 201) - 100;
          return Math.max(2800000, prev + variation);
        });
      }
    };

    updateListeners();
    const interval = setInterval(updateListeners, 3000);

    return () => clearInterval(interval);
  }, []);

  return { listeners, getSpecialViewsCount };
};
