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
  genderFilter: "all" | "male" | "female";
  onGenderFilterChange: (filter: "all" | "male" | "female") => void;
}

const UserPanel = ({
  isLoggedIn,
  currentUser,
  likes,
  profiles,
  onRegisterClick,
  genderFilter,
  onGenderFilterChange,
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
    <div className="w-full md:w-80 bg-white/90 md:border-l border-gray-200 flex flex-col min-h-0">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Личный кабинет</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {!isLoggedIn ? (
          <div className="space-y-4">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Icon
                name="Heart"
                size={32}
                className="mx-auto mb-3 text-pink-500"
              />
              <p className="text-gray-600 mb-4">
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
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold">{currentUser.login}</p>
                  <p className="text-sm text-gray-600">{currentUser.email}</p>
                </div>
              </div>
            </Card>

            <div>
              <h3 className="font-semibold mb-3">
                Вы нравитесь ({getLikerNames().length})
              </h3>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {getLikerNames().map((name, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg">
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
                      className="mx-auto mb-2 text-gray-400"
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
