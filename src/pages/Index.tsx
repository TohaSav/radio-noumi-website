import { useState } from "react";
import RadioPlayer from "@/components/RadioPlayer";
import Hero from "@/components/Hero";
import WaveVisualizer from "@/components/WaveVisualizer";
import BackgroundWaves from "@/components/BackgroundWaves";

const Index = () => {
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/2 w-60 h-60 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Background waves controlled by radio */}
      <BackgroundWaves isActive={isRadioPlaying} />

      <div className="relative z-10">
        <Hero />
        <WaveVisualizer />
      </div>

      <RadioPlayer
        streamUrl="https://myradio24.org/61673"
        onPlayingChange={setIsRadioPlaying}
      />
    </div>
  );
};

export default Index;
