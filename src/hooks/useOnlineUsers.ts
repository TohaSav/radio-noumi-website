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
        name: "Виктор",
        avatar:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Ольга",
        avatar:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Сергей",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Елена",
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Павел",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Настя",
        avatar:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Кира",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Роман",
        avatar:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
      },
      {
        name: "Алиса",
        avatar:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
      },
    ];

    // Сразу добавляем 6-8 активных ботов
    const initialBotsCount = 6 + Math.floor(Math.random() * 3);
    const shuffledBots = [...botProfiles].sort(() => Math.random() - 0.5);

    const initialBots = shuffledBots
      .slice(0, initialBotsCount)
      .map((bot) => createUser(bot.name, bot.avatar));

    setActiveUsers(initialBots);
    saveToLocalStorage("activeUsers", initialBots);

    // Планируем добавление остальных ботов через короткие интервалы
    const remainingBots = shuffledBots.slice(initialBotsCount);
    remainingBots.forEach((bot, index) => {
      setTimeout(
        () => {
          const newBot = createUser(bot.name, bot.avatar);
          setActiveUsers((prev) => {
            const updated = [...prev, newBot];
            saveToLocalStorage("activeUsers", updated);
            return updated;
          });
        },
        (index + 1) * (3000 + Math.random() * 7000),
      ); // Каждые 3-10 секунд
    });
  };

  useEffect(() => {
    if (isLoggedIn && !botsInitialized) {
      // Добавляем пользователя
      const currentUser = createUser(userName, userAvatar);
      const saved = loadFromLocalStorage("activeUsers", []);

      const userExists = saved.some((user) => user.name === userName);
      if (!userExists) {
        const updatedUsers = [...saved, currentUser];
        setActiveUsers(updatedUsers);
        saveToLocalStorage("activeUsers", updatedUsers);
      } else {
        setActiveUsers(saved);
      }

      // Инициализируем ботов только один раз
      if (saved.length <= 1) {
        initializeBots();
      }
      setBotsInitialized(true);
    }
  }, [isLoggedIn, userName, userAvatar, botsInitialized]);

  // Периодическое добавление новых ботов для поддержания активности
  useEffect(() => {
    if (!isLoggedIn) return;

    const addRandomBots = setInterval(
      () => {
        // Если ботов меньше 15, добавляем новых
        if (activeUsers.length < 15 && Math.random() < 0.7) {
          const newBotNames = [
            "Игорь",
            "Светлана",
            "Андрей",
            "Юлия",
            "Денис",
            "Марина",
            "Олег",
            "Татьяна",
          ];
          const randomName =
            newBotNames[Math.floor(Math.random() * newBotNames.length)];
          const randomAvatar = `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=150&h=150&fit=crop&crop=face`;

          const newBot = createUser(randomName, randomAvatar);
          setActiveUsers((prev) => {
            const updated = [...prev, newBot];
            saveToLocalStorage("activeUsers", updated);
            return updated;
          });
        }
      },
      8000 + Math.random() * 12000,
    ); // Каждые 8-20 секунд

    return () => clearInterval(addRandomBots);
  }, [isLoggedIn, activeUsers.length]);

  const addUser = (user: OnlineUser) => {
    setActiveUsers((prev) => {
      const updatedUsers = [...prev, user];
      saveToLocalStorage("onlineUsers", updatedUsers);
      return updatedUsers;
    });
  };

  return {
    activeUsers,
    addUser,
  };
};
