import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
  joinedAt: Date;
  lastActivity: Date;
  isActive: boolean;
}

interface UserManagerProps {
  targetUserCount: number;
  onUsersUpdate: (users: User[]) => void;
}

const UserManager = ({ targetUserCount, onUsersUpdate }: UserManagerProps) => {
  const [users, setUsers] = useState<User[]>([]);

  const russianNames = [
    "Алексей",
    "Анна",
    "Дмитрий",
    "Екатерина",
    "Максим",
    "Мария",
    "Сергей",
    "Елена",
    "Андрей",
    "Ольга",
    "Артём",
    "Татьяна",
    "Михаил",
    "Наталья",
    "Иван",
    "Светлана",
    "Никита",
    "Юлия",
    "Роман",
    "Ирина",
    "Владимир",
    "Виктория",
    "Денис",
    "Полина",
    "Павел",
    "Кристина",
    "Егор",
    "Валерия",
    "Илья",
    "София",
    "Кирилл",
    "Дарья",
    "Антон",
    "Алина",
    "Александр",
    "Милана",
    "Тимур",
    "Карина",
    "Матвей",
    "Диана",
    "Игорь",
    "Вероника",
    "Олег",
    "Алиса",
    "Артур",
    "Ангелина",
    "Константин",
    "Владислава",
    "Глеб",
    "Елизавета",
    "Евгений",
    "Арина",
    "Степан",
    "Варвара",
    "Богдан",
    "Василиса",
    "Лев",
    "Ева",
    "Фёдор",
    "Ксения",
    "Марк",
    "Стефания",
    "Руслан",
    "Маргарита",
    "Ярослав",
    "Злата",
    "Тихон",
    "Мелания",
    "Захар",
    "Камилла",
    "Савелий",
    "Эмилия",
    "Лука",
    "Амелия",
    "Демид",
    "Амина",
    "Мирон",
    "Агата",
    "Леонид",
    "Агния",
    "Арсений",
    "Алёна",
    "Семён",
    "Яна",
    "Макар",
    "Есения",
    "Вячеслав",
    "Лилия",
    "Родион",
    "Майя",
    "Тимофей",
    "Нина",
    "Георгий",
    "Лада",
    "Прохор",
    "Жанна",
    "Герман",
    "Зоя",
    "Виталий",
    "Регина",
    "Борис",
    "Инна",
    "Григорий",
    "Лариса",
    "Остап",
    "Римма",
    "Давид",
    "Нелли",
    "Назар",
    "Элина",
    "Ефим",
    "Жасмин",
  ];

  const nicknameSuffixes = [
    "_pro", "_gamer", "_star", "_music", "_cool", "_best", "_top", "_nice", "_fire", "_rock",
    "_soul", "_vibe", "_wave", "_flow", "_beat", "_king", "_queen", "_master", "_super", "_mega",
    "_ultra", "_prime", "_elite", "_gold", "_legend", "_boss", "_hero", "_ninja", "_wizard", "_ace",
    "_official", "_real", "_true", "_original", "_unique", "_special", "_exclusive", "_rare", "_epic", "_cosmic",
    "_digital", "_tech", "_modern", "_future", "_style", "_fresh", "_new", "_young", "_smart", "_creative"
  ];

  // Более частое добавление новых пользователей
  useEffect(() => {
    const addNewUsersInterval = setInterval(
      () => {
        setUsers((currentUsers) => {
          // Увеличен шанс добавления нового пользователя до 85%
          if (Math.random() < 0.85) {
            const newUser = generateUniqueUser(currentUsers);
            const updatedUsers = [...currentUsers, newUser];

            // Увеличено максимальное количество пользователей
            const maxUsers = Math.max(targetUserCount + 35, 120);
            const finalUsers = updatedUsers.slice(0, maxUsers);

            saveUsers(finalUsers);
            onUsersUpdate(finalUsers);
            return finalUsers;
          }
          return currentUsers;
        });
      },
      15000 + Math.random() * 20000,
    ); // Увеличена частота: 15-35 секунд
    "_gamer",
    "_star",
    "_music",
    "_cool",
    "_best",
    "_top",
    "_nice",
    "_fire",
    "_rock",
    "_soul",
    "_vibe",
    "_wave",
    "_flow",
    "_beat",
    "_king",
    "_queen",
    "_master",
    "_super",
    "_mega",
    "_ultra",
    "_prime",
    "_elite",
    "_gold",
  ];

  const generateUniqueUser = (existingUsers: User[]): User => {
    const usedNames = new Set(existingUsers.map((u) => u.name));
    let userName = "";
    let attempts = 0;

    do {
      const baseName =
        russianNames[Math.floor(Math.random() * russianNames.length)];

      // 40% шанс добавить суффикс, 30% - число, 30% - оставить как есть
      const rand = Math.random();
      if (rand < 0.4) {
        const suffix =
          nicknameSuffixes[Math.floor(Math.random() * nicknameSuffixes.length)];
        userName = baseName + suffix;
      } else if (rand < 0.7) {
        const num = Math.floor(Math.random() * 999) + 1;
        userName = baseName + num;
      } else {
        userName = baseName;
      }

      attempts++;
    } while (usedNames.has(userName) && attempts < 200);

    // Если не удалось создать уникальное имя, добавляем timestamp
    if (attempts >= 200 || usedNames.has(userName)) {
      userName = `${userName}_${Date.now().toString().slice(-4)}`;
    }

    // Генерируем уникальный аватар с timestamp
    const avatarId = 1500000000000 + Math.floor(Math.random() * 200000000);
    const avatarTimestamp = Date.now();

    return {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: userName,
      avatar: `https://images.unsplash.com/photo-${avatarId}?w=150&h=150&fit=crop&crop=face&t=${avatarTimestamp}`,
      joinedAt: new Date(),
      lastActivity: new Date(),
      isActive: true,
    };
  };

  const loadUsers = () => {
    const stored = localStorage.getItem("live-chat-users");
    if (stored) {
      try {
        const parsedUsers = JSON.parse(stored).map((u: any) => ({
          ...u,
          joinedAt: new Date(u.joinedAt),
          lastActivity: new Date(u.lastActivity),
        }));
        return parsedUsers;
      } catch (error) {
        console.error("Ошибка загрузки пользователей:", error);
        return [];
      }
    }
    return [];
  };

  const saveUsers = (usersToSave: User[]) => {
    localStorage.setItem("live-chat-users", JSON.stringify(usersToSave));
  };

  // Инициализация пользователей
  useEffect(() => {
    const savedUsers = loadUsers();

    const initializeUsers = () => {
      setUsers((currentUsers) => {
        let updatedUsers =
          savedUsers.length > 0 ? savedUsers : [...currentUsers];

        // Минимальное количество пользователей всегда 50+
        const minUsers = Math.max(targetUserCount, 52);
        const currentCount = updatedUsers.length;

        if (currentCount < minUsers) {
          // Добавляем недостающих пользователей
          const usersToAdd = minUsers - currentCount;
          for (let i = 0; i < usersToAdd; i++) {
            const newUser = generateUniqueUser(updatedUsers);
            updatedUsers.push(newUser);
          }
        }

        // Обновляем активность всех пользователей
        updatedUsers = updatedUsers.map((user) => ({
          ...user,
          isActive: true,
          lastActivity: new Date(Date.now() - Math.random() * 600000), // Активность в последние 10 минут
        }));

        saveUsers(updatedUsers);
        onUsersUpdate(updatedUsers);
        return updatedUsers;
      });
    };

    initializeUsers();
  }, [targetUserCount]);

  // Динамическое добавление новых пользователей
  useEffect(() => {
    const addNewUsersInterval = setInterval(
      () => {
        setUsers((currentUsers) => {
          // Шанс 70% добавить нового пользователя каждые 30-60 секунд
          if (Math.random() < 0.7) {
            const newUser = generateUniqueUser(currentUsers);
            const updatedUsers = [...currentUsers, newUser];

            // Ограничиваем максимальное количество пользователей
            const maxUsers = Math.max(targetUserCount + 20, 80);
            const finalUsers = updatedUsers.slice(0, maxUsers);

            saveUsers(finalUsers);
            onUsersUpdate(finalUsers);
            return finalUsers;
          }
          return currentUsers;
        });
      },
      30000 + Math.random() * 30000,
    ); // 30-60 секунд

    return () => clearInterval(addNewUsersInterval);
  }, [targetUserCount]);

  // Обновление активности пользователей
  useEffect(() => {
    const activityInterval = setInterval(
      () => {
        setUsers((currentUsers) => {
          const updatedUsers = currentUsers.map((user) => {
            // 90% пользователей остаются активными
            const staysActive = Math.random() < 0.9;

            return {
              ...user,
              lastActivity: staysActive ? new Date() : user.lastActivity,
              isActive:
                staysActive ||
                Date.now() - user.lastActivity.getTime() < 900000, // 15 минут
            };
          });

          // Убеждаемся что минимум пользователей всегда активен
          const activeCount = updatedUsers.filter((u) => u.isActive).length;
          const minActive = Math.max(targetUserCount - 5, 45);

          if (activeCount < minActive) {
            // Активируем случайных неактивных пользователей
            const inactiveUsers = updatedUsers.filter((u) => !u.isActive);
            const toActivate = Math.min(
              inactiveUsers.length,
              minActive - activeCount,
            );

            for (let i = 0; i < toActivate; i++) {
              const userIndex = updatedUsers.findIndex(
                (u) => u.id === inactiveUsers[i].id,
              );
              if (userIndex !== -1) {
                updatedUsers[userIndex].isActive = true;
                updatedUsers[userIndex].lastActivity = new Date();
              }
            }
          }

          saveUsers(updatedUsers);
          onUsersUpdate(updatedUsers);
          return updatedUsers;
        });
      },
      20000 + Math.random() * 10000,
    ); // 20-30 секунд

    return () => clearInterval(activityInterval);
  }, [targetUserCount]);

  return null;
};

export default UserManager;
