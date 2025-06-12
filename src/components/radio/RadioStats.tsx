import Icon from "@/components/ui/icon";

interface RadioStatsProps {
  listeners: number;
  likes: number;
  dislikes: number;
  userLiked: boolean | null;
  onLike: () => void;
  onDislike: () => void;
}

const RadioStats = ({
  listeners,
  likes,
  dislikes,
  userLiked,
  onLike,
  onDislike,
}: RadioStatsProps) => {
  return (
    <>
      {/* Счетчик слушателей */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center space-x-3 text-purple-200">
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: "#10b981",
              boxShadow: "0 0 10px rgba(16, 185, 129, 0.8)",
            }}
          />
          <span className="text-xl">
            <span className="font-bold text-white">
              {listeners.toLocaleString()}
            </span>{" "}
            слушают
          </span>
        </div>
      </div>

      {/* Лайки и дизлайки */}
      <div className="flex justify-center space-x-8">
        <button
          onClick={onLike}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
            userLiked === true
              ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
              : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          }`}
        >
          <Icon
            name="Heart"
            size={24}
            className={userLiked === true ? "fill-current" : ""}
          />
          <span className="font-semibold">{likes.toLocaleString()}</span>
        </button>

        <button
          onClick={onDislike}
          className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-200 ${
            userLiked === false
              ? "bg-gray-500 text-white shadow-lg shadow-gray-500/25"
              : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          }`}
        >
          <Icon
            name="HeartCrack"
            size={24}
            className={userLiked === false ? "fill-current" : ""}
          />
          <span className="font-semibold">{dislikes.toLocaleString()}</span>
        </button>
      </div>
    </>
  );
};

export default RadioStats;
