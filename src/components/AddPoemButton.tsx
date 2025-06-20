import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const AddPoemButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/poems");
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-600 text-white px-4 py-3 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30 backdrop-blur-sm border border-white/20 group"
    >
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
          <Icon name="BookOpen" size={18} className="text-white" />
        </div>
        <span className="text-sm font-semibold tracking-wide whitespace-nowrap">
          ДОБАВИТЬ
        </span>
      </div>
    </button>
  );
};

export default AddPoemButton;
