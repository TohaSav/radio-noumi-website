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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"></div>

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
    <div className="group relative bg-gradient-to-br from-white/20 via-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 text-center hover:from-white/30 hover:via-purple-500/30 hover:to-pink-500/30 transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

      {/* Музыкальные волны вокруг иконки */}
      <div className="relative mb-4">
        <div className="absolute -inset-4 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-12 h-12 border-2 border-purple-400/30 rounded-full animate-ping"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
        <Icon
          name={icon as any}
          className="relative z-10 w-8 h-8 mx-auto text-white group-hover:text-purple-300 transition-colors duration-300 drop-shadow-lg animate-pulse"
        />
      </div>

      {/* Значение с пульсацией */}
      <div className="relative">
        <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300 animate-pulse">
          {value}
        </div>
        <div className="text-sm text-white/80 group-hover:text-white transition-colors duration-300 font-medium tracking-wide">
          {label}
        </div>
      </div>

      {/* Звуковые волны по краям */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full mb-1 animate-pulse"
            style={{
              height: `${Math.random() * 12 + 4}px`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.2s",
            }}
          />
        ))}
      </div>

      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 bg-gradient-to-t from-pink-500 to-purple-500 rounded-full mb-1 animate-pulse"
            style={{
              height: `${Math.random() * 12 + 4}px`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "1.4s",
            }}
          />
        ))}
      </div>

      {/* Блеск при наведении */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -skew-x-12 group-hover:translate-x-full"
        style={{ animationDelay: "0.3s" }}
      />
    </div>
  );
};

export default Hero;
