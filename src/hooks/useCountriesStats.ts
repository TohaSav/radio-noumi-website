import { useState, useEffect } from "react";

interface Country {
  name: string;
  flag: string;
  percentage: number;
}

export const useCountriesStats = () => {
  const [countries, setCountries] = useState<Country[]>([
    { name: "Россия", flag: "🇷🇺", percentage: 45.2 },
    { name: "Украина", flag: "🇺🇦", percentage: 18.7 },
    { name: "Беларусь", flag: "🇧🇾", percentage: 12.3 },
    { name: "Казахстан", flag: "🇰🇿", percentage: 8.9 },
    { name: "Германия", flag: "🇩🇪", percentage: 4.5 },
    { name: "США", flag: "🇺🇸", percentage: 3.8 },
    { name: "Литва", flag: "🇱🇹", percentage: 2.1 },
    { name: "Латвия", flag: "🇱🇻", percentage: 1.9 },
    { name: "Эстония", flag: "🇪🇪", percentage: 1.2 },
    { name: "Молдова", flag: "🇲🇩", percentage: 1.4 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountries(prevCountries => 
        prevCountries.map(country => ({
          ...country,
          percentage: Math.max(0.1, Math.min(100, 
            country.percentage + (Math.random() - 0.5) * 2
          ))
        }))
      );
    }, 60000); // Обновление каждую минуту

    return () => clearInterval(interval);
  }, []);

  return { countries };
};