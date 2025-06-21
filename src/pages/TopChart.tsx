import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface Track {
  id: string;
  title: string;
  cover: string;
  plays: string;
  addedAt: number;
  audioFile?: string;
}

const TopChart = () => {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [newTrack, setNewTrack] = useState({
    title: "",
    cover: "",
    audioFile: "",
  });
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null,
  );

  // Load tracks from localStorage on component mount
  useEffect(() => {
    const savedTracks = localStorage.getItem("noumi-tracks");
    if (savedTracks) {
      setTracks(JSON.parse(savedTracks));
    }
  }, []);

  // Save tracks to localStorage
  const saveTracks = (updatedTracks: Track[]) => {
    localStorage.setItem("noumi-tracks", JSON.stringify(updatedTracks));
    setTracks(updatedTracks);
  };

  // Add new track
  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrack.title || !newTrack.cover) return;

    const track: Track = {
      id: Date.now().toString(),
      title: newTrack.title,
      cover: newTrack.cover,
      audioFile: newTrack.audioFile,
      plays: Math.floor(Math.random() * 999 + 100) + "K",
      addedAt: Date.now(),
    };

    const updatedTracks = [track, ...tracks];
    saveTracks(updatedTracks);
    setNewTrack({ title: "", cover: "", audioFile: "" });
  };

  // Handle audio playback
  const handlePlayPause = (track: Track) => {
    if (!track.audioFile) return;

    if (currentlyPlaying === track.id) {
      // Pause current track
      audioElement?.pause();
      setCurrentlyPlaying(null);
    } else {
      // Stop previous track if playing
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }

      // Play new track
      const audio = new Audio(track.audioFile);
      audio.play().catch(console.error);
      audio.onended = () => setCurrentlyPlaying(null);
      setAudioElement(audio);
      setCurrentlyPlaying(track.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8">
      {/* Back Button */}
      <div className="mb-8">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад
        </Button>
      </div>

      {/* Admin Form - Hidden from users, visible only in editor */}
      {import.meta.env.DEV && (
        <div className="mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Добавить трек</h3>
          <form onSubmit={handleAddTrack} className="space-y-4">
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setNewTrack({
                        ...newTrack,
                        cover: event.target?.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setNewTrack({
                        ...newTrack,
                        audioFile: event.target?.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white file:bg-white/20 file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 file:mr-3 hover:bg-white/20"
              />
            </div>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить трек
            </Button>
          </form>
        </div>
      )}

      {/* Top Chart */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🔥 Топ чарт
        </h1>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          {tracks.length === 0 ? (
            <p className="text-white/70 text-center py-8">
              Треки пока не добавлены
            </p>
          ) : (
            <div className="space-y-4">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-white font-bold text-xl w-8">
                    #{index + 1}
                  </span>
                  <div className="relative group">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-16 h-16 rounded-lg object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=64&h=64&fit=crop";
                      }}
                    />
                    {track.audioFile && (
                      <button
                        onClick={() => handlePlayPause(track)}
                        className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Icon
                          name={
                            currentlyPlaying === track.id ? "Pause" : "Play"
                          }
                          size={24}
                          className="text-white"
                        />
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-lg">
                      {track.title}
                    </h3>
                    <p className="text-white/70 text-sm">Noumi Music</p>
                  </div>
                  <span className="text-white/60 text-sm">{track.plays}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopChart;
