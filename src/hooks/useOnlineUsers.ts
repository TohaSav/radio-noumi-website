import { useState, useEffect, useRef } from "react";
import { OnlineUser } from "@/types/chat";

export const useOnlineUsers = (
  isLoggedIn: boolean,
  userName: string,
  userAvatar: string,
) => {
  const [activeUsers, setActiveUsers] = useState<OnlineUser[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Добавляем текущего пользователя при входе
  useEffect(() => {
    if (isLoggedIn && userName && userAvatar) {
      const currentUser: OnlineUser = {
        id: `user_${Date.now()}`,
        name: userName,
        avatar: userAvatar,
        isActive: true,
        lastSeen: new Date(),
      };

      setActiveUsers((prev) => {
        const exists = prev.some((user) => user.name === userName);
        if (!exists) {
          return [...prev, currentUser];
        }
        return prev;
      });
    }
  }, [isLoggedIn, userName, userAvatar]);

  // Добавляем демо-пользователей
  useEffect(() => {
    const demoUsers: OnlineUser[] = [
      {
        id: "demo_1",
        name: "Алекс",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        isActive: true,
      },
      {
        id: "demo_2",
        name: "Мария",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        isActive: true,
      },
      {
        id: "demo_3",
        name: "Дмитрий",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        isActive: true,
      },
    ];

    // Очищаем предыдущий интервал
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Добавляем демо-пользователей постепенно
    intervalRef.current = setInterval(() => {
      if (Math.random() < 0.3) {
        const availableUsers = demoUsers.filter(
          (demo) => !activeUsers.some((active) => active.id === demo.id),
        );

        if (availableUsers.length > 0) {
          const randomUser =
            availableUsers[Math.floor(Math.random() * availableUsers.length)];
          setActiveUsers((prev) => [...prev, randomUser]);
        }
      }
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const addUser = (userData: { name: string; avatar: string }) => {
    const newUser: OnlineUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: userData.name,
      avatar: userData.avatar,
      isActive: true,
      lastSeen: new Date(),
    };

    setActiveUsers((prev) => {
      const exists = prev.some((user) => user.name === userData.name);
      if (!exists) {
        return [...prev, newUser];
      }
      return prev;
    });
  };

  return {
    activeUsers,
    addUser,
  };
};
