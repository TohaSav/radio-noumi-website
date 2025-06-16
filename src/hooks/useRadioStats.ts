import { useState, useEffect } from "react";

interface RadioStats {
  listeners: number;
  currentTrack: string;
  isOnline: boolean;
}

// Ключи для localStorage
const STORAGE_KEYS = {
  LISTENERS: "radio_listeners_count",
  LAST_UPDATE: "radio_last_update",
};

// Загрузить сохранённые данные из localStorage
const loadStoredStats = () => {
  const storedListeners = localStorage.getItem(STORAGE_KEYS.LISTENERS);
  const storedLastUpdate = localStorage.getItem(STORAGE_KEYS.LAST_UPDATE);

  if (storedListeners && storedLastUpdate) {
    const listeners = parseInt(storedListeners);
    const lastUpdate = parseInt(storedLastUpdate);
    const now = Date.now();

    // Если прошло меньше 2 минут, используем сохранённое значение
    if (now - lastUpdate < 2 * 60 * 1000) {
      return listeners;
    }
  }

  return null;
};

// Сохранить данные в localStorage
const saveStatsToStorage = (listeners: number) => {
  localStorage.setItem(STORAGE_KEYS.LISTENERS, listeners.toString());
  localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, Date.now().toString());
};

export const useRadioStats = (): RadioStats => {
  const [stats, setStats] = useState<RadioStats>(() => {
    const storedListeners = loadStoredStats();
    return {
      listeners: storedListeners || getListenersForCurrentTime(),
      currentTrack: "Сейчас играет...",
      isOnline: true,
    };
  });

  useEffect(() => {
    // Обновление каждые 15-45 секунд для реалистичности
    const updateStats = () => {
      const newListeners = getListenersForCurrentTime();
      setStats((prev) => ({
        ...prev,
        listeners: newListeners,
      }));
      // Сохраняем в localStorage при каждом обновлении
      saveStatsToStorage(newListeners);
    };

    const getRandomInterval = () => Math.random() * 30000 + 15000; // 15-45 сек

    let timeoutId: NodeJS.Timeout;
    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        updateStats();
        scheduleNext();
      }, getRandomInterval());
    };

    scheduleNext();
    return () => clearTimeout(timeoutId);
  }, []);

  return stats;
};

// Получить количество слушателей для текущего времени
const getListenersForCurrentTime = (): number => {
  const now = new Date();
  // Конвертируем в уральское время (UTC+5)
  const uralTime = new Date(now.getTime() + 5 * 60 * 60 * 1000);
  const hour = uralTime.getHours();
  const minute = uralTime.getMinutes();
  const totalMinutes = hour * 60 + minute;

  let baseListeners: number;
  let maxListeners: number;
  let timeProgress: number;

  if (hour >= 9 && hour < 15) {
    // 9:00-15:00: от 1,923,125 до 5,789,025
    baseListeners = 1923125;
    maxListeners = 5789025;
    timeProgress = (totalMinutes - 540) / 360; // 540 мин = 9:00, 360 мин = 6 часов
  } else if (hour >= 15 && hour < 19) {
    // 15:00-19:00: до 21,189,302
    baseListeners = 5789025;
    maxListeners = 21189302;
    timeProgress = (totalMinutes - 900) / 240; // 900 мин = 15:00, 240 мин = 4 часа
  } else if (hour >= 19 || hour < 1) {
    // 19:00-00:00: до 52,259,109
    const adjustedMinutes =
      hour >= 19 ? totalMinutes - 1140 : totalMinutes + 300; // 1140 мин = 19:00
    baseListeners = 21189302;
    maxListeners = 52259109;
    timeProgress = adjustedMinutes / 300; // 300 мин = 5 часов
  } else {
    // 00:00-09:00: до 4,896,327
    baseListeners = 4896327;
    maxListeners = 1923125;
    timeProgress = totalMinutes / 540; // 540 мин = 9 часов
  }

  // Реалистичные колебания как у настоящих людей
  const timeBasedListeners =
    baseListeners +
    (maxListeners - baseListeners) *
      (0.5 +
        0.3 * Math.sin(timeProgress * Math.PI * 2) +
        0.2 * Math.sin(timeProgress * Math.PI * 4));

  // Добавляем случайные флуктуации (±2-8%)
  const fluctuation = 1 + (Math.random() - 0.5) * 0.1;
  const finalListeners = Math.round(timeBasedListeners * fluctuation);

  return Math.max(finalListeners, 100000); // Минимум 100K
};

export const getSpecialViewsCount = (listeners: number): string => {
  if (listeners >= 1000000) {
    return `${(listeners / 1000000).toFixed(1)}M`;
  } else if (listeners >= 1000) {
    return `${Math.round(listeners / 1000)}K`;
  }
  return listeners.toString();
};
