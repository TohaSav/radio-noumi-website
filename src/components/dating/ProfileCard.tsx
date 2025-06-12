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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
          <h3 className="font-semibold">
            {profile.name}, {profile.age}
          </h3>
          <p className="text-sm opacity-90">Ищет: {profile.lookingFor}</p>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <p>{profile.city}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(profile.id)}
            className="text-pink-500 hover:text-pink-600"
          >
            <Icon name="Heart" size={20} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
