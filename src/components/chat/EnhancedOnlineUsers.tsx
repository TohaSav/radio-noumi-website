import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
  lastActivity: Date;
  isActive: boolean;
  personality: "friendly" | "casual" | "energetic" | "thoughtful" | "funny";
  status: "online" | "away" | "busy" | "offline";
  mood: "happy" | "excited" | "calm" | "curious" | "creative";
}

interface EnhancedOnlineUsersProps {
  users: User[];
  showList?: boolean;
}

const EnhancedOnlineUsers = ({ users, showList }: EnhancedOnlineUsersProps) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());

  // Подсчитываем активных пользователей
  const activeUsers = users.filter(
    (user) => user.status === "online" || user.status === "away",
  );
  const onlineUsers = users.filter((user) => user.status === "online");

  useEffect(() => {
    // Плавное изменение счётчика
    const targetCount = activeUsers.length;
    const variation = Math.floor(Math.random() * 3) - 1;
    const finalCount = Math.max(targetCount + variation, targetCount);

    setDisplayCount(finalCount);
  }, [activeUsers.length]);

  // Имитируем пользователей, которые печатают
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (onlineUsers.length > 0 && Math.random() < 0.15) {
        const user =
          onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
        setTypingUsers((prev) => new Set([...prev, user.id]));

        // Перестают печатать через случайное время
        setTimeout(
          () => {
            setTypingUsers((prev) => {
              const newSet = new Set(prev);
              newSet.delete(user.id);
              return newSet;
            });
          },
          2000 + Math.random() * 4000,
        );
      }
    }, 5000);

    return () => clearInterval(typingInterval);
  }, [onlineUsers]);

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-400";
      case "away":
        return "bg-yellow-400";
      case "busy":
        return "bg-red-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: User["status"]) => {
    switch (status) {
      case "online":
        return "В сети";
      case "away":
        return "Отошёл";
      case "busy":
        return "Занят";
      default:
        return "Не в сети";
    }
  };

  const getMoodEmoji = (mood: User["mood"]) => {
    switch (mood) {
      case "happy":
        return "😊";
      case "excited":
        return "🔥";
      case "calm":
        return "😌";
      case "curious":
        return "🤔";
      case "creative":
        return "✨";
      default:
        return "";
    }
  };

  if (!showList) {
    return (
      <div className="flex items-center gap-2 text-white">
        <div className="relative">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          {typingUsers.size > 0 && (
            <div className="absolute -top-1 -right-1 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
          )}
        </div>
        <span className="text-sm font-medium">
          {displayCount} в сети
          {typingUsers.size > 0 && (
            <span className="text-xs text-blue-200 ml-2">
              {typingUsers.size} печатают...
            </span>
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-2 text-white mb-4">
          <div className="relative">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {typingUsers.size > 0 && (
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
            )}
          </div>
          <span className="text-sm font-medium">{displayCount} участников</span>
        </div>

        {typingUsers.size > 0 && (
          <div className="mb-4 p-2 bg-blue-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-blue-200 text-xs">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-300 rounded-full animate-bounce"></div>
                <div
                  className="w-1 h-1 bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-blue-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span>
                {typingUsers.size === 1
                  ? "Кто-то печатает"
                  : `${typingUsers.size} человек печатают`}
                ...
              </span>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {activeUsers.slice(0, 15).map((user) => {
            const isTyping = typingUsers.has(user.id);
            const timeAgo = Math.floor(
              (Date.now() - user.lastActivity.getTime()) / 60000,
            );

            return (
              <div
                key={user.id}
                className={`flex items-center gap-3 hover:bg-white/5 rounded-lg p-2 transition-all cursor-pointer ${
                  isTyping ? "bg-blue-500/10 border border-blue-500/20" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(user.status)} border-2 border-white rounded-full`}
                  >
                    {isTyping && (
                      <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-white text-sm font-medium truncate">
                      {user.name}
                    </span>
                    <span className="text-xs">{getMoodEmoji(user.mood)}</span>
                  </div>

                  <div className="text-xs text-gray-300">
                    {isTyping ? (
                      <span className="text-blue-300 animate-pulse">
                        печатает...
                      </span>
                    ) : (
                      <span>
                        {user.status === "online"
                          ? "В сети"
                          : timeAgo < 5
                            ? "Только что"
                            : `${timeAgo} мин назад`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {activeUsers.length > 15 && (
            <div className="text-center py-3">
              <span className="text-gray-400 text-xs">
                и ещё {activeUsers.length - 15} участников...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedOnlineUsers;
