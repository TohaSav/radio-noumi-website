import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

interface OnlineUsersProps {
  count: number;
  users?: Array<{ id: string; name: string; avatar: string }>;
  showList?: boolean;
}

const OnlineUsers = ({ count, users = [], showList }: OnlineUsersProps) => {
  // Динамически изменяющийся счетчик
  const [displayCount, setDisplayCount] = useState(count);

  useEffect(() => {
    // Более реалистичные вариации в отображаемом количестве
    const baseVariation = Math.floor(Math.random() * 8) - 3; // от -3 до +4
    const timeVariation = Math.sin(Date.now() / 60000) * 5; // плавные колебания
    const newCount = Math.max(
      count + baseVariation + Math.floor(timeVariation),
      count - 2,
    );
    setDisplayCount(newCount);

    // Обновляем счетчик каждые 10-15 секунд для живости
    const interval = setInterval(
      () => {
        const variation = Math.floor(Math.random() * 6) - 2; // -2 до +3
        const dynamicCount = Math.max(
          count + variation,
          Math.floor(count * 0.9),
        );
        setDisplayCount(dynamicCount);
      },
      10000 + Math.random() * 5000,
    );

    return () => clearInterval(interval);
  }, [count]);

  const demoUsers = [
    {
      name: "Алекс",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Мария",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Дмитрий",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Анна",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Михаил",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
  ];

  if (!showList) {
    return (
      <div className="flex items-center gap-2 text-white">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">{displayCount} в сети</span>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-2 text-white mb-4">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">{displayCount} в сети</span>
        </div>

        <div className="space-y-3">
          {users.slice(0, 12).map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 hover:bg-white/5 rounded-lg p-2 transition-colors cursor-pointer"
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-white text-sm font-medium">
                {user.name}
              </span>
            </div>
          ))}

          {displayCount > 12 && (
            <div className="text-center py-4">
              <span className="text-gray-400 text-xs">
                и ещё {displayCount - 12} участников...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineUsers;
