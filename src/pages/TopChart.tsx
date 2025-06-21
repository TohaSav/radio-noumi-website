import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { tracksApi } from "@/lib/tracksApi";

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

  useEffect(() => {
    const loadTracks = async () => {
      try {
        // В dev режиме всегда показываем демо-треки
        if (import.meta.env.DEV) {
          const demoTracks = getDemoTracks();
          setTracks(demoTracks);
          return;
        }

        // В продакшене пытаемся загрузить из облака
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

  // Демо-треки для продакшена
  const getDemoTracks = (): Track[] => [
    {
      id: "1",
      title: "Midnight Dreams",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
      plays: "1.2M",
      addedAt: Date.now() - 86400000,
    },
    {
      id: "2",
      title: "Electric Pulse",
      cover:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
      plays: "890K",
      addedAt: Date.now() - 172800000,
    },
    {
      id: "3",
      title: "Ocean Waves",
      cover:
        "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
      plays: "654K",
      addedAt: Date.now() - 259200000,
    },
    {
      id: "4",
      title: "Neon Nights",
      cover:
        "https://images.unsplash.com/photo-1556816723-1ce827b9cfbb?w=200&h=200&fit=crop",
      plays: "445K",
      addedAt: Date.now() - 345600000,
    },
    {
      id: "5",
      title: "Crystal Clear",
      cover:
        "https://images.unsplash.com/photo-1530841344095-9ce8b0e5a5a3?w=200&h=200&fit=crop",
      plays: "321K",
      addedAt: Date.now() - 432000000,
    },
    {
      id: "6",
      title: "Starlight Highway",
      cover:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
      plays: "287K",
      addedAt: Date.now() - 518400000,
    },
    {
      id: "7",
      title: "Digital Rain",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
      plays: "245K",
      addedAt: Date.now() - 604800000,
    },
    {
      id: "8",
      title: "Cosmic Journey",
      cover:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop",
      plays: "198K",
      addedAt: Date.now() - 691200000,
    },
    {
      id: "9",
      title: "Golden Hour",
      cover:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
      plays: "176K",
      addedAt: Date.now() - 777600000,
    },
    {
      id: "10",
      title: "Velvet Moon",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
      plays: "154K",
      addedAt: Date.now() - 864000000,
    },
    {
      id: "11",
      title: "Phoenix Rising",
      cover:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
      plays: "143K",
      addedAt: Date.now() - 950400000,
    },
    {
      id: "12",
      title: "Shadow Dance",
      cover:
        "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
      plays: "132K",
      addedAt: Date.now() - 1036800000,
    },
    {
      id: "13",
      title: "Thunder Storm",
      cover:
        "https://images.unsplash.com/photo-1556816723-1ce827b9cfbb?w=200&h=200&fit=crop",
      plays: "121K",
      addedAt: Date.now() - 1123200000,
    },
    {
      id: "14",
      title: "Mystic Forest",
      cover:
        "https://images.unsplash.com/photo-1530841344095-9ce8b0e5a5a3?w=200&h=200&fit=crop",
      plays: "118K",
      addedAt: Date.now() - 1209600000,
    },
    {
      id: "15",
      title: "Neon Dreams",
      cover:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
      plays: "109K",
      addedAt: Date.now() - 1296000000,
    },
    {
      id: "16",
      title: "Aurora Borealis",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
      plays: "98K",
      addedAt: Date.now() - 1382400000,
    },
    {
      id: "17",
      title: "City Lights",
      cover:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop",
      plays: "92K",
      addedAt: Date.now() - 1468800000,
    },
    {
      id: "18",
      title: "Summer Breeze",
      cover:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
      plays: "87K",
      addedAt: Date.now() - 1555200000,
    },
    {
      id: "19",
      title: "Midnight Express",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
      plays: "83K",
      addedAt: Date.now() - 1641600000,
    },
    {
      id: "20",
      title: "Electric Dreams",
      cover:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
      plays: "79K",
      addedAt: Date.now() - 1728000000,
    },
    {
      id: "21",
      title: "Ocean Drive",
      cover:
        "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
      plays: "76K",
      addedAt: Date.now() - 1814400000,
    },
    {
      id: "22",
      title: "Silver Lining",
      cover:
        "https://images.unsplash.com/photo-1556816723-1ce827b9cfbb?w=200&h=200&fit=crop",
      plays: "73K",
      addedAt: Date.now() - 1900800000,
    },
    {
      id: "23",
      title: "Diamond Sky",
      cover:
        "https://images.unsplash.com/photo-1530841344095-9ce8b0e5a5a3?w=200&h=200&fit=crop",
      plays: "69K",
      addedAt: Date.now() - 1987200000,
    },
    {
      id: "24",
      title: "Purple Haze",
      cover:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
      plays: "66K",
      addedAt: Date.now() - 2073600000,
    },
    {
      id: "25",
      title: "Moonlight Serenade",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
      plays: "63K",
      addedAt: Date.now() - 2160000000,
    },
    {
      id: "26",
      title: "Stardust Memories",
      cover:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop",
      plays: "61K",
      addedAt: Date.now() - 2246400000,
    },
    {
      id: "27",
      title: "Sunset Boulevard",
      cover:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
      plays: "58K",
      addedAt: Date.now() - 2332800000,
    },
    {
      id: "28",
      title: "Crimson Tide",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
      plays: "56K",
      addedAt: Date.now() - 2419200000,
    },
    {
      id: "29",
      title: "Jade Mountain",
      cover:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
      plays: "54K",
      addedAt: Date.now() - 2505600000,
    },
    {
      id: "30",
      title: "Azure Dreams",
      cover:
        "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
      plays: "52K",
      addedAt: Date.now() - 2592000000,
    },
    {
      id: "31",
      title: "Copper Canyon",
      cover:
        "https://images.unsplash.com/photo-1556816723-1ce827b9cfbb?w=200&h=200&fit=crop",
      plays: "49K",
      addedAt: Date.now() - 2678400000,
    },
    {
      id: "32",
      title: "Violet Storm",
      cover:
        "https://images.unsplash.com/photo-1530841344095-9ce8b0e5a5a3?w=200&h=200&fit=crop",
      plays: "47K",
      addedAt: Date.now() - 2764800000,
    },
    {
      id: "33",
      title: "Emerald City",
      cover:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
      plays: "45K",
      addedAt: Date.now() - 2851200000,
    },
    {
      id: "34",
      title: "Ruby Sunset",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
      plays: "43K",
      addedAt: Date.now() - 2937600000,
    },
    {
      id: "35",
      title: "Sapphire Skies",
      cover:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop",
      plays: "41K",
      addedAt: Date.now() - 3024000000,
    },
    {
      id: "36",
      title: "Golden Memories",
      cover:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
      plays: "39K",
      addedAt: Date.now() - 3110400000,
    },
    {
      id: "37",
      title: "Silver Dreams",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
      plays: "37K",
      addedAt: Date.now() - 3196800000,
    },
    {
      id: "38",
      title: "Platinum Rush",
      cover:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
      plays: "35K",
      addedAt: Date.now() - 3283200000,
    },
    {
      id: "39",
      title: "Bronze Age",
      cover:
        "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
      plays: "33K",
      addedAt: Date.now() - 3369600000,
    },
    {
      id: "40",
      title: "Iron Will",
      cover:
        "https://images.unsplash.com/photo-1556816723-1ce827b9cfbb?w=200&h=200&fit=crop",
      plays: "31K",
      addedAt: Date.now() - 3456000000,
    },
    {
      id: "41",
      title: "Steel Heart",
      cover:
        "https://images.unsplash.com/photo-1530841344095-9ce8b0e5a5a3?w=200&h=200&fit=crop",
      plays: "29K",
      addedAt: Date.now() - 3542400000,
    },
    {
      id: "42",
      title: "Titanium Soul",
      cover:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop",
      plays: "27K",
      addedAt: Date.now() - 3628800000,
    },
    {
      id: "43",
      title: "Quantum Leap",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
      plays: "25K",
      addedAt: Date.now() - 3715200000,
    },
    {
      id: "44",
      title: "Infinity Loop",
      cover:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop",
      plays: "23K",
      addedAt: Date.now() - 3801600000,
    },
    {
      id: "45",
      title: "Parallel Universe",
      cover:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
      plays: "21K",
      addedAt: Date.now() - 3888000000,
    },
    {
      id: "46",
      title: "Time Traveler",
      cover:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop",
      plays: "19K",
      addedAt: Date.now() - 3974400000,
    },
    {
      id: "47",
      title: "Dimension X",
      cover:
        "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop",
      plays: "17K",
      addedAt: Date.now() - 4060800000,
    },
    {
      id: "48",
      title: "Galaxy Express",
      cover:
        "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=200&h=200&fit=crop",
      plays: "15K",
      addedAt: Date.now() - 4147200000,
    },
    {
      id: "49",
      title: "Stellar Wind",
      cover:
        "https://images.unsplash.com/photo-1556816723-1ce827b9cfbb?w=200&h=200&fit=crop",
      plays: "13K",
      addedAt: Date.now() - 4233600000,
    },
    {
      id: "50",
      title: "Cosmic Dust",
      cover:
        "https://images.unsplash.com/photo-1530841344095-9ce8b0e5a5a3?w=200&h=200&fit=crop",
      plays: "11K",
      addedAt: Date.now() - 4320000000,
    },
  ];

  // Save tracks to cloud storage
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
