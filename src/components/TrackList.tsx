import { Track } from "@/types/track";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: Track[];
  currentlyPlaying: string | null;
  onPlayPause: (track: Track) => void;
  onEdit: (track: Track) => void;
}

const TrackList = ({
  tracks,
  currentlyPlaying,
  onPlayPause,
  onEdit,
}: TrackListProps) => {
  if (tracks.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
        <p className="text-white/70 text-center py-8">
          Треки пока не добавлены
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
      <div className="space-y-4">
        {tracks.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
            currentlyPlaying={currentlyPlaying}
            onPlayPause={onPlayPause}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TrackList;
