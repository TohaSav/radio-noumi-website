import Icon from "@/components/ui/icon";

interface TopChartProps {
  showTopChart: boolean;
  setShowTopChart: (value: boolean) => void;
  topChartSongs: string[];
  songLikes: { [key: number]: { likes: number; dislikes: number } };
  handleSongAction: (songIndex: number, action: 'like' | 'dislike') => void;
  bestTrackIndex: number;
  worstTrackIndex: number;
}

const TopChart = ({
  showTopChart,
  setShowTopChart,
  topChartSongs,
  songLikes,
  handleSongAction,
  bestTrackIndex,
  worstTrackIndex
}: TopChartProps) => {
  if (!showTopChart) return null;

  const formatLikes = (count: number): string => {
    if (count >= 1000000000) {
      return (count / 1000000000).toFixed(2) + "B";
    }
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] relative border border-purple-500/30 overflow-hidden">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-1 sm:gap-2 min-w-0">
            🎵 <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent truncate"><span className="hidden sm:inline">Топ Чарт Radio Noumi</span><span className="sm:hidden">Топ Чарт</span></span>
          </h2>
          <button
            onClick={() => setShowTopChart(false)}
            className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-all flex-shrink-0 touch-manipulation"
          >
            <Icon name="X" size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Список песен */}
        <div className="overflow-y-auto max-h-[65vh] sm:max-h-[60vh] custom-scrollbar">
          <div className="space-y-1.5 sm:space-y-2">
            {topChartSongs.map((song, index) => {
              const isBestTrack = index === bestTrackIndex;
              const isWorstTrack = index === worstTrackIndex;
              const isGoldTrack = index === 0; // Первая песня - золотая
              
              return (
                <div
                  key={index}
                  className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all group ${
                    isGoldTrack
                      ? 'bg-gradient-to-r from-yellow-500/30 via-amber-500/30 to-yellow-500/30 animate-pulse border border-yellow-400/60 shadow-xl shadow-yellow-500/30'
                      : isBestTrack
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 shadow-lg shadow-yellow-500/20'
                      : isWorstTrack
                      ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/50 shadow-lg shadow-red-500/20'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold ${
                    isGoldTrack
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-400 animate-pulse shadow-lg shadow-yellow-500/50'
                      : isBestTrack
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                      : isWorstTrack
                      ? 'bg-gradient-to-r from-red-500 to-red-600'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-sm sm:text-base truncate transition-colors flex items-center gap-1 sm:gap-2 ${
                      isGoldTrack
                        ? 'text-yellow-300 font-bold animate-pulse'
                        : isBestTrack
                        ? 'text-yellow-300'
                        : isWorstTrack
                        ? 'text-red-300'
                        : 'text-white group-hover:text-purple-300'
                    }`}>
                      {isGoldTrack && <span className="text-yellow-400 animate-bounce">👑</span>}
                      {!isGoldTrack && isBestTrack && <span className="text-yellow-400">🏆</span>}
                      {isWorstTrack && <span className="text-red-400">😢</span>}
                      {song}
                    </div>
                  </div>
                
                {/* Лайки и дизлайки */}
                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  {/* Лайк */}
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSongAction(index, 'like');
                      }}
                      className="text-green-400 hover:text-green-300 transition-colors p-1 hover:bg-green-400/10 rounded touch-manipulation"
                    >
                      👍
                    </button>
                    <span className="text-green-400 font-medium min-w-[35px] sm:min-w-[50px] text-xs sm:text-sm">
                      {formatLikes(songLikes[index]?.likes || 0)}
                    </span>
                  </div>
                  
                  {/* Дизлайк */}
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSongAction(index, 'dislike');
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors p-1 hover:bg-red-400/10 rounded touch-manipulation"
                    >
                      👎
                    </button>
                    <span className="text-red-400 font-medium min-w-[25px] sm:min-w-[30px] text-xs sm:text-sm">
                      {songLikes[index]?.dislikes || 0}
                    </span>
                  </div>
                </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Подвал */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 text-center">
          <p className="text-white/60 text-xs sm:text-sm">
            🔥 Самые популярные треки Radio Noumi
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopChart;