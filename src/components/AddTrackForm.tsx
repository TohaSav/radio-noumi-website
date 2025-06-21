import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Track } from "@/types/track";

interface AddTrackFormProps {
  onAddTrack: (track: Omit<Track, "id" | "plays" | "addedAt">) => void;
}

const AddTrackForm = ({ onAddTrack }: AddTrackFormProps) => {
  const [newTrack, setNewTrack] = useState({
    title: "",
    cover: "",
    audioFile: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrack.title || !newTrack.cover) return;

    onAddTrack(newTrack);
    setNewTrack({ title: "", cover: "", audioFile: "" });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "cover" | "audioFile",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewTrack({
          ...newTrack,
          [field]: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Добавить трек</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-white">
            Название трека
          </Label>
          <Input
            id="title"
            value={newTrack.title}
            onChange={(e) =>
              setNewTrack({ ...newTrack, title: e.target.value })
            }
            placeholder="Название трека"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
        <div>
          <Label htmlFor="cover" className="text-white">
            Обложка
          </Label>
          <Input
            id="cover"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "cover")}
            className="bg-white/10 border-white/20 text-white file:bg-purple-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:mr-4 file:cursor-pointer hover:file:bg-purple-700"
          />
        </div>
        <div>
          <Label htmlFor="audioFile" className="text-white">
            Аудио файл
          </Label>
          <Input
            id="audioFile"
            type="file"
            accept="audio/*,.mp3,.wav,.m4a,.flac"
            onChange={(e) => handleFileChange(e, "audioFile")}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white file:bg-white/20 file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:mr-3 hover:bg-white/20"
          />
        </div>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить трек
        </Button>
      </form>
    </div>
  );
};

export default AddTrackForm;
