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
    artist: "Noumi Music",
    cover: "",
    audioFile: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrack.title || !newTrack.cover) return;

    onAddTrack({
      title: newTrack.title,
      artist: newTrack.artist,
      cover: newTrack.cover,
      audioFile: newTrack.audioFile,
      likes: Math.floor(Math.random() * 50000 + 10000),
    });
    setNewTrack({ title: "", artist: "Noumi Music", cover: "", audioFile: "" });
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
    <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
      <h2 className="text-xl font-bold text-white mb-4">Добавить трек</h2>
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
            className="bg-white/10 border-white/30 text-white"
            placeholder="Введите название трека"
          />
        </div>

        <div>
          <Label htmlFor="artist" className="text-white">
            Исполнитель
          </Label>
          <Input
            id="artist"
            value={newTrack.artist}
            onChange={(e) =>
              setNewTrack({ ...newTrack, artist: e.target.value })
            }
            className="bg-white/10 border-white/30 text-white"
            placeholder="Введите имя исполнителя"
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
            className="bg-white/10 border-white/30 text-white"
          />
          {newTrack.cover && (
            <img
              src={newTrack.cover}
              alt="Обложка"
              className="mt-2 w-16 h-16 rounded object-cover"
            />
          )}
        </div>

        <div>
          <Label htmlFor="audio" className="text-white">
            Аудио файл
          </Label>
          <Input
            id="audio"
            type="file"
            accept="audio/*"
            onChange={(e) => handleFileChange(e, "audioFile")}
            className="bg-white/10 border-white/30 text-white"
          />
        </div>

        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white"
          disabled={!newTrack.title || !newTrack.cover}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить трек
        </Button>
      </form>
    </div>
  );
};

export default AddTrackForm;
