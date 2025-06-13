import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfileForm from "./ProfileForm";

interface CreateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: any;
  onFormChange: (form: any) => void;
  onSubmit: () => void;
}

export default function CreateProfileModal({
  isOpen,
  onClose,
  form,
  onFormChange,
  onSubmit,
}: CreateProfileModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle>Создать анкету</DialogTitle>
        </DialogHeader>
        <ProfileForm form={form} onChange={onFormChange} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
