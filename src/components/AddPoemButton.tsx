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
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 bg-transparent text-white hover:text-purple-200 transition-colors duration-300 underline decoration-white/50 hover:decoration-white underline-offset-4 text-sm font-medium cursor-pointer -rotate-90"
    >
      Наши стихи
    </button>
  );
};

export default AddPoemButton;
