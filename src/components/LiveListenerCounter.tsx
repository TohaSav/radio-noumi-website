import { useState, useEffect } from "react";

const LiveListenerCounter = () => {
  const [listeners, setListeners] = useState(3150084);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getTimeBasedRange = () => {
    const now = new Date();
    // Уральское время (UTC+5)
    const uralTime = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    const hour = uralTime.getHours();

    if (hour >= 9 && hour < 15) {
      return { min: 3150129, max: 12458760 };
    } else if (hour >= 15 && hour < 21) {
      return { min: 4789236, max: 78960456 };
    } else if (hour >= 21 || hour < 3) {
      return { min: 7963509, max: 96350521 };
    } else {
      return { min: 5698750, max: 9321456 };
    }
  };

  useEffect(() => {
    const updateListeners = () => {
      const { min, max } = getTimeBasedRange();
      const currentRange = max - min;

      // Случайное изменение в пределах ±0.2% от текущего значения
      const changePercent = (Math.random() - 0.5) * 0.004;
      const change = Math.floor(listeners * changePercent);

      let newValue = listeners + change;

      // Держим значение в пределах диапазона времени
      newValue = Math.max(min, Math.min(max, newValue));

      setListeners(newValue);
    };

    // Обновляем каждые 2-4 секунды для реалистичности
    const interval = setInterval(
      () => {
        updateListeners();
      },
      Math.random() * 2000 + 2000,
    );

    // Проверяем смену временного диапазона каждую минуту
    const timeCheckInterval = setInterval(() => {
      const { min, max } = getTimeBasedRange();
      if (listeners < min || listeners > max) {
        const targetValue = min + Math.floor(Math.random() * (max - min));
        setListeners(targetValue);
      }
    }, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(timeCheckInterval);
    };
  }, [listeners]);

  return (
    <span className="text-xl font-semibold transition-all duration-500 ease-in-out">
      {formatNumber(listeners)} слушателей
    </span>
  );
};

export default LiveListenerCounter;
