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
    <div className="w-80 bg-gradient-to-br from-white to-pink-50/50 border-l border-pink-200/50 flex flex-col shadow-lg backdrop-blur-sm">
      <div className="p-6 border-b border-pink-200/50 bg-gradient-to-r from-pink-50 to-purple-50">
        <h2 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 animate-fade-in">
          <Icon name="User" size={20} />
          Личный кабинет
        </h2>
      </div>

      <div className="flex-1 p-6">
        {!isLoggedIn ? (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center p-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-inner border border-pink-200/50">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Icon name="Heart" size={28} className="text-white" />
              </div>
              <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                Войдите для доступа к функциям знакомств
              </p>
              <Button
                onClick={onRegisterClick}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl py-3 rounded-xl"
              >
                <Icon name="Sparkles" size={18} className="mr-2" />
                Регистрация
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-to-br from-pink-100 to-purple-100 border-pink-300/50 shadow-lg rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <Icon name="User" size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-pink-800 text-lg">
                    {currentUser.login}
                  </p>
                  <p className="text-sm text-pink-600/80">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </Card>

            <div>
              <h3 className="font-bold mb-4 text-gray-800 flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={14} className="text-white" />
                </div>
                <span>Вы нравитесь ({getLikerNames().length})</span>
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {getLikerNames().map((name, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <p className="text-sm font-semibold text-red-800 flex items-center gap-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
                        <Icon name="Heart" size={12} className="text-white" />
                      </div>
                      {name}
                    </p>
                  </div>
                ))}

                {getLikerNames().length === 0 && (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 opacity-50">
                      <Icon
                        name="HeartCrack"
                        size={24}
                        className="text-gray-400"
                      />
                    </div>
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
