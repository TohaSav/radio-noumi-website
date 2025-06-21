import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { tracksApi } from "@/lib/tracksApi";
import { Track } from "@/types/track";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { getDemoTracks } from "@/data/demoTracks";
import TrackList from "@/components/TrackList";
import AddTrackForm from "@/components/AddTrackForm";
import EditTrackModal from "@/components/EditTrackModal";

const TopChart = () => {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const { currentlyPlaying, handlePlayPause } = useAudioPlayer();

  useEffect(() => {
    const loadTracks = async () => {
      try {
        // Сначала пытаемся загрузить облачные треки
        const cloudTracks = await tracksApi.getTracks();

        if (cloudTracks.length > 0) {
          // Если есть облачные треки, используем их
          setTracks(cloudTracks);
        } else {
          // Если облачных треков нет, загружаем демо-треки
          const demoTracks = getDemoTracks();
          setTracks(demoTracks);
        }
      } catch (error) {
        console.error("Error loading tracks:", error);
        // В случае ошибки загружаем демо-треки
        const demoTracks = getDemoTracks();
        setTracks(demoTracks);
      }
    };

    loadTracks();
  }, []);

  const saveTracks = async (updatedTracks: Track[]) => {
    try {
      await tracksApi.saveTracks(updatedTracks);
      setTracks(updatedTracks);
    } catch (error) {
      console.error("Error saving tracks:", error);
      // Fallback to localStorage
      localStorage.setItem("noumi-tracks", JSON.stringify(updatedTracks));
      setTracks(updatedTracks);
    }
  };

  const handleAddTrack = (
    newTrackData: Omit<Track, "id" | "plays" | "addedAt">,
  ) => {
    const track: Track = {
      id: Date.now().toString(),
      ...newTrackData,
      plays: Math.floor(Math.random() * 999 + 100) + "K",
      addedAt: Date.now(),
    };

    const updatedTracks = [track, ...tracks];
    saveTracks(updatedTracks);
  };

  const handleEditTrack = (track: Track) => {
    setEditingTrack(track);
  };

  const handleSaveTrack = (updatedTrack: Track) => {
    const updatedTracks = tracks.map((track) =>
      track.id === updatedTrack.id ? updatedTrack : track,
    );
    saveTracks(updatedTracks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8">
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

      {import.meta.env.DEV && <AddTrackForm onAddTrack={handleAddTrack} />}

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          🔥 Топ чарт
        </h1>

        <TrackList
          tracks={tracks}
          currentlyPlaying={currentlyPlaying}
          onPlayPause={handlePlayPause}
          onEdit={import.meta.env.DEV ? handleEditTrack : undefined}
        />
      </div>

      {import.meta.env.DEV && (
        <EditTrackModal
          isOpen={!!editingTrack}
          onClose={() => setEditingTrack(null)}
          track={editingTrack}
          onSave={handleSaveTrack}
        />
      )}
    </div>
  );
};

export default TopChart;
