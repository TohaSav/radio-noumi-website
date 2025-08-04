import { useState, useEffect } from "react";

interface Country {
  name: string;
  flag: string;
  percentage: number;
}

export const useCountriesStats = () => {
  const [countries, setCountries] = useState<Country[]>([
    { name: "Россия", flag: "🇷🇺", percentage: 52.8 },
    { name: "Украина", flag: "🇺🇦", percentage: 34.7 },
    { name: "Беларусь", flag: "🇧🇾", percentage: 14.7 },
    { name: "Казахстан", flag: "🇰🇿", percentage: 11.2 },
    { name: "Германия", flag: "🇩🇪", percentage: 28.5 },
    { name: "США", flag: "🇺🇸", percentage: 22.8 },
    { name: "Литва", flag: "🇱🇹", percentage: 5.8 },
    { name: "Латвия", flag: "🇱🇻", percentage: 18.4 },
    { name: "Эстония", flag: "🇪🇪", percentage: 3.2 },
    { name: "Молдова", flag: "🇲🇩", percentage: 15.9 },
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
          else if (country.name === "Украина") minPercentage = 30;
          else if (country.name === "Беларусь") minPercentage = 12;
          else if (country.name === "Казахстан") minPercentage = 9;
          else if (country.name === "Германия") minPercentage = 24;
          else if (country.name === "США") minPercentage = 18;
          else if (country.name === "Литва") minPercentage = 3;
          else if (country.name === "Латвия") minPercentage = 15;
          else if (country.name === "Эстония") minPercentage = 1.5;
          else if (country.name === "Молдова") minPercentage = 12;
          
          return {
            ...country,
            percentage: Math.max(minPercentage, Math.min(
              country.name === "Россия" ? 65 : 
              country.name === "Украина" ? 42 : 
              country.name === "Германия" ? 35 :
              country.name === "США" ? 28 :
              country.name === "Латвия" ? 23 :
              country.name === "Молдова" ? 20 :
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