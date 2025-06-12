import React, { useState, useEffect } from "react";

const AnimatedTitle: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const title = "Radio Noumi";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition((prev) => (prev + 1) % title.length);
    }, 1000); // Шагает каждую секунду

    return () => clearInterval(interval);
  }, [title.length]);

  return (
    <div className="relative mb-12">
      <h1 className="text-3xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-300 via-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent mb-6 drop-shadow-2xl filter brightness-110">
        {title.split("").map((letter, index) => (
          <span key={index} className="relative inline-block">
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default AnimatedTitle;
