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

  return <></>;
};

export default AddTrackForm;
