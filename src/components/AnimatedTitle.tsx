import React, { useState, useEffect } from "react";

const AnimatedTitle: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const title = "Radio Noumi";
  const followText =
    "Пряничная тучка это самое лучшее лакомство для вас https://cloudpryanik.ru/";

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
            {index === currentPosition && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex items-center z-10">
                <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-amber-200">
                  <span className="text-3xl animate-bounce mr-2">🍪</span>
                  <div className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm whitespace-nowrap max-w-xs overflow-hidden">
                    <div className="animate-pulse">{followText}</div>
                  </div>
                </div>
              </div>
            )}
          </span>
        ))}
      </h1>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedTitle;
