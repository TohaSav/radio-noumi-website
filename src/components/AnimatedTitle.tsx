import React from "react";

const AnimatedTitle: React.FC = () => {
  return (
    <div className="relative mb-12">
      <h1 className="text-3xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 via-purple-500 via-blue-500 to-cyan-400 bg-[length:400%_400%] animate-gradient-shift bg-clip-text text-transparent mb-6 drop-shadow-2xl">
        Radio Noumi
      </h1>
    </div>
  );
};

export default AnimatedTitle;
