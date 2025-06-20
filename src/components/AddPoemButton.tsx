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
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-b from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-3 py-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 backdrop-blur-sm border border-white/10"
      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
    >
      <div className="flex flex-col items-center gap-2">
        <Icon name="BookOpen" size={20} />
        <span className="text-sm font-medium tracking-wider">
          {isHovered ? "ДОБАВИТЬ" : "СТИХИ"}
        </span>
      </div>
    </button>
  );
};

export default AddPoemButton;
