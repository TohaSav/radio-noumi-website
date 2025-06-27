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
  { name: "Австрия", flag: "🇦🇹", percentage: 78, lastUpdated: Date.now() },
  {
    name: "Антигуа и Барбуда",
    flag: "🇦🇬",
    percentage: 3,
    lastUpdated: Date.now(),
  },
  { name: "Бангладеш", flag: "🇧🇩", percentage: 11, lastUpdated: Date.now() },
  { name: "Йемен", flag: "🇾🇪", percentage: 5, lastUpdated: Date.now() },
  { name: "Кипр", flag: "🇨🇾", percentage: 8, lastUpdated: Date.now() },
  { name: "ОАЭ", flag: "🇦🇪", percentage: 45, lastUpdated: Date.now() },
  { name: "Китай", flag: "🇨🇳", percentage: 9, lastUpdated: Date.now() },
  { name: "Япония", flag: "🇯🇵", percentage: 4, lastUpdated: Date.now() },
  { name: "Куба", flag: "🇨🇺", percentage: 7, lastUpdated: Date.now() },
  { name: "Лаос", flag: "🇱🇦", percentage: 1, lastUpdated: Date.now() },
  { name: "Люксембург", flag: "🇱🇺", percentage: 22, lastUpdated: Date.now() },
  { name: "Мальдивы", flag: "🇲🇻", percentage: 3, lastUpdated: Date.now() },
  { name: "Намибия", flag: "🇳🇦", percentage: 1, lastUpdated: Date.now() },
  { name: "Нигер", flag: "🇳🇪", percentage: 8, lastUpdated: Date.now() },
  { name: "Пакистан", flag: "🇵🇰", percentage: 47, lastUpdated: Date.now() },
  { name: "Турция", flag: "🇹🇷", percentage: 87, lastUpdated: Date.now() },
  { name: "Иран", flag: "🇮🇷", percentage: 5, lastUpdated: Date.now() },
  {
    name: "Соломоновы Острова",
    flag: "🇸🇧",
    percentage: 38,
    lastUpdated: Date.now(),
  },
  { name: "Тувалу", flag: "🇹🇻", percentage: 5, lastUpdated: Date.now() },
  { name: "Финляндия", flag: "🇫🇮", percentage: 22, lastUpdated: Date.now() },
  { name: "Эфиопия", flag: "🇪🇹", percentage: 57, lastUpdated: Date.now() },
  { name: "Южный Судан", flag: "🇸🇸", percentage: 2, lastUpdated: Date.now() },
  { name: "Чад", flag: "🇹🇩", percentage: 67, lastUpdated: Date.now() },
  { name: "Черногория", flag: "🇲🇪", percentage: 81, lastUpdated: Date.now() },
  { name: "ЦАР", flag: "🇨🇫", percentage: 11, lastUpdated: Date.now() },
  { name: "Тунис", flag: "🇹🇳", percentage: 20, lastUpdated: Date.now() },
  { name: "Того", flag: "🇹🇬", percentage: 5, lastUpdated: Date.now() },
  { name: "Танзания", flag: "🇹🇿", percentage: 4, lastUpdated: Date.now() },
  { name: "Таджикистан", flag: "🇹🇯", percentage: 9, lastUpdated: Date.now() },
  { name: "Суринам", flag: "🇸🇷", percentage: 79, lastUpdated: Date.now() },
  { name: "Сирия", flag: "🇸🇾", percentage: 56, lastUpdated: Date.now() },
  { name: "Сент-Люсия", flag: "🇱🇨", percentage: 3, lastUpdated: Date.now() },
  { name: "Сенегал", flag: "🇸🇳", percentage: 65, lastUpdated: Date.now() },
  { name: "Самоа", flag: "🇼🇸", percentage: 26, lastUpdated: Date.now() },
  { name: "Руанда", flag: "🇷🇼", percentage: 8, lastUpdated: Date.now() },
  { name: "Перу", flag: "🇵🇪", percentage: 9, lastUpdated: Date.now() },
  {
    name: "Папуа — Новая Гвинея",
    flag: "🇵🇬",
    percentage: 3,
    lastUpdated: Date.now(),
  },
  { name: "Оман", flag: "🇴🇲", percentage: 25, lastUpdated: Date.now() },
  {
    name: "Новая Зеландия",
    flag: "🇳🇿",
    percentage: 5,
    lastUpdated: Date.now(),
  },
  { name: "Нидерланды", flag: "🇳🇱", percentage: 21, lastUpdated: Date.now() },
  { name: "Непал", flag: "🇳🇵", percentage: 1, lastUpdated: Date.now() },
  { name: "Монако", flag: "🇲🇨", percentage: 4, lastUpdated: Date.now() },
  { name: "Мавритания", flag: "🇲🇷", percentage: 97, lastUpdated: Date.now() },
];

const STORAGE_KEY = "radio-countries-stats";
const UPDATE_INTERVAL = 1000; // 1 секунда

export const useCountriesStats = () => {
  const [countries, setCountries] = useState<CountryStats[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialCountries;
  });

  const updatePercentages = () => {
    setCountries((prev) => {
      const updated = prev.map((country) => {
        // Случайное изменение от -5% до +5%
        const change = Math.floor(Math.random() * 11) - 5; // -5 до +5
        const newPercentage = Math.max(
          0,
          Math.min(99, country.percentage + change),
        );

        return {
          ...country,
          percentage: newPercentage,
          lastUpdated: Date.now(),
        };
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const interval = setInterval(updatePercentages, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { countries };
};
