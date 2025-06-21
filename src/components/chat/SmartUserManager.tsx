import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
  joinedAt: Date;
  lastActivity: Date;
  isActive: boolean;
  personality: "friendly" | "casual" | "energetic" | "thoughtful" | "funny";
  interests: string[];
  mood: "happy" | "excited" | "calm" | "curious" | "creative";
  activityPattern: "morning" | "afternoon" | "evening" | "night" | "random";
  status: "online" | "away" | "busy" | "offline";
}

interface SmartUserManagerProps {
  targetUserCount: number;
  onUsersUpdate: (users: User[]) => void;
  onUserJoined?: (user: User) => void;
  onUserLeft?: (user: User) => void;
}

const SmartUserManager = ({
  targetUserCount,
  onUsersUpdate,
  onUserJoined,
  onUserLeft,
}: SmartUserManagerProps) => {
  const [users, setUsers] = useState<User[]>([]);

  // Расширенная база имён с характеристиками
  const userProfiles = [
    {
      name: "Александр",
      personality: "casual",
      interests: ["work", "social"],
      mood: "calm",
    },
    {
      name: "Анна",
      personality: "friendly",
      interests: ["hobbies", "mood"],
      mood: "happy",
    },
    {
      name: "Дмитрий",
      personality: "thoughtful",
      interests: ["work", "weather"],
      mood: "curious",
    },
    {
      name: "Екатерина",
      personality: "energetic",
      interests: ["food", "social"],
      mood: "excited",
    },
    {
      name: "Максим",
      personality: "funny",
      interests: ["hobbies", "mood"],
      mood: "happy",
    },
    {
      name: "Мария",
      personality: "friendly",
      interests: ["food", "social"],
      mood: "creative",
    },
    {
      name: "Сергей",
      personality: "casual",
      interests: ["work", "hobbies"],
      mood: "calm",
    },
    {
      name: "Елена",
      personality: "thoughtful",
      interests: ["weather", "mood"],
      mood: "curious",
    },
    {
      name: "Андрей",
      personality: "energetic",
      interests: ["social", "hobbies"],
      mood: "excited",
    },
    {
      name: "Ольга",
      personality: "friendly",
      interests: ["food", "work"],
      mood: "happy",
    },
    {
      name: "Артём",
      personality: "funny",
      interests: ["mood", "social"],
      mood: "creative",
    },
    {
      name: "Татьяна",
      personality: "casual",
      interests: ["hobbies", "weather"],
      mood: "calm",
    },
    {
      name: "Михаил",
      personality: "thoughtful",
      interests: ["work", "food"],
      mood: "curious",
    },
    {
      name: "Наталья",
      personality: "energetic",
      interests: ["social", "mood"],
      mood: "excited",
    },
    {
      name: "Иван",
      personality: "friendly",
      interests: ["hobbies", "work"],
      mood: "happy",
    },
    {
      name: "Светлана",
      personality: "funny",
      interests: ["food", "weather"],
      mood: "creative",
    },
    {
      name: "Никита",
      personality: "casual",
      interests: ["social", "hobbies"],
      mood: "calm",
    },
    {
      name: "Юлия",
      personality: "thoughtful",
      interests: ["mood", "work"],
      mood: "curious",
    },
    {
      name: "Роман",
      personality: "energetic",
      interests: ["food", "social"],
      mood: "excited",
    },
    {
      name: "Ирина",
      personality: "friendly",
      interests: ["weather", "hobbies"],
      mood: "happy",
    },
    {
      name: "Владимир_pro",
      personality: "casual",
      interests: ["work", "mood"],
      mood: "calm",
    },
    {
      name: "Виктория",
      personality: "energetic",
      interests: ["social", "food"],
      mood: "excited",
    },
    {
      name: "Денис_gamer",
      personality: "funny",
      interests: ["hobbies", "social"],
      mood: "creative",
    },
    {
      name: "Полина",
      personality: "friendly",
      interests: ["mood", "weather"],
      mood: "happy",
    },
    {
      name: "Павел_music",
      personality: "thoughtful",
      interests: ["hobbies", "work"],
      mood: "curious",
    },
    {
      name: "Кристина",
      personality: "energetic",
      interests: ["food", "social"],
      mood: "excited",
    },
    {
      name: "Егор_star",
      personality: "funny",
      interests: ["social", "mood"],
      mood: "creative",
    },
    {
      name: "Валерия",
      personality: "friendly",
      interests: ["weather", "hobbies"],
      mood: "happy",
    },
    {
      name: "Илья_cool",
      personality: "casual",
      interests: ["work", "food"],
      mood: "calm",
    },
    {
      name: "София",
      personality: "thoughtful",
      interests: ["mood", "social"],
      mood: "curious",
    },
  ];

  const generateRealisticUser = (existingUsers: User[]): User => {
    const usedNames = new Set(existingUsers.map((u) => u.name));
    let selectedProfile;
    let attempts = 0;

    // Находим свободный профиль
    do {
      selectedProfile =
        userProfiles[Math.floor(Math.random() * userProfiles.length)];
      attempts++;
    } while (usedNames.has(selectedProfile.name) && attempts < 100);

    // Если не нашли уникальное имя, добавляем суффикс
    let finalName = selectedProfile.name;
    if (attempts >= 100 || usedNames.has(finalName)) {
      const suffixes = ["_new", "_2024", "_online", "_active", "_here"];
      finalName = `${selectedProfile.name}${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
    }

    // Определяем паттерн активности
    const hour = new Date().getHours();
    let activityPattern: User["activityPattern"];
    if (hour >= 6 && hour < 12) activityPattern = "morning";
    else if (hour >= 12 && hour < 18) activityPattern = "afternoon";
    else if (hour >= 18 && hour < 23) activityPattern = "evening";
    else activityPattern = "night";

    // Генерируем уникальный аватар
    const avatarCategories = ["people", "portraits", "person"];
    const category =
      avatarCategories[Math.floor(Math.random() * avatarCategories.length)];
    const avatarId = 1600000000000 + Math.floor(Math.random() * 100000000);

    return {
      id: `smart_user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: finalName,
      avatar: `https://images.unsplash.com/photo-${avatarId}?w=150&h=150&fit=crop&crop=face&auto=format&t=${Date.now()}`,
      joinedAt: new Date(),
      lastActivity: new Date(),
      isActive: true,
      personality: selectedProfile.personality,
      interests: selectedProfile.interests,
      mood: selectedProfile.mood,
      activityPattern,
      status: "online",
    };
  };

  // Естественные паттерны входа/выхода
  const simulateNaturalFlow = () => {
    setUsers((currentUsers) => {
      let updatedUsers = [...currentUsers];
      const currentHour = new Date().getHours();

      // Определяем активность в зависимости от времени
      const isActiveTime =
        (currentHour >= 9 && currentHour <= 12) ||
        (currentHour >= 14 && currentHour <= 17) ||
        (currentHour >= 19 && currentHour <= 23);

      // Добавляем пользователей в активное время
      if (isActiveTime && updatedUsers.length < targetUserCount + 10) {
        if (Math.random() < 0.7) {
          // 70% шанс добавить пользователя
          const newUser = generateRealisticUser(updatedUsers);
          updatedUsers.push(newUser);
          onUserJoined?.(newUser);
        }
      }

      // Обновляем статусы пользователей
      updatedUsers = updatedUsers
        .map((user) => {
          const timeSinceJoin = Date.now() - user.joinedAt.getTime();
          const timeSinceActivity = Date.now() - user.lastActivity.getTime();

          // Естественная смена статусов
          let newStatus = user.status;
          if (timeSinceActivity > 300000) {
            // 5 минут
            newStatus = Math.random() < 0.3 ? "away" : "online";
          } else if (timeSinceActivity > 600000) {
            // 10 минут
            newStatus = Math.random() < 0.5 ? "offline" : "away";
          }

          // Некоторые пользователи уходят через время
          const shouldLeave = timeSinceJoin > 1800000 && Math.random() < 0.05; // После 30 минут, 5% шанс уйти

          if (shouldLeave && updatedUsers.length > targetUserCount) {
            onUserLeft?.(user);
            return null;
          }

          return {
            ...user,
            status: newStatus,
            isActive: newStatus === "online" || newStatus === "away",
            lastActivity:
              newStatus === "online" ? new Date() : user.lastActivity,
          };
        })
        .filter(Boolean) as User[];

      // Поддерживаем минимальное количество пользователей
      while (updatedUsers.length < Math.max(targetUserCount - 5, 45)) {
        const newUser = generateRealisticUser(updatedUsers);
        updatedUsers.push(newUser);
      }

      onUsersUpdate(updatedUsers);
      return updatedUsers;
    });
  };

  // Инициализация пользователей
  useEffect(() => {
    const initUsers = () => {
      const initialUsers: User[] = [];

      // Создаём начальный набор пользователей
      for (let i = 0; i < Math.max(targetUserCount, 50); i++) {
        const user = generateRealisticUser(initialUsers);
        // Делаем некоторых пользователей "старожилами"
        if (i < 20) {
          user.joinedAt = new Date(Date.now() - Math.random() * 3600000); // До часа назад
          user.lastActivity = new Date(Date.now() - Math.random() * 300000); // До 5 минут назад
        }
        initialUsers.push(user);
      }

      setUsers(initialUsers);
      onUsersUpdate(initialUsers);
    };

    initUsers();
  }, []);

  // Основной цикл естественного поведения
  useEffect(() => {
    const naturalFlowInterval = setInterval(simulateNaturalFlow, 15000); // Каждые 15 секунд
    return () => clearInterval(naturalFlowInterval);
  }, [targetUserCount]);

  // Периодическое обновление активности
  useEffect(() => {
    const activityInterval = setInterval(() => {
      setUsers((currentUsers) => {
        return currentUsers.map((user) => {
          // Случайные обновления активности
          if (Math.random() < 0.8) {
            return {
              ...user,
              lastActivity: new Date(),
              mood:
                Math.random() < 0.1 // 10% шанс сменить настроение
                  ? (
                      [
                        "happy",
                        "excited",
                        "calm",
                        "curious",
                        "creative",
                      ] as const
                    )[Math.floor(Math.random() * 5)]
                  : user.mood,
            };
          }
          return user;
        });
      });
    }, 30000); // Каждые 30 секунд

    return () => clearInterval(activityInterval);
  }, []);

  return null;
};

export default SmartUserManager;
