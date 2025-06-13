import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Profile } from "@/types/dating";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
}

export default function ProfileModal({
  isOpen,
  onClose,
  profile,
}: ProfileModalProps) {
  if (!profile) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle>Анкета</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img
            src={profile.photo}
            alt={profile.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div>
            <h3 className="text-lg font-bold">
              {profile.name}, {profile.age}
            </h3>
            <p className="text-sm text-gray-600">{profile.city}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Рост:</span> {profile.height}
            </div>
            <div>
              <span className="font-medium">Вес:</span> {profile.weight}
            </div>
          </div>
          <div>
            <span className="font-medium">Ищет:</span> {profile.lookingFor}
          </div>
          <div>
            <span className="font-medium">О себе:</span>
            <p className="text-sm mt-1">{profile.about}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
