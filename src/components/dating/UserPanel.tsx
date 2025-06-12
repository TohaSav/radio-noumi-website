import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { User, Like } from "@/types/dating";

interface UserPanelProps {
  isLoggedIn: boolean;
  currentUser: User | null;
  likes: Like[];
  onShowRegister: () => void;
  registerForm: {
    login: string;
    email: string;
    password: string;
  };
  onRegisterFormChange: (form: any) => void;
  onRegister: () => void;
  showRegisterForm: boolean;
  setShowRegisterForm: (show: boolean) => void;
}

const UserPanel = ({
  isLoggedIn,
  currentUser,
  likes,
  onShowRegister,
  registerForm,
  onRegisterFormChange,
  onRegister,
  showRegisterForm,
  setShowRegisterForm,
}: UserPanelProps) => {
  const getMyLikes = () => {
    return likes.filter((like) => {
      return currentUser && like.likerName !== currentUser.login;
    });
  };

  return (
    <Card className="p-6 h-[600px] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-pink-600">
        💕 Личный кабинет
      </h2>

      {!isLoggedIn ? (
        <div className="space-y-4">
          {!showRegisterForm ? (
            <>
              <p className="text-gray-600 text-sm">
                Войдите для доступа к функциям знакомств
              </p>
              <Button
                onClick={() => setShowRegisterForm(true)}
                className="w-full bg-pink-500 hover:bg-pink-600"
              >
                Регистрация
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Логин
                </label>
                <Input
                  value={registerForm.login}
                  onChange={(e) =>
                    onRegisterFormChange({
                      ...registerForm,
                      login: e.target.value,
                    })
                  }
                  placeholder="Ваш логин"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) =>
                    onRegisterFormChange({
                      ...registerForm,
                      email: e.target.value,
                    })
                  }
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Пароль
                </label>
                <Input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) =>
                    onRegisterFormChange({
                      ...registerForm,
                      password: e.target.value,
                    })
                  }
                  placeholder="Пароль"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={onRegister}
                  className="flex-1 bg-pink-500 hover:bg-pink-600"
                  disabled={
                    !registerForm.login ||
                    !registerForm.email ||
                    !registerForm.password
                  }
                >
                  Зарегистрироваться
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRegisterForm(false)}
                >
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-pink-50 rounded-lg border-2 border-pink-200">
            <p className="font-medium text-pink-800">💖 Добро пожаловать!</p>
            <p className="text-sm text-pink-600">{currentUser?.login}</p>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-gray-800">❤️ Вы нравитесь:</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {getMyLikes().map((like) => (
                <div
                  key={like.id}
                  className="p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <p className="text-sm font-medium text-red-800">
                    <Icon
                      name="Heart"
                      size={14}
                      className="inline mr-2 text-red-500"
                    />
                    {like.likerName}
                  </p>
                  <span className="text-xs text-red-600">
                    {like.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
              {getMyLikes().length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Пока никто не поставил лайк 💔
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UserPanel;
