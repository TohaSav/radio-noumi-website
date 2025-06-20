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
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 bg-transparent text-gray-700 hover:text-purple-600 transition-colors duration-300 underline decoration-purple-600/50 hover:decoration-purple-600 underline-offset-4 text-sm font-medium cursor-pointer"
    >
      ДОБАВИТЬ
    </button>
  );
};

export default AddPoemButton;
