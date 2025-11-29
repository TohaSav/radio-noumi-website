import Icon from "@/components/ui/icon";
import { Wish } from "@/pages/WishTree";

interface WishTreeComponentProps {
  wishes: Wish[];
  onAddWish: (position: { x: number; y: number }) => void;
}

const WishTreeComponent = ({ wishes, onAddWish }: WishTreeComponentProps) => {
  // Позиции для кнопок + на ёлке (ветки)
  const branchPositions = [
    { x: 50, y: 20 },  // Верхушка
    { x: 35, y: 30 },  // Левая верхняя
    { x: 65, y: 30 },  // Правая верхняя
    { x: 30, y: 42 },  // Левая средняя-верхняя
    { x: 50, y: 42 },  // Центр средняя-верхняя
    { x: 70, y: 42 },  // Правая средняя-верхняя
    { x: 25, y: 54 },  // Левая средняя
    { x: 45, y: 54 },  // Центр-лево средняя
    { x: 55, y: 54 },  // Центр-право средняя
    { x: 75, y: 54 },  // Правая средняя
    { x: 20, y: 66 },  // Левая нижняя
    { x: 35, y: 66 },  // Левая-центр нижняя
    { x: 50, y: 66 },  // Центр нижняя
    { x: 65, y: 66 },  // Правая-центр нижняя
    { x: 80, y: 66 },  // Правая нижняя
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-end justify-center gap-8">
        {/* Дед Мороз */}
        <div className="relative animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <svg width="180" height="280" viewBox="0 0 180 280" className="drop-shadow-2xl">
            {/* Шуба */}
            <path d="M 90 80 L 60 120 L 50 180 L 50 250 L 130 250 L 130 180 L 120 120 Z" 
              fill="#dc2626" stroke="#991b1b" strokeWidth="2"/>
            
            {/* Мех на шубе */}
            <ellipse cx="90" cy="80" rx="35" ry="12" fill="#f3f4f6"/>
            <rect x="50" y="245" width="80" height="10" rx="3" fill="#f3f4f6"/>
            <line x1="90" y1="85" x2="90" y2="245" stroke="#f3f4f6" strokeWidth="15"/>
            
            {/* Голова */}
            <circle cx="90" cy="55" r="25" fill="#fde68a"/>
            
            {/* Шапка */}
            <path d="M 65 50 Q 65 30 90 30 Q 115 30 115 50" fill="#dc2626" stroke="#991b1b" strokeWidth="2"/>
            <ellipse cx="90" cy="50" rx="28" ry="8" fill="#f3f4f6"/>
            <circle cx="90" cy="28" r="6" fill="#f3f4f6"/>
            
            {/* Борода */}
            <path d="M 70 60 Q 90 75 110 60 L 110 65 Q 90 78 70 65 Z" fill="#f3f4f6"/>
            
            {/* Глаза */}
            <circle cx="82" cy="50" r="2" fill="#1f2937"/>
            <circle cx="98" cy="50" r="2" fill="#1f2937"/>
            
            {/* Нос */}
            <circle cx="90" cy="58" r="3" fill="#fca5a5"/>
            
            {/* Руки */}
            <ellipse cx="48" cy="140" rx="12" ry="35" fill="#dc2626" stroke="#991b1b" strokeWidth="2" transform="rotate(-20 48 140)"/>
            <ellipse cx="132" cy="140" rx="12" ry="35" fill="#dc2626" stroke="#991b1b" strokeWidth="2" transform="rotate(20 132 140)"/>
            
            {/* Варежки */}
            <circle cx="45" cy="175" r="10" fill="#f3f4f6"/>
            <circle cx="135" cy="175" r="10" fill="#f3f4f6"/>
            
            {/* Посох */}
            <line x1="140" y1="170" x2="165" y2="50" stroke="#8b4513" strokeWidth="5" strokeLinecap="round"/>
            <circle cx="165" cy="45" r="8" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2"/>
            
            {/* Блики на посохе */}
            <circle cx="167" cy="43" r="3" fill="#93c5fd" opacity="0.7"/>
          </svg>
        </div>

        {/* Ёлка с реалистичным дизайном */}
        <div className="relative w-full max-w-xl aspect-[3/4] max-h-[70vh] mx-auto">
          <svg
            viewBox="0 0 300 400"
            className="w-full h-full drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 40px rgba(34, 197, 94, 0.5))' }}
          >
            {/* Звезда на верхушке с эффектом свечения */}
            <defs>
              <radialGradient id="starGlow">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="1"/>
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5"/>
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <path
              d="M 150 8 L 156 26 L 175 26 L 160 38 L 166 56 L 150 44 L 134 56 L 140 38 L 125 26 L 144 26 Z"
              fill="url(#starGlow)"
              stroke="#f59e0b"
              strokeWidth="2"
              filter="url(#glow)"
              className="animate-pulse"
            />

            {/* Ствол */}
            <rect x="130" y="345" width="40" height="55" fill="#6b4423" stroke="#4a2c16" strokeWidth="2" rx="3"/>
            <rect x="135" y="348" width="30" height="48" fill="#8b5a3c" opacity="0.5"/>

            {/* Ёлка - многослойная с эффектом объема */}
            {/* Слой 1 - верхний */}
            <path
              d="M 150 35 L 100 95 L 115 95 L 85 135 L 215 135 L 185 95 L 200 95 Z"
              fill="#047857"
              stroke="#065f46"
              strokeWidth="2"
            />
            <path
              d="M 150 35 L 105 90 L 120 90 L 90 130 L 210 130 L 180 90 L 195 90 Z"
              fill="#059669"
              opacity="0.7"
            />
            
            {/* Слой 2 - средний */}
            <path
              d="M 150 115 L 90 185 L 110 185 L 75 235 L 225 235 L 190 185 L 210 185 Z"
              fill="#047857"
              stroke="#065f46"
              strokeWidth="2"
            />
            <path
              d="M 150 115 L 95 180 L 115 180 L 80 230 L 220 230 L 185 180 L 205 180 Z"
              fill="#059669"
              opacity="0.7"
            />
            
            {/* Слой 3 - нижний */}
            <path
              d="M 150 215 L 70 295 L 95 295 L 55 345 L 245 345 L 205 295 L 230 295 Z"
              fill="#047857"
              stroke="#065f46"
              strokeWidth="2"
            />
            <path
              d="M 150 215 L 75 290 L 100 290 L 60 340 L 240 340 L 200 290 L 225 290 Z"
              fill="#059669"
              opacity="0.7"
            />

            {/* Гирлянды - улучшенные */}
            {[...Array(30)].map((_, i) => {
              const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];
              const row = Math.floor(i / 6);
              const col = i % 6;
              return (
                <g key={i}>
                  <circle
                    cx={90 + col * 20}
                    cy={80 + row * 50}
                    r="5"
                    fill={colors[i % colors.length]}
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.15}s`, animationDuration: '2s' }}
                    opacity="0.9"
                  />
                  <circle
                    cx={90 + col * 20}
                    cy={80 + row * 50}
                    r="3"
                    fill="white"
                    opacity="0.6"
                  />
                </g>
              );
            })}
            
            {/* Снег на ветках */}
            {[...Array(15)].map((_, i) => (
              <ellipse
                key={`snow-${i}`}
                cx={70 + i * 15}
                cy={95 + (i % 3) * 80}
                rx="8"
                ry="4"
                fill="white"
                opacity="0.8"
              />
            ))}
          </svg>

          {/* Кнопки + на ветках */}
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 via-red-500 to-red-700 border-3 border-yellow-400 shadow-xl animate-pulse cursor-pointer relative">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-3 bg-yellow-600 rounded-t"></div>
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/40 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      {wishes.find(w => w.position.x === pos.x && w.position.y === pos.y)?.name}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddWish(pos)}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white hover:bg-white/30 hover:scale-125 transition-all shadow-lg hover:shadow-white/50"
                  >
                    <Icon name="Plus" size={22} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Снегурочка */}
        <div className="relative animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <svg width="180" height="280" viewBox="0 0 180 280" className="drop-shadow-2xl">
            {/* Шубка */}
            <path d="M 90 80 L 60 120 L 50 180 L 50 250 L 130 250 L 130 180 L 120 120 Z" 
              fill="#60a5fa" stroke="#3b82f6" strokeWidth="2"/>
            
            {/* Мех на шубке */}
            <ellipse cx="90" cy="80" rx="35" ry="12" fill="#f3f4f6"/>
            <rect x="50" y="245" width="80" height="10" rx="3" fill="#f3f4f6"/>
            <line x1="90" y1="85" x2="90" y2="245" stroke="#f3f4f6" strokeWidth="15"/>
            
            {/* Голова */}
            <circle cx="90" cy="55" r="25" fill="#fde68a"/>
            
            {/* Кокошник */}
            <path d="M 65 45 Q 65 25 90 20 Q 115 25 115 45" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2"/>
            <path d="M 70 40 Q 80 28 90 26 Q 100 28 110 40" fill="#93c5fd"/>
            {/* Снежинки на кокошнике */}
            <circle cx="80" cy="32" r="2" fill="white"/>
            <circle cx="90" cy="28" r="2" fill="white"/>
            <circle cx="100" cy="32" r="2" fill="white"/>
            
            {/* Коса */}
            <path d="M 115 55 Q 125 80 130 120 Q 128 140 125 160" 
              stroke="#fbbf24" strokeWidth="12" fill="none" strokeLinecap="round"/>
            <ellipse cx="125" cy="165" rx="6" ry="10" fill="#fbbf24"/>
            
            {/* Бант на косе */}
            <circle cx="125" cy="170" r="5" fill="#ef4444"/>
            
            {/* Глаза */}
            <circle cx="82" cy="50" r="2" fill="#1f2937"/>
            <circle cx="98" cy="50" r="2" fill="#1f2937"/>
            
            {/* Нос */}
            <circle cx="90" cy="58" r="2" fill="#fca5a5"/>
            
            {/* Улыбка */}
            <path d="M 82 63 Q 90 67 98 63" stroke="#f87171" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            
            {/* Румянец */}
            <circle cx="75" cy="60" r="5" fill="#fca5a5" opacity="0.4"/>
            <circle cx="105" cy="60" r="5" fill="#fca5a5" opacity="0.4"/>
            
            {/* Руки */}
            <ellipse cx="48" cy="140" rx="12" ry="35" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2" transform="rotate(-20 48 140)"/>
            <ellipse cx="132" cy="140" rx="12" ry="35" fill="#60a5fa" stroke="#3b82f6" strokeWidth="2" transform="rotate(20 132 140)"/>
            
            {/* Варежки */}
            <circle cx="45" cy="175" r="10" fill="#f3f4f6"/>
            <circle cx="135" cy="175" r="10" fill="#f3f4f6"/>
            
            {/* Снежинки вокруг */}
            <text x="20" y="100" fontSize="16" fill="#93c5fd" opacity="0.7">❄</text>
            <text x="150" y="120" fontSize="16" fill="#93c5fd" opacity="0.7">❄</text>
          </svg>
        </div>
      </div>

      {/* Информация о желаниях */}
      <div className="mt-8 text-center">
        <p className="text-white/80 text-lg">
          🎁 Повешено желаний: <span className="font-bold text-2xl text-yellow-300">{wishes.length}</span> / {branchPositions.length}
        </p>
      </div>
    </div>
  );
};

export default WishTreeComponent;
