import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ReelsNavigation = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
        >
          <Icon name="ArrowLeft" size={24} />
          <span className="font-medium">Главная</span>
        </Link>

        <h1 className="text-white font-bold text-lg">Reels</h1>

        <div className="flex items-center gap-3">
          <Icon
            name="Search"
            size={24}
            className="text-white/70 hover:text-white cursor-pointer transition-colors"
          />
          <Icon
            name="MoreVertical"
            size={24}
            className="text-white/70 hover:text-white cursor-pointer transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default ReelsNavigation;
