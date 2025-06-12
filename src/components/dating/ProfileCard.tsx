import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Profile } from "@/types/dating";

interface ProfileCardProps {
  profile: Profile;
  onLike: (profileId: string) => void;
  currentUserId?: string;
}

const ProfileCard = ({ profile, onLike, currentUserId }: ProfileCardProps) => {
  const isOwnProfile = profile.userId === currentUserId;

  return (
    <Card className="overflow-hidden aspect-[3/4] md:aspect-[9/16] relative group hover:shadow-lg transition-shadow">
      <img
        src={
          profile.photo ||
          "https://images.unsplash.com/photo-1494790108755-2616b612b786"
        }
        alt={profile.name}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Индикатор пола */}
      <div className="absolute top-2 right-2">
        <div
          className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
            profile.gender === "male" ? "bg-blue-500" : "bg-pink-500"
          }`}
        >
          <Icon
            name={profile.gender === "male" ? "User" : "Heart"}
            size={12}
            className="md:w-4 md:h-4 text-white"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 text-white">
        <h3 className="font-bold text-sm md:text-lg mb-1">
          {profile.name}, {profile.age}
        </h3>
        <p className="text-xs md:text-sm opacity-90 mb-2 line-clamp-1">
          {profile.lookingFor}
        </p>

        {!isOwnProfile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(profile.id)}
            className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs md:text-sm p-1 md:p-2 h-auto"
          >
            <Icon name="Heart" size={12} className="md:w-4 md:h-4 mr-1" />
            <span className="hidden md:inline">Нравится</span>
            <span className="md:hidden">♥</span>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;
