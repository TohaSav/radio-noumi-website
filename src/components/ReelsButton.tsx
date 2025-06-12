import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ReelsButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/reels")}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/50 to-purple-600/50 hover:from-pink-600/60 hover:to-purple-700/60 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
    >
      <Icon name="Play" size={16} />
      <span className="text-sm font-semibold">Reels</span>
    </button>
  );
};

export default ReelsButton;
