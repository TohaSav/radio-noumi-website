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
    <Card className="overflow-hidden bg-white shadow-sm border mb-4">
      <div className="relative">
        <img
          src={
            profile.photo ||
            "https://images.unsplash.com/photo-1494790108755-2616b612b786"
          }
          alt={profile.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
          <h3 className="font-semibold text-lg">
            {profile.name}, {profile.age}
          </h3>
          <p className="text-sm opacity-90">Ищет: {profile.lookingFor}</p>
        </div>
      </div>

      {!isOwnProfile && (
        <div className="p-3 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(profile.id)}
            className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
          >
            <Icon name="Heart" size={20} className="mr-1" />
            Нравится
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProfileCard;
