import Icon from "@/components/ui/icon";

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const PlayButton = ({ isPlaying, onToggle }: PlayButtonProps) => {
  return (
    <button onClick={onToggle} className="relative group z-10">
      <div
        className="absolute inset-0 rounded-full blur-lg opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)",
        }}
      />
      <div className="relative bg-white text-purple-900 p-6 rounded-full hover:bg-purple-50 transition-all duration-200 shadow-2xl group-hover:shadow-purple-500/25">
        <Icon name={isPlaying ? "Pause" : "Play"} size={40} />
      </div>
    </button>
  );
};

export default PlayButton;
