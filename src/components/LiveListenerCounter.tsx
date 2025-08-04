import { useState, useEffect } from "react";

const LiveListenerCounter = () => {
  const getListenersUntilMidnight = () => {
    const now = new Date();
    // Уральское время (UTC+5)
    const uralTime = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    
    // Следующая полночь по уральскому времени
    const nextMidnight = new Date(uralTime);
    nextMidnight.setHours(24, 0, 0, 0);
    
    // Время до полуночи в миллисекундах
    const timeUntilMidnight = nextMidnight.getTime() - uralTime.getTime();
    const totalMillisecondsInDay = 24 * 60 * 60 * 1000;
    
    // Целевое значение к полуночи
    const targetValue = 385000000; // ~385M к полуночи 
    const startValue = 382860000; // Текущее значение 382.86M
    
    // Прогресс от начального к целевому значению
    const progress = 1 - (timeUntilMidnight / totalMillisecondsInDay);
    const currentValue = startValue + (targetValue - startValue) * progress;
    
    // Добавляем случайные колебания ±5%
    const variation = currentValue * 0.05;
    const randomOffset = (Math.random() - 0.5) * variation;
    
    return Math.floor(currentValue + randomOffset);
  };

  const [listeners, setListeners] = useState(getListenersUntilMidnight);

  useEffect(() => {
    const interval = setInterval(() => {
      setListeners(getListenersUntilMidnight());
    }, 5000); // Обновляем каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <span className="text-xl font-semibold">
      {formatNumber(listeners)} слушателей
    </span>
  );
};

export default LiveListenerCounter;