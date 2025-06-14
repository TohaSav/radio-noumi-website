import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ReelsButton = () => {
  return (
    <div className="fixed top-4 right-4 z-20">
      <Link
        to="/reels"
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full transition-all duration-200 hover:bg-white/20"
      >
        <Icon name="Play" size={16} />
        <span className="text-sm font-semibold">Reels</span>
      </Link>
    </div>
  );
};

export default ReelsButton;
