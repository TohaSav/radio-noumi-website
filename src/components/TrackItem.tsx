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
  const [currentLikes, setCurrentLikes] = useState(track.likes || 0);
  const isLiked = likedTracks.includes(track.id);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
      setLikedTracks(likedTracks.filter((id) => id !== track.id));
      setCurrentLikes((prev) => Math.max(0, (prev || 0) - 1));
    } else {
      setLikedTracks([...likedTracks, track.id]);
      setCurrentLikes((prev) => (prev || 0) + 1);
    }
  };

  const formatLikes = (count: number | undefined): string => {
    const likes = Number(count) || 0;

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
      className={`flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors ${
        onEdit ? "cursor-pointer" : ""
      }`}
      onClick={onEdit ? () => onEdit(track) : undefined}
    >
      <span className="text-white font-bold text-sm sm:text-lg md:text-xl w-6 sm:w-7 md:w-8 flex-shrink-0">
        #{index + 1}
      </span>
      <div className="relative group flex-shrink-0">
        <img
          src={track.cover}
          alt={track.title}
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg object-cover"
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
          className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-black/40 active:bg-black/50"
        >
          <div className="bg-green-500 rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 hover:bg-green-400">
            <Icon
              name={currentlyPlaying === track.id ? "Pause" : "Play"}
              size={currentlyPlaying === track.id ? 14 : 16}
              className="text-white ml-0.5"
            />
          </div>
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium text-sm sm:text-base md:text-lg truncate">
          {track.title}
        </h3>
        <p className="text-white/70 text-xs sm:text-sm truncate">Noumi Music</p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button
          onClick={toggleLike}
          className="flex items-center gap-1 text-white/70 hover:text-red-400 active:text-red-500 transition-colors touch-manipulation p-1"
        >
          <Icon
            name={isLiked ? "Heart" : "Heart"}
            size={14}
            className={isLiked ? "fill-red-500 text-red-500" : "text-white/70"}
          />
          <span className="text-xs hidden sm:inline">
            {formatLikes(currentLikes)}
          </span>
        </button>
        <span className="text-white/60 text-xs sm:text-sm">{track.plays}</span>
      </div>
    </div>
  );
};

export default TrackItem;
