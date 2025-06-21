import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Track } from "@/types/track";

interface EditTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: Track | null;
  onSave: (updatedTrack: Track) => void;
}

const EditTrackModal = ({
  isOpen,
  onClose,
  track,
  onSave,
}: EditTrackModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    cover: "",
    audioFile: "",
  });

  // Обновляем форму при изменении трека
  useEffect(() => {
    if (track) {
      setFormData({
        title: track.title || "",
        artist: track.artist || "",
        cover: track.cover || "",
        audioFile: track.audioFile || "",
      });
    }
  }, [track]);

  const handleFileChange = (
    field: "cover" | "audioFile",
    file: File | null,
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          [field]: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!track) return;

    const updatedTrack: Track = {
      ...track,
      title: formData.title,
      artist: formData.artist,
      cover: formData.cover,
      audioFile: formData.audioFile,
    };

    onSave(updatedTrack);
    onClose();
  };

  if (!track) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Редактировать трек</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="artist" className="text-white">
              Исполнитель
            </Label>
            <Input
              id="artist"
              value={formData.artist}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, artist: e.target.value }))
              }
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Название трека
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover" className="text-white">
              Обложка
            </Label>
            <Input
              id="cover"
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange("cover", e.target.files?.[0] || null)
              }
              className="bg-gray-800 border-gray-600 text-white"
            />
            {formData.cover && (
              <img
                src={formData.cover}
                alt="Обложка"
                className="w-16 h-16 rounded object-cover"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="audio" className="text-white">
              Аудио файл
            </Label>
            <Input
              id="audio"
              type="file"
              accept="audio/*"
              onChange={(e) =>
                handleFileChange("audioFile", e.target.files?.[0] || null)
              }
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 text-white"
          >
            Отмена
          </Button>
          <Button
            onClick={handleSave}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTrackModal;
