import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface LiveStatsProps {
  isPlaying: boolean;
}

const LiveStats = ({ isPlaying }: LiveStatsProps) => {
  const [listeners, setListeners] = useState(3158952);

  // Живой счетчик слушателей с реалистичными колебаниями
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(
      () => {
        setListeners((prev) => {
          // Время дня влияет на количество слушателей
          const hour = new Date().getHours();
          const isPeakTime = hour >= 18 && hour <= 23; // Вечернее время

          // Базовые границы
          const minListeners = 3158952;
          const maxListeners = 49872312;

          // Случайное изменение (-5000 до +15000)
          const baseChange = Math.floor(Math.random() * 20000) - 5000;

          // Бонус в пиковое время
          const peakBonus = isPeakTime ? Math.floor(Math.random() * 50000) : 0;

          const newValue = prev + baseChange + peakBonus;

          // Ограничиваем значения
          return Math.max(minListeners, Math.min(maxListeners, newValue));
        });
      },
      Math.random() * 8000 + 2000,
    ); // От 2 до 10 секунд

    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat("ru-RU").format(num);
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      {/* Слушатели */}
      <div className="flex items-center space-x-2 text-white">
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"
          }`}
        />
        <span className="text-lg font-medium">
          {formatNumber(listeners)} слушателей
        </span>
      </div>
    </div>
  );
};

export default LiveStats;
