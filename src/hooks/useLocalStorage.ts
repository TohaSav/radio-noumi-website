import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Ошибка загрузки из localStorage (${key}):`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Сохраняем все пользовательские сообщения навсегда
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Ошибка сохранения в localStorage (${key}):`, error);
    }
  };

  // Добавляем метод для принудительной загрузки из localStorage
  const reloadFromStorage = () => {
    try {
      const item = window.localStorage.getItem(key);
      const loadedValue = item ? JSON.parse(item) : initialValue;
      setStoredValue(loadedValue);
      return loadedValue;
    } catch (error) {
      console.error(`Ошибка перезагрузки из localStorage (${key}):`, error);
      return storedValue;
    }
  };

  return [storedValue, setValue, reloadFromStorage] as const;
}
