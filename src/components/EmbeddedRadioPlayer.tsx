import React from "react";

interface EmbeddedRadioPlayerProps {
  streamUrl: string;
}

const EmbeddedRadioPlayer = (props: EmbeddedRadioPlayerProps) => {
  return (
    <div className="flex items-center justify-center py-12 opacity-0 animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-center tracking-tight">
        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent" 
              style={{
                textShadow: '0 0 40px rgba(16, 185, 129, 0.3)'
              }}>
          Noumi
        </span>
      </h1>
    </div>
  );
};

export default EmbeddedRadioPlayer;