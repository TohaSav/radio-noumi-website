import { Wish } from "@/pages/WishTree";

interface WishTreeComponentProps {
  wishes: Wish[];
  onAddWish: (position: { x: number; y: number }) => void;
  canAddWish: boolean;
}

const WishTreeComponent = ({ wishes, onAddWish, canAddWish }: WishTreeComponentProps) => {
  const branchPositions = [
    { x: 12, y: 12 },
    { x: 28, y: 18 },
    { x: 50, y: 10 },
    { x: 72, y: 18 },
    { x: 88, y: 12 },
    
    { x: 8, y: 28 },
    { x: 25, y: 35 },
    { x: 42, y: 30 },
    { x: 58, y: 30 },
    { x: 75, y: 35 },
    { x: 92, y: 28 },
    
    { x: 15, y: 50 },
    { x: 32, y: 48 },
    { x: 50, y: 52 },
    { x: 68, y: 48 },
    { x: 85, y: 50 },
    { x: 50, y: 42 },
    
    { x: 20, y: 68 },
    { x: 38, y: 65 },
    { x: 50, y: 70 },
    { x: 62, y: 65 },
    { x: 80, y: 68 },
    
    { x: 50, y: 85 },
  ];

  const ornamentColors = [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600',
    'from-yellow-300 to-yellow-500',
    'from-purple-400 to-purple-600',
    'from-green-400 to-green-600',
    'from-pink-400 to-pink-600',
    'from-orange-400 to-orange-600',
  ];

  return (
    <div className="w-full h-full min-h-[calc(100vh-80px)] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
        
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

        {[...Array(50)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center p-2 sm:p-4 md:p-8">
        <div className="relative w-full max-w-6xl h-full max-h-[85vh] sm:max-h-[80vh]">
          <svg className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] pointer-events-none z-40" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))' }}>
            <defs>
              <filter id="mega-glow">
                <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path d="M 40,40 Q 80,20 120,40 T 200,40 T 280,40 T 360,40 T 440,40 T 520,40 T 600,40 T 680,40 T 760,40 T 840,40 T 920,40 T 1000,40 T 1080,40 T 1160,40 T 1240,40" 
              stroke="#1a5c3a" strokeWidth="4" fill="none" opacity="0.8"/>
            {[...Array(25)].map((_, i) => {
              const colors = ['#ff0000', '#ffd700', '#00ff00', '#0080ff', '#ff00ff', '#ff8000', '#00ffff'];
              const x = i * 50 + 60;
              const y = i % 2 === 0 ? 30 : 50;
              return (
                <g key={`top-bulb-${i}`}>
                  <line x1={x} y1={y} x2={x} y2={y + 12} stroke="#2d5c3a" strokeWidth="2"/>
                  <circle cx={x} cy={y + 18} r="10" fill={colors[i % colors.length]} 
                    className="animate-blink" filter="url(#mega-glow)"
                    style={{ animationDelay: `${i * 0.08}s` }}/>
                  <ellipse cx={x} cy={y + 15} rx="6" ry="4" fill="white" opacity="0.6"/>
                  <circle cx={x - 2} cy={y + 13} r="2" fill="white" opacity="0.9"/>
                </g>
              );
            })}
            
            <path d="M 40,98% Q 80,96% 120,98% T 200,98% T 280,98% T 360,98% T 440,98% T 520,98% T 600,98% T 680,98% T 760,98% T 840,98% T 920,98% T 1000,98% T 1080,98% T 1160,98% T 1240,98%" 
              stroke="#1a5c3a" strokeWidth="4" fill="none" opacity="0.8"/>
            {[...Array(25)].map((_, i) => {
              const colors = ['#00ffff', '#ff00ff', '#ff0000', '#ffd700', '#00ff00', '#0080ff', '#ff8000'];
              const x = i * 50 + 60;
              return (
                <g key={`bottom-bulb-${i}`}>
                  <line x1={x} y1="98%" x2={x} y2="calc(98% - 12px)" stroke="#2d5c3a" strokeWidth="2"/>
                  <circle cx={x} cy="calc(98% - 18px)" r="10" fill={colors[i % colors.length]} 
                    className="animate-blink" filter="url(#mega-glow)"
                    style={{ animationDelay: `${i * 0.08 + 0.5}s` }}/>
                  <ellipse cx={x} cy="calc(98% - 21px)" rx="6" ry="4" fill="white" opacity="0.6"/>
                  <circle cx={x - 2} cy="calc(98% - 23px)" r="2" fill="white" opacity="0.9"/>
                </g>
              );
            })}

            <path d="M 20,60 Q 10,120 20,180 T 20,300 T 20,420 T 20,540 T 20,660 T 20,780" 
              stroke="#1a5c3a" strokeWidth="4" fill="none" opacity="0.8"/>
            {[...Array(15)].map((_, i) => {
              const colors = ['#ff0000', '#0080ff', '#ffd700', '#00ff00', '#ff00ff'];
              const y = i * 50 + 80;
              return (
                <g key={`left-bulb-${i}`}>
                  <line x1="20" y1={y} x2="32" y2={y} stroke="#2d5c3a" strokeWidth="2"/>
                  <circle cx="38" cy={y} r="10" fill={colors[i % colors.length]} 
                    className="animate-blink" filter="url(#mega-glow)"
                    style={{ animationDelay: `${i * 0.1}s` }}/>
                  <ellipse cx="38" cy={y - 3} rx="6" ry="4" fill="white" opacity="0.6"/>
                  <circle cx="36" cy={y - 5} r="2" fill="white" opacity="0.9"/>
                </g>
              );
            })}

            <path d="M 98%,60 Q 99%,120 98%,180 T 98%,300 T 98%,420 T 98%,540 T 98%,660 T 98%,780" 
              stroke="#1a5c3a" strokeWidth="4" fill="none" opacity="0.8"/>
            {[...Array(15)].map((_, i) => {
              const colors = ['#00ff00', '#ff00ff', '#ff0000', '#ffd700', '#0080ff'];
              const y = i * 50 + 80;
              return (
                <g key={`right-bulb-${i}`}>
                  <line x1="98%" y1={y} x2="calc(98% - 12px)" y2={y} stroke="#2d5c3a" strokeWidth="2"/>
                  <circle cx="calc(98% - 18px)" cy={y} r="10" fill={colors[i % colors.length]} 
                    className="animate-blink" filter="url(#mega-glow)"
                    style={{ animationDelay: `${i * 0.1 + 0.3}s` }}/>
                  <ellipse cx="calc(98% - 18px)" cy={y - 3} rx="6" ry="4" fill="white" opacity="0.6"/>
                  <circle cx="calc(98% - 20px)" cy={y - 5} r="2" fill="white" opacity="0.9"/>
                </g>
              );
            })}
          </svg>

          <div className="absolute -inset-2 rounded-3xl overflow-hidden pointer-events-none z-30">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-yellow-300/20 via-yellow-400/10 to-transparent">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,215,0,0.3),rgba(255,215,0,0.3)_2px,transparent_2px,transparent_6px)] animate-tinsel-shimmer"></div>
              {[...Array(40)].map((_, i) => (
                <div key={`tinsel-strand-top-${i}`} 
                  className="absolute w-0.5 h-20 bg-gradient-to-b from-yellow-200 via-yellow-300 to-transparent opacity-70"
                  style={{ 
                    left: `${i * 2.5}%`,
                    transform: `rotate(${Math.sin(i * 0.5) * 20}deg)`,
                    animationDelay: `${i * 0.05}s`
                  }}>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-red-400/20 via-red-300/10 to-transparent">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgba(255,0,0,0.3),rgba(255,0,0,0.3)_2px,transparent_2px,transparent_6px)] animate-tinsel-shimmer"></div>
              {[...Array(40)].map((_, i) => (
                <div key={`tinsel-strand-bottom-${i}`} 
                  className="absolute w-0.5 h-20 bg-gradient-to-t from-red-300 via-red-200 to-transparent opacity-70"
                  style={{ 
                    left: `${i * 2.5}%`,
                    bottom: 0,
                    transform: `rotate(${Math.sin(i * 0.5) * 20}deg)`,
                    animationDelay: `${i * 0.05}s`
                  }}>
                </div>
              ))}
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-blue-400/20 via-blue-300/10 to-transparent">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(59,130,246,0.3),rgba(59,130,246,0.3)_2px,transparent_2px,transparent_6px)] animate-tinsel-shimmer"></div>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-green-400/20 via-green-300/10 to-transparent">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(34,197,94,0.3),rgba(34,197,94,0.3)_2px,transparent_2px,transparent_6px)] animate-tinsel-shimmer"></div>
            </div>
          </div>

          <div className="absolute inset-0 border-4 border-white/30 rounded-3xl backdrop-blur-md bg-gradient-to-br from-white/10 via-white/5 to-transparent shadow-[0_0_50px_rgba(255,255,255,0.3)]"></div>
          
          <div className="relative w-full h-full p-4 sm:p-6 md:p-8">
            {branchPositions.map((pos, index) => {
              const wishAtPosition = wishes.find(w => w.position.x === pos.x && w.position.y === pos.y);
              const isOccupied = !!wishAtPosition;
              
              return (
                <div
                  key={`position-${index}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                >
                  {isOccupied ? (
                    <div className="relative group cursor-pointer">
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${ornamentColors[index % ornamentColors.length]} shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-110 animate-ornament-swing border-4 border-white/30`}
                        style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="absolute inset-2 rounded-full bg-white/20"></div>
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-md"></div>
                        <span className="text-white text-xs sm:text-sm font-bold drop-shadow-lg z-10">{wishAtPosition.name}</span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent"></div>
                      </div>
                      
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-50 animate-fadeIn">
                        <div className="bg-gradient-to-br from-red-600 to-green-600 text-white px-4 py-3 rounded-2xl shadow-2xl text-sm whitespace-nowrap border-2 border-white/50 backdrop-blur-sm min-w-[200px]">
                          <div className="font-bold mb-1 text-yellow-200">🎁 {wishAtPosition.name}</div>
                          <div className="text-xs opacity-90">{wishAtPosition.wish}</div>
                          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-green-600"></div>
                        </div>
                      </div>
                    </div>
                  ) : canAddWish ? (
                    <button
                      onClick={() => onAddWish(pos)}
                      className="group relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 hover:from-yellow-400 hover:via-orange-500 hover:to-red-500 shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center hover:scale-125 hover:rotate-90 border-4 border-white/50 backdrop-blur-sm animate-pulse-glow"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 rounded-full animate-ping-slow bg-white/20"></div>
                      <span className="text-white text-3xl sm:text-4xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-transform group-hover:scale-110">+</span>
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"></div>
                    </button>
                  ) : (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 opacity-50 shadow-lg flex items-center justify-center border-4 border-white/20">
                      <span className="text-white text-2xl">✨</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 via-green-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl text-sm sm:text-base md:text-lg font-bold border-4 border-white/50 backdrop-blur-md whitespace-nowrap z-50">
            🎁 Повешено желаний: {wishes.length} / {branchPositions.length}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; filter: brightness(1.5); }
          50% { opacity: 0.4; filter: brightness(0.8); }
        }
        .animate-blink {
          animation: blink 1.2s ease-in-out infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-sparkle {
          animation: sparkle ease-in-out infinite;
        }
        
        @keyframes ornament-swing {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-ornament-swing {
          animation: ornament-swing 3s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,215,0,0.3); }
          50% { box-shadow: 0 0 30px rgba(255,255,255,0.8), 0 0 60px rgba(255,215,0,0.6); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes tinsel-shimmer {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .animate-tinsel-shimmer {
          animation: tinsel-shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WishTreeComponent;
