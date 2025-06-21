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

const TopChart = () => {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<Track[]>([]);
  const { currentlyPlaying, handlePlayPause } = useAudioPlayer();

  useEffect(() => {
    const loadTracks = async () => {
      try {
        if (import.meta.env.DEV) {
          const demoTracks = getDemoTracks();
          setTracks(demoTracks);
          return;
        }

        const cloudTracks = await tracksApi.getTracks();
        if (cloudTracks.length > 0) {
          setTracks(cloudTracks);
        } else {
          const demoTracks = getDemoTracks();
          setTracks(demoTracks);
        }
      } catch (error) {
        console.error("Error loading tracks:", error);
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
        />
      </div>
    </div>
  );
};

export default TopChart;
