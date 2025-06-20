import { useEffect, useState } from "react";

const WaveVisualizer = () => {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    const generateBars = () => {
      const newBars = Array.from(
        { length: 50 },
        () => Math.random() * 100 + 20,
      );
      setBars(newBars);
    };

    generateBars();
    const interval = setInterval(generateBars, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Сейчас в эфире
          </h3>
          <p className="text-xl text-white/80">
            🎵 Naturalize & Second Sun - 3am
          </p>
        </div>

        {/* Wave visualizer */}
        <div className="flex items-end justify-center gap-1 h-32 mb-12">
          {bars.map((height, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-purple-600 via-pink-500 to-indigo-400 rounded-full transition-all duration-150 ease-out"
              style={{
                height: `${height}px`,
                width: "4px",
                animationDelay: `${index * 0.05}s`,
              }}
            />
          ))}
        </div>

        {/* Radio info cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
            <div className="text-3xl mb-3">🌍</div>
            <h4 className="text-white font-semibold text-lg mb-2">
              Мировая музыка
            </h4>
            <p className="text-white/70">Лучшие треки со всего мира</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
            <div className="text-3xl mb-3">📻</div>
            <h4 className="text-white font-semibold text-lg mb-2">24/7 эфир</h4>
            <p className="text-white/70">Музыка без перерывов</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
            <div className="text-3xl mb-3">🎧</div>
            <h4 className="text-white font-semibold text-lg mb-2">
              HD качество
            </h4>
            <p className="text-white/70">Кристально чистый звук</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaveVisualizer;
