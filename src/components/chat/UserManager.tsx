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
  ];

  const generateUniqueUser = (existingUsers: User[]): User => {
    const usedNames = new Set(existingUsers.map((u) => u.name));
    let userName = "";
    let attempts = 0;

    do {
      const baseName =
        russianNames[Math.floor(Math.random() * russianNames.length)];
      const suffix =
        Math.random() > 0.7 ? `_${Math.floor(Math.random() * 99) + 1}` : "";
      userName = baseName + suffix;
      attempts++;
    } while (usedNames.has(userName) && attempts < 100);

    if (attempts >= 100) {
      userName = `Пользователь${Date.now()}`;
    }

    // Проверяем уникальность среди всех зарегистрированных пользователей
    const isUnique = (name: string) =>
      !existingUsers.map((u) => u.name).includes(name);

    if (!isUnique(userName)) {
      userName = `${userName}_${Math.floor(Math.random() * 1000)}`;
    }

    return {
      id: `user_${Date.now()}_${Math.random()}`,
      name: userName,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=150&h=150&fit=crop&crop=face`,
      joinedAt: new Date(),
      lastActivity: new Date(),
      isActive: true,
    };
  };

  const loadUsers = () => {
    const stored = localStorage.getItem("chat-users");
    if (stored) {
      const parsedUsers = JSON.parse(stored).map((u: any) => ({
        ...u,
        joinedAt: new Date(u.joinedAt),
        lastActivity: new Date(u.lastActivity),
      }));
      setUsers(parsedUsers);
      return parsedUsers;
    }
    return [];
  };

  const saveUsers = (usersToSave: User[]) => {
    localStorage.setItem("chat-users", JSON.stringify(usersToSave));
  };

  useEffect(() => {
    const savedUsers = loadUsers();

    const adjustUserCount = () => {
      setUsers((currentUsers) => {
        let updatedUsers = [...currentUsers];
        const currentCount = updatedUsers.length;

        // Устанавливаем минимальное количество пользователей
        const minUsers = Math.max(targetUserCount, 45);

        if (currentCount < minUsers) {
          // Добавляем пользователей
          const usersToAdd = minUsers - currentCount;
          for (let i = 0; i < usersToAdd; i++) {
            const newUser = generateUniqueUser(updatedUsers);
            updatedUsers.push(newUser);
          }
        } else if (currentCount > minUsers && currentCount > targetUserCount) {
          // Удаляем только если превышен лимит
          updatedUsers = updatedUsers
            .sort((a, b) => a.lastActivity.getTime() - b.lastActivity.getTime())
            .slice(
              Math.max(0, currentCount - Math.max(minUsers, targetUserCount)),
            );
        }

        saveUsers(updatedUsers);
        onUsersUpdate(updatedUsers);
        return updatedUsers;
      });
    };

    adjustUserCount();
  }, [targetUserCount]);

  // Обновляем активность пользователей
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((currentUsers) => {
        const updatedUsers = currentUsers.map((user) => ({
          ...user,
          lastActivity: Math.random() > 0.8 ? new Date() : user.lastActivity,
          isActive: Date.now() - user.lastActivity.getTime() < 300000, // 5 минут
        }));

        saveUsers(updatedUsers);
        onUsersUpdate(updatedUsers);
        return updatedUsers;
      });
    }, 30000); // Каждые 30 секунд

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default UserManager;
