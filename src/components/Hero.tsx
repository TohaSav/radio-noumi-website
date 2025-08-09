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
  const [likes, setLikes] = useState(985235210);
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
      <div className="max-w-4xl mx-auto space-y-4">
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

        <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
          Музыка, что вдохновляет жить
        </p>
      </div>

      {/* Кнопка Топ Чарт */}
      <button
        onClick={() => setShowTopChart(true)}
        className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg z-20"
      >
        🎵 Топ Чарт
      </button>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-32 left-16 w-6 h-6 bg-pink-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute top-1/2 right-8 w-3 h-3 bg-indigo-400 rounded-full animate-pulse opacity-50 delay-500"></div>

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