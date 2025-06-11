import { useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация проверки авторизации
    const checkAuth = () => {
      const savedUser = localStorage.getItem("radioUser");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Для демо - создаем админа по умолчанию
        const demoAdmin = {
          id: "admin1",
          username: "Админ Radio Noumi",
          isAdmin: true,
        };
        setUser(demoAdmin);
        localStorage.setItem("radioUser", JSON.stringify(demoAdmin));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("radioUser");
  };

  return {
    user,
    isAdmin: user?.isAdmin || false,
    isLoading,
    logout,
  };
};
