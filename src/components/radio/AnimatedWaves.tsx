import { AudioData, MusicType } from "@/types/radio";

interface AnimatedWavesProps {
  audioData: AudioData;
  isPlaying: boolean;
  musicType: MusicType;
  pulseIntensity: number;
}

const AnimatedWaves = ({
  audioData,
  isPlaying,
  musicType,
  pulseIntensity,
}: AnimatedWavesProps) => {
  return (
    <>
      {/* Основные анимированные волны */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(6)].map((_, i) => {
          const delay = i * 200;

          let animationDuration;
          let waveSize;
          let opacity;

          switch (musicType) {
            case "club":
              animationDuration = `${0.8 + Math.sin(audioData.bassLevel * 10) * 0.2}s`;
              waveSize = `${300 + i * 100 + audioData.bassLevel * 200}px`;
              opacity = 0.6 + audioData.bassLevel * 0.4;
              break;
            case "bass":
              animationDuration = `${1.2 + Math.sin(audioData.bassLevel * 8) * 0.3}s`;
              waveSize = `${250 + i * 80 + audioData.bassLevel * 150}px`;
              opacity = 0.5 + audioData.bassLevel * 0.3;
              break;
            case "slow":
              animationDuration = `${3 + audioData.overall * 2}s`;
              waveSize = `${200 + i * 60 + audioData.overall * 100}px`;
              opacity = 0.2 + audioData.overall * 0.2;
              break;
            default:
              animationDuration = `${1.5 + audioData.overall}s`;
              waveSize = `${225 + i * 70 + audioData.overall * 120}px`;
              opacity = 0.4 + audioData.overall * 0.2;
          }

          return (
            <div
              key={i}
              className="absolute rounded-full border-2 animate-pulse"
              style={{
                width: isPlaying ? waveSize : "100px",
                height: isPlaying ? waveSize : "100px",
                borderColor:
                  musicType === "club"
                    ? `rgba(168, 85, 247, ${opacity})`
                    : musicType === "bass"
                      ? `rgba(59, 130, 246, ${opacity})`
                      : musicType === "slow"
                        ? `rgba(236, 72, 153, ${opacity})`
                        : `rgba(34, 197, 94, ${opacity})`,
                animationDuration: isPlaying ? animationDuration : "2s",
                animationDelay: `${delay}ms`,
                transform: `scale(${1 + pulseIntensity * 0.3})`,
                boxShadow: isPlaying
                  ? `0 0 ${30 + pulseIntensity * 50}px ${
                      musicType === "club"
                        ? `rgba(168, 85, 247, ${opacity * 0.8})`
                        : musicType === "bass"
                          ? `rgba(59, 130, 246, ${opacity * 0.8})`
                          : musicType === "slow"
                            ? `rgba(236, 72, 153, ${opacity * 0.8})`
                            : `rgba(34, 197, 94, ${opacity * 0.8})`
                    }`
                  : "none",
                transition: "all 0.1s ease-out",
              }}
            />
          );
        })}
      </div>

      {/* Дополнительные волны для клубной музыки */}
      {musicType === "club" && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={`club-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${150 + i * 50 + audioData.bassLevel * 100}px`,
                height: `${150 + i * 50 + audioData.bassLevel * 100}px`,
                background: `radial-gradient(circle, transparent 60%, rgba(168, 85, 247, ${0.3 + audioData.bassLevel * 0.4}) 70%, transparent 80%)`,
                animation: `pulse ${0.3 + Math.sin(audioData.bassLevel * 15) * 0.1}s ease-in-out infinite`,
                animationDelay: `${i * 100}ms`,
                transform: `scale(${1 + audioData.bassLevel * 0.5}) rotate(${audioData.overall * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Дополнительные медленные волны для спокойной музыки */}
      {musicType === "slow" && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={`slow-${i}`}
              className="absolute rounded-full border border-pink-300/20"
              style={{
                width: `${400 + i * 150}px`,
                height: `${400 + i * 150}px`,
                animation: `pulse ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 500}ms`,
                transform: `scale(${0.8 + audioData.overall * 0.4})`,
                opacity: 0.1 + audioData.overall * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AnimatedWaves;
