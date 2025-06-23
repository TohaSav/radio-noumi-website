import { useState, useEffect } from "react";
import { OnlineUser } from "@/types/chat";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  createUser,
} from "@/utils/chatHelpers";

export const useOnlineUsers = (
  isLoggedIn: boolean,
  userName: string,
  userAvatar: string,
) => {
  const [activeUsers, setActiveUsers] = useState<OnlineUser[]>([]);
  const [botsInitialized, setBotsInitialized] = useState(false);

  // Создание и регистрация ботов как настоящих пользователей
  const initializeBots = () => {
    const botProfiles = [
      {
        name: "Анна",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Максим",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "София",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Артём",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Екатерина",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Дмитрий",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Виктория",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Александр",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      },
    ];

    const saved = loadFromLocalStorage<OnlineUser[]>("chat-users") || [];
    let existingUsers = saved.map((u) => ({
      ...u,
      joinedAt: u.joinedAt ? new Date(u.joinedAt) : new Date(),
      lastActivity: u.lastActivity ? new Date(u.lastActivity) : new Date(),
    }));

    // Регистрируем ботов как настоящих пользователей
    botProfiles.forEach((bot) => {
      const exists = existingUsers.some((u) => u.name === bot.name);
      if (!exists) {
        const botUser = {
          id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: bot.name,
          avatar: bot.avatar,
          joinedAt: new Date(Date.now() - Math.random() * 86400000), // Случайное время вчера
          lastActivity: new Date(Date.now() - Math.random() * 3600000), // Активность в последний час
          isActive: true,
        };
        existingUsers.push(botUser);
      } else {
        // Обновляем статус активности для существующих ботов
        existingUsers = existingUsers.map((u) =>
          u.name === bot.name
            ? { ...u, isActive: true, lastActivity: new Date() }
            : u,
        );
      }
    });

    return existingUsers;
  };

  // Загрузка пользователей при изменении статуса логина
  useEffect(() => {
    const loadUsers = () => {
      let allUsers = initializeBots();

      if (isLoggedIn && userName && userAvatar) {
        const userExists = allUsers.some((u) => u.name === userName);
        if (!userExists) {
          const newUser = createUser(userName, userAvatar);
          allUsers = [...allUsers, newUser];
        }
      }

      setActiveUsers(allUsers);
      saveToLocalStorage("chat-users", allUsers);
      setBotsInitialized(true);
    };

    loadUsers();
  }, [isLoggedIn, userName, userAvatar]);

  const updateUsers = (updatedUsers: OnlineUser[]) => {
    // Убеждаемся, что текущий пользователь в списке
    if (isLoggedIn && userName) {
      const currentUserExists = updatedUsers.some((u) => u.name === userName);
      if (!currentUserExists) {
        const currentUser = createUser(userName, userAvatar);
        updatedUsers.unshift(currentUser);
      }
    }
    setActiveUsers(updatedUsers);
    saveToLocalStorage("chat-users", updatedUsers);
  };

  const addUser = (userData: { name: string; avatar: string }) => {
    const existing = loadFromLocalStorage<OnlineUser[]>("chat-users") || [];
    const userExists = existing.some((u) => u.name === userData.name);

    if (!userExists) {
      const newUser = createUser(userData.name, userData.avatar);
      const updated = [...existing, newUser];
      saveToLocalStorage("chat-users", updated);
      setActiveUsers(updated);
    }
  };

  const getBotUsers = () => {
    // Возвращаем всех пользователей кроме текущего для автогенерации
    return activeUsers.filter(
      (user) => user.name !== userName && user.isActive,
    );
  };

  return {
    activeUsers,
    updateUsers,
    addUser,
    setActiveUsers,
    getBotUsers,
  };
};
