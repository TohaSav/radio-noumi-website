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

  // Загрузка пользователей при изменении статуса логина
  useEffect(() => {
    const loadUsers = () => {
      const saved = loadFromLocalStorage<OnlineUser[]>("chat-users");
      let existingUsers = saved || [];

      // Конвертируем даты
      existingUsers = existingUsers.map((u) => ({
        ...u,
        joinedAt: u.joinedAt ? new Date(u.joinedAt) : new Date(),
        lastActivity: u.lastActivity ? new Date(u.lastActivity) : new Date(),
      }));

      if (isLoggedIn && userName && userAvatar) {
        const userExists = existingUsers.some((u) => u.name === userName);
        if (!userExists) {
          const newUser = createUser(userName, userAvatar);
          existingUsers = [...existingUsers, newUser];
          saveToLocalStorage("chat-users", existingUsers);
        }
      }

      setActiveUsers(existingUsers);
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

  return {
    activeUsers,
    updateUsers,
    addUser,
    setActiveUsers,
  };
};
