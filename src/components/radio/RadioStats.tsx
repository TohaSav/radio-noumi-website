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
      <div
        className="flex items-center justify-center mb-8 animate-slide-in-right"
        style={{ animationDelay: "1.5s" }}
      >
        <div
          className="flex items-center justify-center space-x-4 text-purple-200 px-6 py-3 
                     rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm 
                     border border-white/20 shadow-xl"
          style={{
            boxShadow:
              "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            className="w-4 h-4 rounded-full animate-pulse"
            style={{
              background: "radial-gradient(circle, #10b981 0%, #059669 100%)",
              boxShadow:
                "0 0 20px rgba(16, 185, 129, 0.8), 0 0 40px rgba(16, 185, 129, 0.4)",
            }}
          />
          <span className="text-xl font-medium">
            <span
              className="font-bold text-white text-2xl"
              style={{
                textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
              }}
            >
              {listeners.toLocaleString()}
            </span>{" "}
            слушают сейчас
          </span>
        </div>
      </div>

      {/* Лайки и дизлайки */}
      <div
        className="flex justify-center space-x-6 animate-fade-in"
        style={{ animationDelay: "1.8s" }}
      >
        <button
          onClick={onLike}
          className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all duration-300 
                      transform hover:scale-105 hover:-translate-y-1 ${
                        userLiked === true
                          ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-2xl shadow-red-500/30"
                          : "bg-gradient-to-r from-white/15 to-white/10 text-white hover:from-white/25 hover:to-white/15 backdrop-blur-sm border border-white/20"
                      }`}
          style={{
            boxShadow:
              userLiked === true
                ? "0 10px 30px rgba(239, 68, 68, 0.4), 0 0 40px rgba(236, 72, 153, 0.3)"
                : "0 8px 25px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Icon
            name="Heart"
            size={28}
            className={`transition-all duration-300 ${userLiked === true ? "fill-current animate-pulse" : "group-hover:scale-110"}`}
          />
          <span className="font-bold text-lg">{likes.toLocaleString()}</span>
        </button>

        <button
          onClick={onDislike}
          className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all duration-300 
                      transform hover:scale-105 hover:-translate-y-1 ${
                        userLiked === false
                          ? "bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-2xl shadow-gray-500/30"
                          : "bg-gradient-to-r from-white/15 to-white/10 text-white hover:from-white/25 hover:to-white/15 backdrop-blur-sm border border-white/20"
                      }`}
          style={{
            boxShadow:
              userLiked === false
                ? "0 10px 30px rgba(107, 114, 128, 0.4)"
                : "0 8px 25px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Icon
            name="HeartCrack"
            size={28}
            className={`transition-all duration-300 ${userLiked === false ? "fill-current" : "group-hover:scale-110"}`}
          />
          <span className="font-bold text-lg">{dislikes.toLocaleString()}</span>
        </button>
      </div>
    </>
  );
};

export default RadioStats;
