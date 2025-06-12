import Icon from "@/components/ui/icon";

interface PlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const PlayButton = ({ isPlaying, onToggle }: PlayButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="bg-white text-purple-900 p-6 rounded-full hover:bg-purple-50 transition-colors shadow-lg"
    >
      <Icon name={isPlaying ? "Pause" : "Play"} size={32} />
    </button>
  );
};

export default PlayButton;
