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
        step="0.01"
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="volume-slider w-32 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer relative overflow-hidden
                   before:content-[''] before:absolute before:left-0 before:top-0 before:h-full 
                   before:bg-gradient-to-r before:from-green-400 before:to-blue-500 before:rounded-lg
                   before:transition-all before:duration-300 before:ease-out
                   hover:shadow-lg hover:shadow-blue-500/25 transition-shadow duration-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        style={{
          background: `linear-gradient(to right, 
            rgb(34, 197, 94) 0%, 
            rgb(59, 130, 246) ${volume * 100}%, 
            rgba(255, 255, 255, 0.2) ${volume * 100}%, 
            rgba(255, 255, 255, 0.2) 100%)`,
        }}
      />
      <span className="text-white text-sm font-medium min-w-[3ch]">
        {Math.round(volume * 100)}%
      </span>
    </div>
  );
};

export default VolumeControl;
