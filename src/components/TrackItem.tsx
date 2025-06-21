import Icon from "@/components/ui/icon";
import { Track } from "@/types/track";

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
        {track.audioFile && (
          <button
            onClick={() => onPlayPause(track)}
            className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Icon
              name={currentlyPlaying === track.id ? "Pause" : "Play"}
              size={24}
              className="text-white"
            />
          </button>
        )}
      </div>
      <div className="flex-1">
        <h3 className="text-white font-medium text-lg">{track.title}</h3>
        <p className="text-white/70 text-sm">Noumi Music</p>
      </div>
      <span className="text-white/60 text-sm">{track.plays}</span>
    </div>
  );
};

export default TrackItem;
