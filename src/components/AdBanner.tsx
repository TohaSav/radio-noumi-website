import React from "react";

const AdBanner = () => {
  return (
    <div className="w-full max-w-[450px] h-[130px] mx-auto mt-8 mb-6 px-4 sm:px-0">
      <div className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-lg shadow-lg flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm">
          {/* Falling Icons Animation */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Views Icons */}
            <div
              className="absolute animate-[fall_4s_linear_infinite] text-white/30 text-lg"
              style={{ left: "10%", animationDelay: "0s" }}
            >
              👁️
            </div>
            <div
              className="absolute animate-[fall_5s_linear_infinite] text-white/20 text-sm"
              style={{ left: "25%", animationDelay: "1s" }}
            >
              👁️
            </div>
            <div
              className="absolute animate-[fall_3.5s_linear_infinite] text-white/25 text-base"
              style={{ left: "45%", animationDelay: "2.5s" }}
            >
              👁️
            </div>
            <div
              className="absolute animate-[fall_4.5s_linear_infinite] text-white/30 text-lg"
              style={{ left: "70%", animationDelay: "0.5s" }}
            >
              👁️
            </div>
            <div
              className="absolute animate-[fall_6s_linear_infinite] text-white/20 text-sm"
              style={{ left: "85%", animationDelay: "3s" }}
            >
              👁️
            </div>

            {/* Heart Icons */}
            <div
              className="absolute animate-[fall_3s_linear_infinite] text-red-300/40 text-base"
              style={{ left: "15%", animationDelay: "1.5s" }}
            >
              ❤️
            </div>
            <div
              className="absolute animate-[fall_5.5s_linear_infinite] text-red-400/30 text-lg"
              style={{ left: "35%", animationDelay: "0.8s" }}
            >
              ❤️
            </div>
            <div
              className="absolute animate-[fall_4s_linear_infinite] text-red-300/35 text-sm"
              style={{ left: "60%", animationDelay: "2s" }}
            >
              ❤️
            </div>
            <div
              className="absolute animate-[fall_3.8s_linear_infinite] text-red-400/40 text-base"
              style={{ left: "80%", animationDelay: "0.3s" }}
            >
              ❤️
            </div>

            {/* Love Icons */}
            <div
              className="absolute animate-[fall_4.2s_linear_infinite] text-pink-300/40 text-base"
              style={{ left: "20%", animationDelay: "1.8s" }}
            >
              💕
            </div>
            <div
              className="absolute animate-[fall_5s_linear_infinite] text-pink-400/30 text-sm"
              style={{ left: "40%", animationDelay: "0.2s" }}
            >
              💕
            </div>
            <div
              className="absolute animate-[fall_3.3s_linear_infinite] text-pink-300/35 text-lg"
              style={{ left: "65%", animationDelay: "2.8s" }}
            >
              💕
            </div>
            <div
              className="absolute animate-[fall_4.8s_linear_infinite] text-pink-400/40 text-base"
              style={{ left: "90%", animationDelay: "1.2s" }}
            >
              💕
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <div className="text-sm sm:text-base font-semibold mb-1">
            🎵 Реклама
          </div>
          <div className="text-xs sm:text-sm opacity-90 mb-2">
            Ваша реклама здесь
          </div>
          <a
            href="https://wa.me/79049808275?text=Здравствуйте!%20Я%20хотел%20бы%20заказать%20рекламу%20на%20вашем%20Radio%20Noumi.%20Расскажите,%20пожалуйста,%20о%20стоимости%20и%20сроках%20размещения."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-full transition-colors"
          >
            📱 WhatsApp
          </a>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default AdBanner;
