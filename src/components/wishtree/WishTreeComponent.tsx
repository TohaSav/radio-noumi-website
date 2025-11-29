import { Wish } from "@/pages/WishTree";
import ChristmasTree from "./ChristmasTree";

interface WishTreeComponentProps {
  wishes: Wish[];
  onAddWish: (position: { x: number; y: number }) => void;
}

const WishTreeComponent = ({ wishes, onAddWish }: WishTreeComponentProps) => {
  const branchPositions = [
    { x: 50, y: 20 },
    { x: 35, y: 30 },
    { x: 65, y: 30 },
    { x: 30, y: 42 },
    { x: 50, y: 42 },
    { x: 70, y: 42 },
    { x: 25, y: 54 },
    { x: 45, y: 54 },
    { x: 55, y: 54 },
    { x: 75, y: 54 },
    { x: 20, y: 66 },
    { x: 35, y: 66 },
    { x: 50, y: 66 },
    { x: 65, y: 66 },
    { x: 80, y: 66 },
  ];

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {/* Ёлочный фон с узорами */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
        {/* Декоративные круги-шары */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Ёлочные ветки узором */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <pattern id="tree-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 100 20 L 80 60 L 90 60 L 70 100 L 130 100 L 110 60 L 120 60 Z" fill="currentColor" className="text-green-300"/>
            <circle cx="85" cy="70" r="4" fill="currentColor" className="text-red-400"/>
            <circle cx="115" cy="70" r="4" fill="currentColor" className="text-yellow-400"/>
            <circle cx="100" cy="90" r="4" fill="currentColor" className="text-blue-400"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#tree-pattern)"/>
        </svg>

        {/* Падающие снежинки */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`snow-${i}`}
            className="absolute text-white/40 animate-snow text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 100}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 6}s`
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Контейнер с кнопками + */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
        <div className="relative w-full max-w-6xl h-full max-h-[80vh]">
          {/* Декоративная рамка */}
          <div className="absolute inset-0 border-4 border-white/20 rounded-3xl backdrop-blur-sm bg-white/5 shadow-2xl"></div>
          
          {/* Кнопки желаний */}
          {branchPositions.map((pos, index) => {
            const hasWish = wishes.some(w => w.position.x === pos.x && w.position.y === pos.y);
            
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                {hasWish ? (
                  <div className="relative group">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 via-red-500 to-red-600 border-4 border-yellow-400 shadow-2xl cursor-pointer animate-pulse hover:scale-110 transition-transform">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-5 bg-yellow-600 rounded-t"></div>
                      <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/60 to-transparent"></div>
                      <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.6)]"></div>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-black/90 text-white text-sm rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl border border-white/20">
                      {wishes.find(w => w.position.x === pos.x && w.position.y === pos.y)?.name}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddWish(pos)}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md border-3 border-white/50 flex items-center justify-center text-white text-3xl font-bold hover:from-white/50 hover:to-white/20 hover:scale-125 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all duration-300 shadow-xl"
                  >
                    +
                  </button>
                )}
              </div>
            );
          })}

          {/* Счётчик желаний */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 px-8 py-4 bg-gradient-to-r from-green-600/80 to-emerald-600/80 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-white/30">
            <p className="text-white text-xl font-bold text-center">
              🎁 Повешено желаний: <span className="text-yellow-300 text-3xl">{wishes.length}</span> / {branchPositions.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishTreeComponent;