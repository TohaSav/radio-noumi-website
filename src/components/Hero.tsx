import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Main title with gradient animation */}
        <div className="space-y-8">
          <div className="relative">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                RADIO
              </span>
            </h1>

            {/* Floating music notes */}
            <div className="absolute -top-8 left-1/4 text-4xl animate-bounce delay-300 opacity-40">
              🎵
            </div>
            <div className="absolute -top-12 right-1/3 text-3xl animate-bounce delay-700 opacity-30">
              🎶
            </div>
          </div>

          <p className="text-xl md:text-2xl font-light text-white/80 max-w-4xl mx-auto leading-relaxed">
            Лучшая музыка мира в прямом эфире
          </p>
        </div>

        {/* Live indicator and stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-2xl">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-bold text-lg">В ЭФИРЕ</span>
          </div>

          <div className="flex items-center gap-2 text-white/90">
            <Icon name="Users" size={24} />
            <span className="text-xl font-semibold">1,247 слушателей</span>
          </div>
        </div>

        {/* Genre tags */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {[
            "Поп",
            "Jazz",
            "Казахская",
            "Английская",
            "Русская",
            "Народная",
          ].map((genre) => (
            <span
              key={genre}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium hover:bg-white/20 transition-all cursor-pointer"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
