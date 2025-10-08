import React from "react";

interface EmbeddedRadioPlayerProps {
  streamUrl: string;
}

const EmbeddedRadioPlayer = (props: EmbeddedRadioPlayerProps) => {
  return (
    <div className="flex items-center justify-center py-16 opacity-0 animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
      <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-center tracking-tight">
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl" 
              style={{
                textShadow: '0 0 80px rgba(168, 85, 247, 0.4), 0 0 120px rgba(236, 72, 153, 0.3)'
              }}>
          Noumi
        </span>
      </h1>
    </div>
  );
};

export default EmbeddedRadioPlayer;
