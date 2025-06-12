import Icon from "@/components/ui/icon";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const VolumeControl = ({ volume, onVolumeChange }: VolumeControlProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-6">
      <Icon name="Volume2" size={20} className="text-white" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-32 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default VolumeControl;
