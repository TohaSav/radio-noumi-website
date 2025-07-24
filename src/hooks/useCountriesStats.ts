import { useState, useEffect } from "react";

interface Country {
  name: string;
  flag: string;
  percentage: number;
}

export const useCountriesStats = () => {
  const [countries, setCountries] = useState<Country[]>([
    { name: "Россия", flag: "🇷🇺", percentage: 52.8 },
    { name: "Украина", flag: "🇺🇦", percentage: 19.4 },
    { name: "Беларусь", flag: "🇧🇾", percentage: 14.7 },
    { name: "Казахстан", flag: "🇰🇿", percentage: 11.2 },
    { name: "Германия", flag: "🇩🇪", percentage: 8.9 },
    { name: "США", flag: "🇺🇸", percentage: 7.3 },
    { name: "Литва", flag: "🇱🇹", percentage: 5.8 },
    { name: "Латвия", flag: "🇱🇻", percentage: 4.9 },
    { name: "Эстония", flag: "🇪🇪", percentage: 3.2 },
    { name: "Молдова", flag: "🇲🇩", percentage: 2.7 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountries(prevCountries => 
        prevCountries.map(country => {
          // Более плавные и реалистичные изменения
          const changeAmount = (Math.random() - 0.5) * 1.5;
          const newPercentage = country.percentage + changeAmount;
          
          // Устанавливаем разные минимумы для разных стран
          let minPercentage = 0.5;
          if (country.name === "Россия") minPercentage = 48;
          else if (country.name === "Украина") minPercentage = 16;
          else if (country.name === "Беларусь") minPercentage = 12;
          else if (country.name === "Казахстан") minPercentage = 9;
          else if (country.name === "Германия") minPercentage = 6;
          else if (country.name === "США") minPercentage = 5;
          else if (country.name === "Литва") minPercentage = 3;
          else if (country.name === "Латвия") minPercentage = 2.5;
          else if (country.name === "Эстония") minPercentage = 1.5;
          else if (country.name === "Молдова") minPercentage = 1;
          
          return {
            ...country,
            percentage: Math.max(minPercentage, Math.min(
              country.name === "Россия" ? 65 : 
              country.name === "Украина" ? 25 : 
              country.name === "Беларусь" ? 20 : 15, 
              newPercentage
            ))
          };
        })
      );
    }, 8000); // Обновление каждые 8 секунд для более динамичности

    return () => clearInterval(interval);
  }, []);

  return { countries };
};