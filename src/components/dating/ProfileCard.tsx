import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Profile } from "@/types/dating";

interface ProfileCardProps {
  profile: Profile;
  onLike: (profileId: string) => void;
}

const ProfileCard = ({ profile, onLike }: ProfileCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow mb-4">
      <div className="relative">
        <img
          src={
            profile.photo ||
            "https://images.unsplash.com/photo-1494790108755-2616b612b786"
          }
          alt={profile.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <h3 className="font-bold text-lg">
            {profile.name}, {profile.age}
          </h3>
          <p className="text-sm opacity-90">Ищет: {profile.lookingFor}</p>
          <p className="text-xs opacity-75">{profile.city}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(profile.id)}
            className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
          >
            <Icon name="Heart" size={24} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
