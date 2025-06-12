import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ReelsButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/reels")}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
    >
      <Icon name="Play" size={16} />
      <span className="text-sm font-semibold">Reels</span>
    </button>
  );
};

export default ReelsButton;
