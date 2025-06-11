import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import UploadReelModal from "@/components/UploadReelModal";
import { Reel } from "@/pages/Reels";

interface ReelsNavigationProps {
  onTogglePlay?: () => void;
  isPlaying?: boolean;
  onAddReel?: (reel: Reel) => void;
}

const ReelsNavigation = ({
  onTogglePlay,
  isPlaying = false,
  onAddReel,
}: ReelsNavigationProps) => {
  const [showUpload, setShowUpload] = useState(false);
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

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowUpload(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2"
          >
            <Icon name="Plus" size={18} />
            Загрузить Reel
          </button>

          <button
            onClick={onTogglePlay}
            className="p-2 text-white/80 hover:text-white transition-colors"
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
          </button>
        </div>
      </div>

      {showUpload && (
        <UploadReelModal
          onClose={() => setShowUpload(false)}
          onUpload={onAddReel}
        />
      )}
    </div>
  );
};

export default ReelsNavigation;
