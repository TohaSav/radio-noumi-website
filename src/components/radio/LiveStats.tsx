import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface LiveStatsProps {
  isPlaying: boolean;
}

const LiveStats = ({ isPlaying }: LiveStatsProps) => {
  const [listeners, setListeners] = useState(2150580);
  const [likes, setLikes] = useState(67580);
  const [dislikes, setDislikes] = useState(115);

  // Живой счетчик слушателей
  useEffect(() => {
    const interval = setInterval(() => {
      setListeners((prev) => {
        const change = Math.floor(Math.random() * 20) - 10; // -10 до +10
        const newValue = prev + change;
        return Math.max(2000000, newValue); // минимум 2M
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Счетчик лайков - +3 каждые 3 минуты
  useEffect(() => {
    const interval = setInterval(() => {
      setLikes((prev) => prev + 3);
    }, 180000); // 3 минуты

    return () => clearInterval(interval);
  }, []);

  // Счетчик дизлайков - +2 каждые 10 часов
  useEffect(() => {
    const interval = setInterval(() => {
      setDislikes((prev) => prev + 2);
    }, 36000000); // 10 часов

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ru-RU").format(num);
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-6">
      {/* Слушатели */}
      <div className="flex items-center space-x-2 text-gray-700">
        <div
          className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
        />
        <span className="text-lg font-medium">
          {formatNumber(listeners)} слушателей
        </span>
      </div>

      {/* Лайки и дизлайки */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Icon name="ThumbsUp" size={20} className="text-green-600" />
          <span className="text-green-600 font-medium">
            {formatNumber(likes)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="ThumbsDown" size={20} className="text-red-500" />
          <span className="text-red-500 font-medium">
            {formatNumber(dislikes)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveStats;
