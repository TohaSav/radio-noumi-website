import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { User, Like } from "@/types/dating";

interface UserPanelProps {
  isLoggedIn: boolean;
  currentUser: User | null;
  likes: Like[];
  onShowRegister: () => void;
}

const UserPanel = ({
  isLoggedIn,
  currentUser,
  likes,
  onShowRegister,
}: UserPanelProps) => {
  const getMyLikes = () => {
    return likes.filter((like) => {
      return currentUser && like.likerName !== currentUser.login;
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Личный кабинет</h2>

      {!isLoggedIn ? (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Войдите для доступа к функциям
          </p>
          <Button onClick={onShowRegister} className="w-full">
            Регистрация
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-medium text-green-800">Добро пожаловать!</p>
            <p className="text-sm text-green-600">{currentUser?.login}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Уведомления о лайках</h3>
            <div className="space-y-2">
              {getMyLikes().map((like) => (
                <div key={like.id} className="p-2 bg-pink-50 rounded-lg">
                  <p className="text-sm">
                    <Icon
                      name="Heart"
                      size={14}
                      className="inline mr-1 text-pink-500"
                    />
                    {like.likerName} оценил вашу анкету
                  </p>
                  <span className="text-xs text-gray-500">
                    {like.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
              {getMyLikes().length === 0 && (
                <p className="text-sm text-gray-500">Пока нет новых лайков</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default UserPanel;
