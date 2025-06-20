import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface RadioPlayerProps {
  streamUrl: string;
}

const RadioPlayer = ({ streamUrl }: RadioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Ошибка воспроизведения:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={streamUrl}
        preload="metadata"
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Mobile version */}
            <div className="flex md:hidden flex-col gap-4">
              <div className="flex items-center justify-between">
                <Button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Icon
                      name={isPlaying ? "Pause" : "Play"}
                      size={28}
                      className="text-white ml-0.5"
                    />
                  )}
                </Button>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-xs font-bold">LIVE</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/80">
                    <Icon name="Users" size={16} />
                    <span className="text-sm">1,247</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-white font-semibold text-sm mb-1">
                  🎵 Naturalize & Second Sun - 3am
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Icon name="Volume2" size={18} className="text-white/70" />
                <div className="flex-1 relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                  />
                  <div
                    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg pointer-events-none"
                    style={{ width: `${volume}%` }}
                  />
                </div>
                <span className="text-white/70 text-xs w-8 text-right">
                  {volume}%
                </span>
              </div>
            </div>

            {/* Desktop version */}
            <div className="hidden md:flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Icon
                      name={isPlaying ? "Pause" : "Play"}
                      size={20}
                      className="text-white ml-0.5"
                    />
                  )}
                </Button>

                <div className="flex items-center gap-3">
                  <Icon name="Volume2" size={20} className="text-white/70" />
                  <div className="relative w-24">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                    />
                    <div
                      className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg pointer-events-none"
                      style={{ width: `${volume}%` }}
                    />
                  </div>
                  <span className="text-white/70 text-sm w-10">{volume}%</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-white font-semibold">
                  🎵 Naturalize & Second Sun - 3am
                </div>
                <div className="text-white/60 text-sm">Radio Noumi</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-bold">LIVE</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Icon name="Users" size={18} />
                  <span className="font-medium">1,247</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RadioPlayer;
