import RadioPlayer from "@/components/RadioPlayer";
import Hero from "@/components/Hero";
import WaveVisualizer from "@/components/WaveVisualizer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background particles - адаптивные размеры */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 sm:-top-30 sm:-left-30 md:-top-40 md:-left-40 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 sm:-bottom-30 sm:-right-30 md:-bottom-40 md:-right-40 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 w-30 h-30 sm:w-45 sm:h-45 md:w-60 md:h-60 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <Hero />
        <WaveVisualizer />
      </div>

      <RadioPlayer streamUrl="https://myradio24.org/61673" />
    </div>
  );
};

export default Index;
