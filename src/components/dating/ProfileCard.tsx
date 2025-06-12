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
    <Card className="overflow-hidden aspect-[9/16] relative group hover:shadow-lg transition-shadow">
      <img
        src={
          profile.photo ||
          "https://images.unsplash.com/photo-1494790108755-2616b612b786"
        }
        alt={profile.name}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-bold text-lg mb-1">
          {profile.name}, {profile.age}
        </h3>
        <p className="text-sm opacity-90 mb-2">{profile.lookingFor}</p>

        {!isOwnProfile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(profile.id)}
            className="bg-white/20 hover:bg-white/30 text-white border-0"
          >
            <Icon name="Heart" size={16} className="mr-1" />
            Нравится
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;
