import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { User, Like, Profile } from "@/types/dating";

interface UserPanelProps {
  isLoggedIn: boolean;
  currentUser: User | null;
  likes: Like[];
  profiles: Profile[];
  onRegisterClick: () => void;
}

const UserPanel = ({
  isLoggedIn,
  currentUser,
  likes,
  profiles,
  onRegisterClick,
}: UserPanelProps) => {
  const getMyLikes = () => {
    if (!currentUser) return [];

    const myProfile = profiles.find((p) => p.userId === currentUser.id);
    if (!myProfile) return [];

    return likes.filter((like) => like.toProfileId === myProfile.id);
  };

  const getLikerNames = () => {
    const myLikes = getMyLikes();
    return myLikes.map((like) => {
      const likerProfile = profiles.find((p) => p.userId === like.fromUserId);
      return likerProfile?.name || "Неизвестный";
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-pink-600 flex items-center gap-2">
          <Icon name="User" size={20} />
          Личный кабинет
        </h2>
      </div>

      <div className="flex-1 p-4">
        {!isLoggedIn ? (
          <div className="space-y-4">
            <div className="text-center p-6 bg-pink-50 rounded-lg">
              <Icon
                name="Heart"
                size={48}
                className="mx-auto text-pink-400 mb-3"
              />
              <p className="text-gray-600 text-sm mb-4">
                Войдите для доступа к функциям знакомств
              </p>
              <Button
                onClick={onRegisterClick}
                className="w-full bg-pink-500 hover:bg-pink-600"
              >
                Регистрация
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-pink-800">
                    {currentUser.login}
                  </p>
                  <p className="text-xs text-pink-600">{currentUser.email}</p>
                </div>
              </div>
            </Card>

            <div>
              <h3 className="font-medium mb-3 text-gray-800 flex items-center gap-2">
                <Icon name="Heart" size={16} className="text-red-500" />
                Вы нравитесь ({getLikerNames().length})
              </h3>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {getLikerNames().map((name, index) => (
                  <div
                    key={index}
                    className="p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <p className="text-sm font-medium text-red-800 flex items-center gap-2">
                      <Icon name="Heart" size={14} className="text-red-500" />
                      {name}
                    </p>
                  </div>
                ))}

                {getLikerNames().length === 0 && (
                  <div className="text-center py-6">
                    <Icon
                      name="HeartCrack"
                      size={32}
                      className="mx-auto text-gray-300 mb-2"
                    />
                    <p className="text-sm text-gray-500">
                      Пока никто не поставил лайк
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
