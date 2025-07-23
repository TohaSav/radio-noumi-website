import React from "react";

interface EmbeddedRadioPlayerProps {
  streamUrl: string;
}

const EmbeddedRadioPlayer = (props: EmbeddedRadioPlayerProps) => {
  return (
    <div className="flex items-center justify-center py-12">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-center">
        <span className="bg-gradient-to-r from-purple-400 via-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-400 bg-clip-text text-transparent animate-pulse bg-[length:200%_100%]" 
              style={{
                animation: 'gradient-shift 3s ease-in-out infinite'
              }}>
          Noumi
        </span>
      </h1>
    </div>
  );
};

export default EmbeddedRadioPlayer;