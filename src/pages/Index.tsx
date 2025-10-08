import { useState } from "react";
import RadioPlayer from "@/components/RadioPlayer";
import Hero from "@/components/Hero";
import WaveVisualizer from "@/components/WaveVisualizer";
import BackgroundWaves from "@/components/BackgroundWaves";
import AdBanner from "@/components/AdBanner";

const Index = () => {
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);
  const [audioData, setAudioData] = useState<
    { bass: number; mid: number; treble: number; overall: number } | undefined
  >();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Modern gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/15 to-cyan-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/10 to-violet-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]"></div>

      {/* Background waves controlled by radio */}
      <BackgroundWaves isActive={isRadioPlaying} audioData={audioData} />

      <div className="relative z-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <AdBanner />
        <Hero />
      </div>

      <RadioPlayer
        streamUrl="https://myradio24.org/61673"
        onPlayingChange={setIsRadioPlaying}
        onAudioData={setAudioData}
      />
    </div>
  );
};

export default Index;