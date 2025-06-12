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
    <Card className="group overflow-hidden bg-gradient-to-br from-white to-pink-50/50 shadow-lg hover:shadow-2xl border border-pink-200/50 mb-6 transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in">
      <div className="relative overflow-hidden">
        <img
          src={
            profile.photo ||
            "https://images.unsplash.com/photo-1494790108755-2616b612b786"
          }
          alt={profile.name}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-bold text-xl mb-1 animate-fade-in">
            {profile.name}, {profile.age}
          </h3>
          <div
            className="flex items-center gap-2 text-sm opacity-90 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Icon name="MapPin" size={14} className="text-pink-300" />
            <span>{profile.city}</span>
          </div>
          <p
            className="text-sm opacity-90 mt-1 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Icon
              name="Heart"
              size={14}
              className="inline text-pink-300 mr-1"
            />
            {profile.lookingFor}
          </p>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <Icon name="Eye" size={16} className="text-white" />
          </div>
        </div>
      </div>

      {!isOwnProfile && (
        <div className="p-4 text-center bg-gradient-to-r from-pink-50/50 to-purple-50/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(profile.id)}
            className="group/btn bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 px-6 py-2 rounded-full transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Icon
              name="Heart"
              size={18}
              className="mr-2 group-hover/btn:animate-pulse"
            />
            <span className="font-medium">Нравится</span>
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProfileCard;
