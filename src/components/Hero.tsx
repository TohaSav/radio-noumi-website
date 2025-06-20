import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Главный заголовок с анимацией */}
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse bg-[length:200%_200%]">
              Radio Noumi
            </span>
          </h1>

          <div className="relative">
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/90 leading-relaxed">
              🎵 Поп • Jazz • Казахская • Китайская • Английская • Русская
              Народная 🎶
            </p>

            {/* Анимированные волны звука */}
            <div className="flex justify-center items-center mt-6 space-x-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 30 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "1.5s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <PremiumButton />
        </div>

        {/* Статистика в реальном времени */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-2xl mx-auto">
          <StatCard icon="Users" value="1,247" label="Слушателей" />
          <StatCard icon="Music" value="24/7" label="В эфире" />
          <StatCard icon="Globe" value="15+" label="Стран" />
          <StatCard icon="Heart" value="∞" label="Любви" />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105">
      <Icon
        name={icon as any}
        className="w-6 h-6 mx-auto mb-2 text-purple-300"
      />
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
};

export default Hero;
