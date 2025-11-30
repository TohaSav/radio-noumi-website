import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import EmbeddedRadioPlayer from "@/components/EmbeddedRadioPlayer";

import LikesSection from "@/components/hero/LikesSection";
import TopChart from "@/components/hero/TopChart";
import { useTopChart } from "@/hooks/useTopChart";
import { useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(250740000000);
  const [pulse, setPulse] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [showTopChart, setShowTopChart] = useState(false);

  // Используем хук для топ чарта
  const {
    topChartSongs,
    songLikes,
    handleSongAction,
    bestTrackIndex,
    worstTrackIndex
  } = useTopChart();

  return (
    <section className="relative min-h-screen flex items-start justify-center text-center px-4 pt-4">
      {/* Hero Content */}
      <div className="max-w-4xl mx-auto space-y-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <EmbeddedRadioPlayer streamUrl="https://myradio24.org/61673" />

        {/* Лайки с сердечком */}
        <LikesSection
          likes={likes}
          setLikes={setLikes}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          pulse={pulse}
          setPulse={setPulse}
          hearts={hearts}
          setHearts={setHearts}
        />

        <p className="text-xl md:text-2xl text-slate-300/80 max-w-2xl mx-auto leading-relaxed font-light">
          Музыка, что вдохновляет жить
        </p>
      </div>

      {/* Кнопки навигации */}
      <div className="absolute top-6 right-6 flex gap-3 z-20">
        <button
          onClick={() => setShowTopChart(true)}
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-500 hover:scale-110 shadow-xl hover:shadow-purple-500/50 opacity-0 animate-fade-in backdrop-blur-sm border border-white/10" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          🎵 Топ Чарт
        </button>
        
        <button
          onClick={() => navigate('/wish-tree')}
          className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-500 hover:scale-110 shadow-xl hover:shadow-green-500/50 opacity-0 animate-fade-in backdrop-blur-sm border border-white/10" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          🎄 Ёлка желаний
        </button>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse opacity-0 blur-sm" style={{ animationDelay: '0.5s', animationFillMode: 'forwards', opacity: '0.5' }}></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-0 blur-sm" style={{ animationDelay: '0.7s', animationFillMode: 'forwards', opacity: '0.4' }}></div>
      <div className="absolute top-1/2 right-8 w-3 h-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full animate-pulse opacity-0 blur-sm" style={{ animationDelay: '0.6s', animationFillMode: 'forwards', opacity: '0.45' }}></div>

      {/* Модальное окно Топ Чарт */}
      <TopChart
        showTopChart={showTopChart}
        setShowTopChart={setShowTopChart}
        topChartSongs={topChartSongs}
        songLikes={songLikes}
        handleSongAction={handleSongAction}
        bestTrackIndex={bestTrackIndex}
        worstTrackIndex={worstTrackIndex}
      />
    </section>
  );
};

export default Hero;