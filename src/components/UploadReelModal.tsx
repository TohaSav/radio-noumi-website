import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Reel } from "@/pages/Reels";

interface UploadReelModalProps {
  onClose: () => void;
  onUpload?: (reel: Reel) => void;
}

export default function UploadReelModal({
  onClose,
  onUpload,
}: UploadReelModalProps) {
  const [form, setForm] = useState({
    videoUrl: "",
    description: "",
    username: "",
  });

  const handleSubmit = () => {
    if (form.videoUrl && form.description && form.username && onUpload) {
      const newReel: Reel = {
        id: Date.now().toString(),
        videoUrl: form.videoUrl,
        description: form.description,
        username: form.username,
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616c96c9c4c?w=100",
        likes: 0,
        comments: 0,
        timestamp: new Date(),
        isLiked: false,
      };

      onUpload(newReel);
      onClose();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Загрузить Reel</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Имя пользователя</label>
            <Input
              placeholder="Ваше имя"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">URL изображения</label>
            <Input
              placeholder="https://images.unsplash.com/..."
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Описание</label>
            <Textarea
              placeholder="Опишите ваш Reel..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Отмена
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={!form.videoUrl || !form.description || !form.username}
            >
              Загрузить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
