import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

interface Song {
  id: number;
  title: string;
  audioFile: File;
  audioUrl: string;
  cover: string;
  likes: number;
  dislikes: number;
  userReaction: "like" | "dislike" | null;
}

const TopChart = () => {
  const { isAdmin } = useAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});

  // Форма добавления
  const [songTitle, setSongTitle] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    }
  };

  const handleAddSong = () => {
    if (!songTitle.trim() || !audioFile || !coverFile) return;

    const audioUrl = URL.createObjectURL(audioFile);
    const newSong: Song = {
      id: Date.now(),
      title: songTitle.trim(),
      audioFile,
      audioUrl,
      cover: coverPreview,
      likes: 0,
      dislikes: 0,
      userReaction: null,
    };

    setSongs((prev) => [newSong, ...prev]);

    // Очищаем форму
    setSongTitle("");
    setAudioFile(null);
    setCoverFile(null);
    setCoverPreview("");
  };

  const togglePlay = (songId: number) => {
    const audio = audioRefs.current[songId];
    if (!audio) return;

    if (currentlyPlaying === songId) {
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      Object.values(audioRefs.current).forEach((a) => a.pause());
      audio.play();
      setCurrentlyPlaying(songId);
    }

    audio.onended = () => setCurrentlyPlaying(null);
  };

  const handleReaction = (songId: number, reaction: "like" | "dislike") => {
    setSongs((prev) =>
      prev.map((song) => {
        if (song.id !== songId) return song;

        const newSong = { ...song };

        // Убираем предыдущую реакцию
        if (song.userReaction === "like") newSong.likes--;
        if (song.userReaction === "dislike") newSong.dislikes--;

        // Добавляем новую реакцию (или убираем, если та же)
        if (song.userReaction === reaction) {
          newSong.userReaction = null;
        } else {
          newSong.userReaction = reaction;
          if (reaction === "like") newSong.likes++;
          if (reaction === "dislike") newSong.dislikes++;
        }

        return newSong;
      }),
    );
  };

  return <div>{/* Блок удален */}</div>;
};

export default TopChart;
