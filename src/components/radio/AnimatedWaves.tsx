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
          const delay = i * 150;
          let animationDuration;
          let waveSize;
          let opacity;

          switch (musicType) {
            case "club":
              animationDuration = `${0.6 + Math.sin(audioData.bassLevel * 12) * 0.2}s`;
              waveSize = `${280 + i * 90 + audioData.bassLevel * 180}px`;
              opacity = 0.7 + audioData.bassLevel * 0.3;
              break;
            case "bass":
              animationDuration = `${1.0 + Math.sin(audioData.bassLevel * 8) * 0.3}s`;
              waveSize = `${240 + i * 70 + audioData.bassLevel * 140}px`;
              opacity = 0.6 + audioData.bassLevel * 0.2;
              break;
            case "slow":
              animationDuration = `${3.5 + audioData.overall * 1.5}s`;
              waveSize = `${200 + i * 50 + audioData.overall * 80}px`;
              opacity = 0.3 + audioData.overall * 0.15;
              break;
            default:
              animationDuration = `${1.8 + audioData.overall * 0.7}s`;
              waveSize = `${220 + i * 60 + audioData.overall * 100}px`;
              opacity = 0.5 + audioData.overall * 0.2;
          }

          return (
            <div
              key={i}
              className="absolute rounded-full border-2 animate-pulse"
              style={{
                width: isPlaying ? waveSize : "80px",
                height: isPlaying ? waveSize : "80px",
                borderColor:
                  musicType === "club"
                    ? `rgba(168, 85, 247, ${opacity})`
                    : musicType === "bass"
                      ? `rgba(59, 130, 246, ${opacity})`
                      : musicType === "slow"
                        ? `rgba(236, 72, 153, ${opacity})`
                        : `rgba(34, 197, 94, ${opacity})`,
                animationDuration: isPlaying ? animationDuration : "2.5s",
                animationDelay: `${delay}ms`,
                transform: `scale(${1 + pulseIntensity * 0.4})`,
                boxShadow: isPlaying
                  ? `0 0 ${40 + pulseIntensity * 60}px ${
                      musicType === "club"
                        ? `rgba(168, 85, 247, ${opacity * 0.7})`
                        : musicType === "bass"
                          ? `rgba(59, 130, 246, ${opacity * 0.7})`
                          : musicType === "slow"
                            ? `rgba(236, 72, 153, ${opacity * 0.7})`
                            : `rgba(34, 197, 94, ${opacity * 0.7})`
                    }`
                  : "none",
                transition: "all 0.15s ease-out",
              }}
            />
          );
        })}
      </div>

      {/* Интенсивные волны для клубной музыки */}
      {musicType === "club" && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={`club-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${120 + i * 40 + audioData.bassLevel * 80}px`,
                height: `${120 + i * 40 + audioData.bassLevel * 80}px`,
                background: `radial-gradient(circle, transparent 50%, rgba(168, 85, 247, ${0.4 + audioData.bassLevel * 0.3}) 60%, transparent 70%)`,
                animation: `pulse ${0.25 + Math.sin(audioData.bassLevel * 18) * 0.1}s ease-in-out infinite`,
                animationDelay: `${i * 80}ms`,
                transform: `scale(${1 + audioData.bassLevel * 0.6}) rotate(${audioData.overall * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Медленные волны для спокойной музыки */}
      {musicType === "slow" && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={`slow-${i}`}
              className="absolute rounded-full border border-pink-200/30"
              style={{
                width: `${350 + i * 120}px`,
                height: `${350 + i * 120}px`,
                animation: `pulse ${4.5 + i * 0.8}s ease-in-out infinite`,
                animationDelay: `${i * 600}ms`,
                transform: `scale(${0.7 + audioData.overall * 0.3})`,
                opacity: 0.15 + audioData.overall * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AnimatedWaves;
