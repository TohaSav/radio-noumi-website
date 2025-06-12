import { AudioData, MusicType } from "@/types/radio";

interface AudioVisualizerProps {
  audioData: AudioData;
  isPlaying: boolean;
  musicType: MusicType;
  pulseIntensity: number;
}

const AudioVisualizer = ({
  audioData,
  isPlaying,
  musicType,
  pulseIntensity,
}: AudioVisualizerProps) => {
  const getVisualizerBars = () => {
    const intensity = pulseIntensity;

    return Array.from({ length: 12 }, (_, i) => {
      const baseHeight = 20;
      const maxHeight =
        musicType === "club" ? 80 : musicType === "bass" ? 60 : 40;
      const randomFactor = Math.random() * intensity;

      return baseHeight + (maxHeight - baseHeight) * randomFactor;
    });
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-end space-x-1 h-24 p-4 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10">
        {getVisualizerBars().map((height, i) => (
          <div
            key={i}
            className="w-3 rounded-full transition-all duration-100 ease-out relative overflow-hidden"
            style={{
              height: isPlaying ? `${height}px` : "24px",
              background: `linear-gradient(to top, 
                rgba(168, 85, 247, ${0.9 + audioData.bassLevel * 0.4}) 0%,
                rgba(59, 130, 246, ${0.7 + audioData.midLevel * 0.4}) 50%, 
                rgba(236, 72, 153, ${0.5 + audioData.trebleLevel * 0.6}) 100%)`,
              boxShadow: isPlaying
                ? `0 0 ${15 + pulseIntensity * 25}px rgba(168, 85, 247, 0.8), 
                   0 0 ${30 + pulseIntensity * 40}px rgba(59, 130, 246, 0.4)`
                : "none",
              animationDelay: `${i * 0.05}s`,
              transform: `scaleY(${1 + audioData.overall * 0.3})`,
            }}
          >
            {/* Внутреннее свечение */}
            <div
              className="absolute inset-0 rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;
