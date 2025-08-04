import { useState, useEffect } from "react";

interface Country {
  name: string;
  flag: string;
  percentage: number;
}

export const useCountriesStats = () => {
  const [countries, setCountries] = useState<Country[]>([
    { name: "Россия", flag: "🇷🇺", percentage: 52.8 },
    { name: "Украина", flag: "🇺🇦", percentage: 82.0 },
    { name: "Беларусь", flag: "🇧🇾", percentage: 14.7 },
    { name: "Казахстан", flag: "🇰🇿", percentage: 52.0 },
    { name: "Германия", flag: "🇩🇪", percentage: 28.5 },
    { name: "США", flag: "🇺🇸", percentage: 22.8 },
    { name: "Литва", flag: "🇱🇹", percentage: 65.0 },
    { name: "Латвия", flag: "🇱🇻", percentage: 18.4 },
    { name: "Эстония", flag: "🇪🇪", percentage: 29.0 },
    { name: "Молдова", flag: "🇲🇩", percentage: 49.0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountries(prevCountries => 
        prevCountries.map(country => {
          // Реалистичные колебания как в живой статистике
          const changeAmount = (Math.random() - 0.5) * 0.8;
          const newPercentage = country.percentage + changeAmount;
          
          // Устанавливаем диапазоны для реалистичных колебаний
          let minPercentage = 0.5;
          if (country.name === "Россия") minPercentage = 48;
          else if (country.name === "Украина") minPercentage = 78;
          else if (country.name === "Беларусь") minPercentage = 12;
          else if (country.name === "Казахстан") minPercentage = 48;
          else if (country.name === "Германия") minPercentage = 24;
          else if (country.name === "США") minPercentage = 18;
          else if (country.name === "Литва") minPercentage = 60;
          else if (country.name === "Латвия") minPercentage = 15;
          else if (country.name === "Эстония") minPercentage = 25;
          else if (country.name === "Молдова") minPercentage = 45;
          
          return {
            ...country,
            percentage: Math.max(minPercentage, Math.min(
              country.name === "Россия" ? 65 : 
              country.name === "Украина" ? 86 : 
              country.name === "Германия" ? 35 :
              country.name === "США" ? 28 :
              country.name === "Казахстан" ? 56 :
              country.name === "Литва" ? 69 :
              country.name === "Эстония" ? 33 :
              country.name === "Молдова" ? 53 :
              country.name === "Латвия" ? 23 :
              country.name === "Беларусь" ? 20 : 15, 
              newPercentage
            ))
          };
        })
      );
    }, 6000); // Обновление каждые 6 секунд для реалистичности

    return () => clearInterval(interval);
  }, []);

  return { countries };
};