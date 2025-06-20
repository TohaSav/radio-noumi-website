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
      className="fixed left-4 top-4 z-50 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white hover:from-purple-700 hover:via-pink-600 hover:to-indigo-700 transition-all duration-300 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20 text-sm font-medium cursor-pointer"
    >
      Наши стихи
    </button>
  );
};

export default AddPoemButton;
