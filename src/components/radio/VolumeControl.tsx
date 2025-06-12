import Icon from "@/components/ui/icon";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const VolumeControl = ({ volume, onVolumeChange }: VolumeControlProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <Icon name="Volume2" size={24} className="text-white" />
      <div className="relative w-40">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, 
              rgba(168, 85, 247, 0.8) 0%, 
              rgba(168, 85, 247, 0.8) ${volume * 100}%, 
              rgba(255, 255, 255, 0.2) ${volume * 100}%, 
              rgba(255, 255, 255, 0.2) 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
