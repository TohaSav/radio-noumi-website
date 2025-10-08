import React from "react";

const AdBanner = () => {
  return (
    <div className="w-full h-[90px] sm:h-[110px] md:h-[130px] lg:h-[140px] px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full h-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-purple-600 rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden border border-white/10">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20 backdrop-blur-sm">
          {/* Floating Icons Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Views Icons */}
            <div
              className="absolute animate-[fall_4s_linear_infinite] text-white/40 text-xl"
              style={{ left: "10%", animationDelay: "0s" }}
            >
              👁️
            </div>
            <div
              className="absolute animate-[fall_5s_linear_infinite] text-white/30 text-base"
              style={{ left: "25%", animationDelay: "1s" }}
            >
              👁️
            </div>
            <div
              className="absolute animate-[fall_3.5s_linear_infinite] text-white/35 text-lg"
              style={{ left: "45%", animationDelay: "2.5s" }}
            >
              👁️
            </div>
            <div
              className="absolute animate-[fall_4.5s_linear_infinite] text-white/40 text-xl"
              style={{ left: "70%", animationDelay: "0.5s" }}
            >
              👁️
            </div>
            <div
              className="absolute animate-[fall_6s_linear_infinite] text-white/30 text-base"
              style={{ left: "85%", animationDelay: "3s" }}
            >
              👁️
            </div>

            {/* Heart Icons */}
            <div
              className="absolute animate-[fall_3s_linear_infinite] text-pink-300/50 text-lg"
              style={{ left: "15%", animationDelay: "1.5s" }}
            >
              💖
            </div>
            <div
              className="absolute animate-[fall_5.5s_linear_infinite] text-pink-400/40 text-xl"
              style={{ left: "35%", animationDelay: "0.8s" }}
            >
              💖
            </div>
            <div
              className="absolute animate-[fall_4s_linear_infinite] text-pink-300/45 text-base"
              style={{ left: "60%", animationDelay: "2s" }}
            >
              💖
            </div>
            <div
              className="absolute animate-[fall_3.8s_linear_infinite] text-pink-400/50 text-lg"
              style={{ left: "80%", animationDelay: "0.3s" }}
            >
              💖
            </div>

            {/* Love Icons */}
            <div
              className="absolute animate-[fall_4.2s_linear_infinite] text-purple-300/50 text-lg"
              style={{ left: "20%", animationDelay: "1.8s" }}
            >
              💕
            </div>
            <div
              className="absolute animate-[fall_5s_linear_infinite] text-purple-400/40 text-base"
              style={{ left: "40%", animationDelay: "0.2s" }}
            >
              💕
            </div>
            <div
              className="absolute animate-[fall_3.3s_linear_infinite] text-purple-300/45 text-xl"
              style={{ left: "65%", animationDelay: "2.8s" }}
            >
              💕
            </div>
            <div
              className="absolute animate-[fall_4.8s_linear_infinite] text-purple-400/50 text-lg"
              style={{ left: "90%", animationDelay: "1.2s" }}
            >
              💕
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <div className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 drop-shadow-lg">
            🎵 Реклама
          </div>
          <div className="text-xs sm:text-sm md:text-base opacity-95 mb-2 sm:mb-3 font-medium">
            Ваша реклама здесь
          </div>
          <a
            href="https://wa.me/79049808275?text=Здравствуйте!%20Я%20хотел%20бы%20заказать%20рекламу%20на%20вашем%20Radio%20Noumi.%20Расскажите,%20пожалуйста,%20о%20стоимости%20и%20сроках%20размещения."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            📱 WhatsApp
          </a>
        </div>

        {/* Decorative Glowing Elements */}
        <div className="absolute top-3 right-3 w-3 h-3 bg-white/40 rounded-full animate-pulse shadow-lg shadow-white/30"></div>
        <div className="absolute bottom-3 left-3 w-4 h-4 bg-white/30 rounded-full animate-pulse delay-500 shadow-lg shadow-white/20"></div>
      </div>
    </div>
  );
};

export default AdBanner;
