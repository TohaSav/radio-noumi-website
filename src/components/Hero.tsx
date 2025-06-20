import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import AdBanner from "@/components/AdBanner";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4">
      {/* Hero Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse bg-[length:400%_400%] animate-[shimmer_3s_ease-in-out_infinite]">
            Noumi
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
          Музыка, что вдохновляет жить
        </p>

        <AdBanner />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute top-1/2 right-8 w-3 h-3 bg-indigo-400 rounded-full animate-pulse opacity-50 delay-500"></div>
    </section>
  );
};

export default Hero;
