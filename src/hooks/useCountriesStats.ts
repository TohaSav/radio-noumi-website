import { useState, useEffect } from "react";

export interface CountryStats {
  name: string;
  flag: string;
  percentage: number;
  lastUpdated: number;
}

const initialCountries: CountryStats[] = [
  { name: "США", flag: "🇺🇸", percentage: 34, lastUpdated: Date.now() },
  { name: "Россия", flag: "🇷🇺", percentage: 10, lastUpdated: Date.now() },
  {
    name: "Великобритания",
    flag: "🇬🇧",
    percentage: 18,
    lastUpdated: Date.now(),
  },
  { name: "Украина", flag: "🇺🇦", percentage: 89, lastUpdated: Date.now() },
  { name: "Германия", flag: "🇩🇪", percentage: 58, lastUpdated: Date.now() },
  { name: "Индия", flag: "🇮🇳", percentage: 39, lastUpdated: Date.now() },
  { name: "Африка", flag: "🌍", percentage: 10, lastUpdated: Date.now() },
  { name: "Камбоджа", flag: "🇰🇭", percentage: 47, lastUpdated: Date.now() },
  { name: "Лос-Анджелес", flag: "🇺🇸", percentage: 67, lastUpdated: Date.now() },
];

const STORAGE_KEY = "radio-countries-stats";
const UPDATE_INTERVAL = 3 * 60 * 60 * 1000; // 3 часа

export const useCountriesStats = () => {
  const [countries, setCountries] = useState<CountryStats[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialCountries;
  });

  const updatePercentages = () => {
    setCountries((prev) => {
      const updated = prev.map((country) => ({
        ...country,
        percentage: Math.min(
          99,
          country.percentage + Math.floor(Math.random() * 5) + 1,
        ),
        lastUpdated: Date.now(),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const checkForUpdates = () => {
      const now = Date.now();
      const shouldUpdate = countries.some(
        (country) => now - country.lastUpdated >= UPDATE_INTERVAL,
      );

      if (shouldUpdate) {
        updatePercentages();
      }
    };

    checkForUpdates();
    const interval = setInterval(checkForUpdates, 60000); // Проверяем каждую минуту

    return () => clearInterval(interval);
  }, [countries]);

  return { countries };
};
