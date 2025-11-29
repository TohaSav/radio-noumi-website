import { Wish } from "@/pages/WishTree";
import ChristmasTree from "./ChristmasTree";

interface WishTreeComponentProps {
  wishes: Wish[];
  onAddWish: (position: { x: number; y: number }) => void;
}

const WishTreeComponent = ({ wishes, onAddWish }: WishTreeComponentProps) => {
  const branchPositions = [
    { x: 15, y: 15 },
    { x: 30, y: 15 },
    { x: 50, y: 15 },
    { x: 70, y: 15 },
    { x: 85, y: 15 },
    { x: 20, y: 30 },
    { x: 40, y: 30 },
    { x: 60, y: 30 },
    { x: 80, y: 30 },
    { x: 15, y: 45 },
    { x: 35, y: 45 },
    { x: 50, y: 45 },
    { x: 65, y: 45 },
    { x: 85, y: 45 },
    { x: 25, y: 60 },
    { x: 45, y: 60 },
    { x: 55, y: 60 },
    { x: 75, y: 60 },
    { x: 20, y: 75 },
    { x: 35, y: 75 },
    { x: 50, y: 75 },
    { x: 65, y: 75 },
    { x: 80, y: 75 },
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
          {/* Новогодняя гирлянда по периметру */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Провод гирлянды */}
            <path d="M 0,20 Q 25,10 50,20 T 100,20 T 150,20 T 200,20 T 250,20 T 300,20 T 350,20 T 400,20 T 450,20 T 500,20 T 550,20 T 600,20 T 650,20 T 700,20 T 750,20 T 800,20" 
              stroke="#1e3a1a" strokeWidth="3" fill="none" className="opacity-60"/>
            {/* Лампочки сверху */}
            {[...Array(20)].map((_, i) => {
              const colors = ['#ef4444', '#fbbf24', '#3b82f6', '#a855f7', '#10b981', '#ec4899'];
              const x = (i * 5) + 2.5;
              return (
                <g key={`top-${i}`}>
                  <circle cx={`${x}%`} cy="20" r="6" fill={colors[i % colors.length]} 
                    className="animate-pulse" filter="url(#glow)"
                    style={{ animationDelay: `${i * 0.15}s`, animationDuration: '1.5s' }}/>
                  <circle cx={`${x}%`} cy="17" r="2" fill="white" opacity="0.8"/>
                </g>
              );
            })}
            {/* Провод снизу */}
            <path d="M 0,98% Q 25,96% 50,98% T 100,98% T 150,98% T 200,98% T 250,98% T 300,98% T 350,98% T 400,98% T 450,98% T 500,98% T 550,98% T 600,98% T 650,98% T 700,98% T 750,98% T 800,98%" 
              stroke="#1e3a1a" strokeWidth="3" fill="none" className="opacity-60"/>
            {/* Лампочки снизу */}
            {[...Array(20)].map((_, i) => {
              const colors = ['#10b981', '#ec4899', '#ef4444', '#fbbf24', '#3b82f6', '#a855f7'];
              const x = (i * 5) + 2.5;
              return (
                <g key={`bottom-${i}`}>
                  <circle cx={`${x}%`} cy="98%" r="6" fill={colors[i % colors.length]} 
                    className="animate-pulse" filter="url(#glow)"
                    style={{ animationDelay: `${i * 0.15 + 0.75}s`, animationDuration: '1.5s' }}/>
                  <circle cx={`${x}%`} cy="calc(98% - 3px)" r="2" fill="white" opacity="0.8"/>
                </g>
              );
            })}
          </svg>

          {/* Мишура по периметру */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
            {/* Верхняя мишура */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-yellow-400/30 via-yellow-300/20 to-transparent">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(255,215,0,0.3)_10px,rgba(255,215,0,0.3)_20px)] animate-pulse"></div>
              {[...Array(30)].map((_, i) => (
                <div key={`tinsel-top-${i}`} 
                  className="absolute w-1 bg-gradient-to-b from-yellow-300 to-transparent opacity-60"
                  style={{ 
                    left: `${i * 3.33}%`, 
                    height: '40px',
                    animationDelay: `${i * 0.1}s`,
                    transform: `rotate(${Math.sin(i) * 15}deg)`
                  }}>
                </div>
              ))}
            </div>
            
            {/* Нижняя мишура */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gold-400/30 via-gold-300/20 to-transparent">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_10px,rgba(255,215,0,0.3)_10px,rgba(255,215,0,0.3)_20px)] animate-pulse"></div>
              {[...Array(30)].map((_, i) => (
                <div key={`tinsel-bottom-${i}`} 
                  className="absolute w-1 bg-gradient-to-t from-yellow-300 to-transparent opacity-60"
                  style={{ 
                    left: `${i * 3.33}%`, 
                    height: '40px',
                    bottom: 0,
                    animationDelay: `${i * 0.1}s`,
                    transform: `rotate(${Math.sin(i) * 15}deg)`
                  }}>
                </div>
              ))}
            </div>

            {/* Левая мишура */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-red-400/30 via-red-300/20 to-transparent">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_10px,rgba(239,68,68,0.3)_10px,rgba(239,68,68,0.3)_20px)] animate-pulse"></div>
            </div>

            {/* Правая мишура */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-blue-400/30 via-blue-300/20 to-transparent">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_10px,rgba(59,130,246,0.3)_10px,rgba(59,130,246,0.3)_20px)] animate-pulse"></div>
            </div>
          </div>

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
                    className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 hover:from-yellow-300 hover:via-amber-400 hover:to-orange-400 border-4 border-white shadow-2xl hover:shadow-[0_0_40px_rgba(251,191,36,0.8)] transition-all duration-300 hover:scale-125 animate-pulse"
                    style={{ animationDuration: '2s', animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent"></div>
                    <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-yellow-300"></div>
                    <span className="relative text-white text-4xl font-bold drop-shadow-lg">+</span>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce" style={{ animationDelay: `${index * 0.15}s` }}></div>
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}></div>
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