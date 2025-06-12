import Icon from "@/components/ui/icon";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const VolumeControl = ({ volume, onVolumeChange }: VolumeControlProps) => {
  return (
    <div
      className="flex items-center justify-center space-x-6 mb-8 animate-fade-in"
      style={{ animationDelay: "1.2s" }}
    >
      <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
        <Icon name="Volume2" size={24} className="text-white drop-shadow-sm" />
      </div>

      <div className="relative w-48 group">
        {/* Фон слайдера с градиентом */}
        <div
          className="absolute inset-0 h-3 bg-gradient-to-r from-white/20 to-white/10 rounded-full shadow-inner"
          style={{
            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        />

        {/* Заполненная часть */}
        <div
          className="absolute h-3 rounded-full transition-all duration-200"
          style={{
            width: `${volume * 100}%`,
            background:
              "linear-gradient(90deg, rgba(168, 85, 247, 0.9) 0%, rgba(236, 72, 153, 0.8) 100%)",
            boxShadow:
              "0 0 20px rgba(168, 85, 247, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        />

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="relative w-full h-3 bg-transparent appearance-none cursor-pointer z-10"
          style={{
            background: "transparent",
          }}
        />

        {/* Ползунок */}
        <div
          className="absolute top-1/2 w-5 h-5 bg-white rounded-full shadow-xl border-2 border-purple-300 
                     transform -translate-y-1/2 pointer-events-none transition-all duration-200 group-hover:scale-125"
          style={{
            left: `calc(${volume * 100}% - 10px)`,
            boxShadow:
              "0 4px 12px rgba(0, 0, 0, 0.4), 0 0 0 3px rgba(168, 85, 247, 0.3)",
          }}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
