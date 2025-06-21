import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Track } from "@/types/track";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface TrackItemProps {
  track: Track;
  index: number;
  currentlyPlaying: string | null;
  onPlayPause: (track: Track) => void;
  onEdit: (track: Track) => void;
}

const TrackItem = ({
  track,
  index,
  currentlyPlaying,
  onPlayPause,
  onEdit,
}: TrackItemProps) => {
  const [likedTracks, setLikedTracks] = useLocalStorage<string[]>(
    "likedTracks",
    [],
  );
  const [currentLikes, setCurrentLikes] = useState(track.likes);
  const isLiked = likedTracks.includes(track.id);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikedTracks(likedTracks.filter((id) => id !== track.id));
      setCurrentLikes((prev) => prev - 1);
    } else {
      setLikedTracks([...likedTracks, track.id]);
      setCurrentLikes((prev) => prev + 1);
    }
  };

  const formatLikes = (count: number | undefined): string => {
    // Проверяем на undefined/null и устанавливаем значение по умолчанию
    const likes = count ?? 0;

    if (likes >= 1000000) {
      return (likes / 1000000).toFixed(1) + "M";
    }
    if (likes >= 1000) {
      return (likes / 1000).toFixed(1) + "K";
    }
    return likes.toString();
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors ${
        onEdit ? "cursor-pointer" : ""
      }`}
      onClick={onEdit ? () => onEdit(track) : undefined}
    >
      <span className="text-white font-bold text-xl w-8">#{index + 1}</span>
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPlayPause(track);
          }}
          className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-black/40"
        >
          <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 hover:bg-green-400">
            <Icon
              name={currentlyPlaying === track.id ? "Pause" : "Play"}
              size={20}
              className="text-white ml-0.5"
            />
          </div>
        </button>
      </div>
      <div className="flex-1">
        <h3 className="text-white font-medium text-lg">{track.title}</h3>
        <p className="text-white/70 text-sm">Noumi Music</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleLike}
          className="flex items-center gap-1 text-white/70 hover:text-red-400 transition-colors"
        >
          <Icon
            name={isLiked ? "Heart" : "Heart"}
            size={16}
            className={isLiked ? "fill-red-500 text-red-500" : "text-white/70"}
          />
          <span className="text-xs">{formatLikes(currentLikes)}</span>
        </button>
        <span className="text-white/60 text-sm">{track.plays}</span>
      </div>
    </div>
  );
};

export default TrackItem;
