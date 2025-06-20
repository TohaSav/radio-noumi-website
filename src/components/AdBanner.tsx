import React from "react";

const AdBanner = () => {
  return (
    <div className="w-full max-w-[450px] h-[130px] mx-auto mt-8 mb-6 px-4 sm:px-0">
      <div className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <div className="text-sm sm:text-base font-semibold mb-1">
            🎵 Реклама
          </div>
          <div className="text-xs sm:text-sm opacity-90">
            Ваша реклама здесь
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default AdBanner;
