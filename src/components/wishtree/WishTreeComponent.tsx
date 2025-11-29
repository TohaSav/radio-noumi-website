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
        {/* Дед Мороз - фотореалистичный */}
        <div className="relative animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <svg width="220" height="350" viewBox="0 0 220 350" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="redCoat" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b91c1c"/>
                <stop offset="40%" stopColor="#dc2626"/>
                <stop offset="100%" stopColor="#7f1d1d"/>
              </linearGradient>
              <linearGradient id="goldPattern" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b"/>
                <stop offset="50%" stopColor="#fbbf24"/>
                <stop offset="100%" stopColor="#f59e0b"/>
              </linearGradient>
              <radialGradient id="whiteFur">
                <stop offset="0%" stopColor="#ffffff"/>
                <stop offset="70%" stopColor="#f8fafc"/>
                <stop offset="100%" stopColor="#e2e8f0"/>
              </radialGradient>
              <filter id="beardTexture">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3"/>
              </filter>
              <filter id="softShadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feMerge>
                  <feMergeNode in="offsetblur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Длинная шуба трапециевидная */}
            <path d="M 110 95 L 75 140 L 65 200 L 58 270 L 55 315 L 165 315 L 162 270 L 155 200 L 145 140 Z" 
              fill="url(#redCoat)" stroke="#7f1d1d" strokeWidth="2" filter="url(#softShadow)"/>
            
            {/* Золотая парча с узорами - левая сторона */}
            <path d="M 110 95 L 75 140 L 65 200 L 58 270" 
              stroke="url(#goldPattern)" strokeWidth="18" fill="none" opacity="0.9"/>
            <path d="M 110 95 L 75 140 L 65 200 L 58 270" 
              stroke="#dc2626" strokeWidth="12" fill="none"/>
            
            {/* Узоры на золотой парче - левая */}
            {[120, 160, 200, 240, 280].map((y, i) => (
              <g key={`left-${i}`}>
                <circle cx={78 - i * 2} cy={y} r="3" fill="#f59e0b" opacity="0.8"/>
                <circle cx={74 - i * 2} cy={y + 15} r="2" fill="#fbbf24"/>
              </g>
            ))}
            
            {/* Золотая парча с узорами - правая сторона */}
            <path d="M 110 95 L 145 140 L 155 200 L 162 270" 
              stroke="url(#goldPattern)" strokeWidth="18" fill="none" opacity="0.9"/>
            <path d="M 110 95 L 145 140 L 155 200 L 162 270" 
              stroke="#dc2626" strokeWidth="12" fill="none"/>
            
            {/* Узоры на золотой парче - правая */}
            {[120, 160, 200, 240, 280].map((y, i) => (
              <g key={`right-${i}`}>
                <circle cx={142 + i * 2} cy={y} r="3" fill="#f59e0b" opacity="0.8"/>
                <circle cx={146 + i * 2} cy={y + 15} r="2" fill="#fbbf24"/>
              </g>
            ))}
            
            {/* Белый мех воротник - пушистый */}
            <ellipse cx="110" cy="95" rx="48" ry="18" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
            <ellipse cx="110" cy="93" rx="45" ry="15" fill="white" opacity="0.7"/>
            
            {/* Белый мех низ шубы */}
            <ellipse cx="110" cy="313" rx="55" ry="15" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
            <ellipse cx="110" cy="311" rx="52" ry="12" fill="white" opacity="0.7"/>
            
            {/* Белая центральная меховая полоса */}
            <rect x="101" y="100" width="18" height="208" rx="9" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
            <rect x="103" y="100" width="14" height="208" rx="7" fill="white" opacity="0.6"/>
            
            {/* Голова */}
            <ellipse cx="110" cy="60" rx="32" ry="34" fill="#fdd5b1"/>
            <ellipse cx="105" cy="58" rx="28" ry="30" fill="#fde4c8" opacity="0.5"/>
            
            {/* Шапка красная */}
            <path d="M 75 55 Q 72 25 110 20 Q 148 25 145 55" 
              fill="#dc2626" stroke="#991b1b" strokeWidth="2" filter="url(#softShadow)"/>
            <path d="M 78 55 Q 75 30 110 25 Q 145 30 142 55" 
              fill="#b91c1c"/>
            
            {/* Белая опушка шапки */}
            <ellipse cx="110" cy="55" rx="37" ry="12" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
            <ellipse cx="110" cy="54" rx="35" ry="10" fill="white" opacity="0.8"/>
            
            {/* Помпон */}
            <circle cx="110" cy="18" r="10" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
            <circle cx="110" cy="18" r="8" fill="white" opacity="0.9"/>
            
            {/* Огромная пушистая борода */}
            <ellipse cx="110" cy="78" rx="35" ry="28" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
            <ellipse cx="108" cy="76" rx="32" ry="25" fill="white" opacity="0.8"/>
            
            {/* Волны бороды */}
            <path d="M 80 70 Q 75 80 78 90 Q 82 85 85 88" 
              stroke="white" strokeWidth="4" fill="none" opacity="0.6"/>
            <path d="M 95 72 Q 92 82 95 92" 
              stroke="white" strokeWidth="4" fill="none" opacity="0.6"/>
            <path d="M 110 73 Q 108 85 110 95" 
              stroke="white" strokeWidth="5" fill="none" opacity="0.7"/>
            <path d="M 125 72 Q 128 82 125 92" 
              stroke="white" strokeWidth="4" fill="none" opacity="0.6"/>
            <path d="M 140 70 Q 145 80 142 90 Q 138 85 135 88" 
              stroke="white" strokeWidth="4" fill="none" opacity="0.6"/>
            
            {/* Усы пушистые */}
            <ellipse cx="85" cy="68" rx="15" ry="8" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
            <ellipse cx="135" cy="68" rx="15" ry="8" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
            <ellipse cx="84" cy="67" rx="13" ry="6" fill="white" opacity="0.9"/>
            <ellipse cx="136" cy="67" rx="13" ry="6" fill="white" opacity="0.9"/>
            
            {/* Глаза добрые */}
            <ellipse cx="93" cy="54" rx="4" ry="5" fill="#3b2414"/>
            <ellipse cx="127" cy="54" rx="4" ry="5" fill="#3b2414"/>
            <circle cx="94" cy="53" r="2" fill="white" opacity="0.9"/>
            <circle cx="128" cy="53" r="2" fill="white" opacity="0.9"/>
            
            {/* Брови седые */}
            <path d="M 85 46 Q 93 44 100 46" stroke="#f3f4f6" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8"/>
            <path d="M 120 46 Q 127 44 135 46" stroke="#f3f4f6" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8"/>
            
            {/* Нос */}
            <ellipse cx="110" cy="64" rx="5" ry="6" fill="#f87171"/>
            <ellipse cx="109" cy="63" rx="2" ry="3" fill="#fca5a5" opacity="0.7"/>
            
            {/* Румянец */}
            <circle cx="82" cy="66" r="8" fill="#fca5a5" opacity="0.4"/>
            <circle cx="138" cy="66" r="8" fill="#fca5a5" opacity="0.4"/>
            
            {/* Руки в шубе приподняты */}
            <ellipse cx="50" cy="170" rx="18" ry="50" fill="url(#redCoat)" stroke="#7f1d1d" strokeWidth="2" transform="rotate(-25 50 170)" filter="url(#softShadow)"/>
            <ellipse cx="170" cy="170" rx="18" ry="50" fill="url(#redCoat)" stroke="#7f1d1d" strokeWidth="2" transform="rotate(25 170 170)" filter="url(#softShadow)"/>
            
            {/* Золотые полосы на рукавах */}
            <ellipse cx="46" cy="190" rx="10" ry="18" fill="url(#goldPattern)" transform="rotate(-25 46 190)" opacity="0.8"/>
            <ellipse cx="174" cy="190" rx="10" ry="18" fill="url(#goldPattern)" transform="rotate(25 174 190)" opacity="0.8"/>
            
            {/* Белый мех на рукавах */}
            <ellipse cx="44" cy="218" rx="20" ry="13" fill="url(#whiteFur)" transform="rotate(-25 44 218)" filter="url(#beardTexture)"/>
            <ellipse cx="176" cy="218" rx="20" ry="13" fill="url(#whiteFur)" transform="rotate(25 176 218)" filter="url(#beardTexture)"/>
            
            {/* Варежки красные */}
            <ellipse cx="40" cy="228" rx="15" ry="18" fill="#dc2626" stroke="#991b1b" strokeWidth="2" filter="url(#softShadow)"/>
            <ellipse cx="180" cy="228" rx="15" ry="18" fill="#dc2626" stroke="#991b1b" strokeWidth="2" filter="url(#softShadow)"/>
            <ellipse cx="42" cy="225" rx="8" ry="10" fill="#b91c1c" opacity="0.6"/>
            <ellipse cx="178" cy="225" rx="8" ry="10" fill="#b91c1c" opacity="0.6"/>
            
            {/* Посох деревянный */}
            <line x1="185" y1="225" x2="205" y2="75" stroke="#6b4423" strokeWidth="8" strokeLinecap="round" filter="url(#softShadow)"/>
            <line x1="187" y1="225" x2="207" y2="75" stroke="#8b5a3c" strokeWidth="5"/>
            
            {/* Кристалл на посохе */}
            <circle cx="207" cy="68" r="14" fill="#3b82f6" stroke="#1e40af" strokeWidth="3" filter="url(#softShadow)"/>
            <circle cx="209" cy="66" r="7" fill="#60a5fa" opacity="0.8"/>
            <circle cx="211" cy="64" r="3" fill="#93c5fd"/>
          </svg>
        </div>

        {/* Ёлка - реалистичная с эффектами */}
        <div className="relative w-full max-w-xl aspect-[3/4] max-h-[70vh] mx-auto">
          <svg
            viewBox="0 0 300 420"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 0 50px rgba(34, 197, 94, 0.4))' }}
          >
            <defs>
              <radialGradient id="starGlow">
                <stop offset="0%" stopColor="#fef9c3"/>
                <stop offset="50%" stopColor="#fef08a"/>
                <stop offset="100%" stopColor="#fbbf24"/>
              </radialGradient>
              <linearGradient id="treeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#166534"/>
                <stop offset="50%" stopColor="#15803d"/>
                <stop offset="100%" stopColor="#14532d"/>
              </linearGradient>
              <filter id="treeGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <radialGradient id="ballShine">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#000000" stopOpacity="0.1"/>
              </radialGradient>
            </defs>
            
            {/* Сияющая звезда */}
            <g filter="url(#treeGlow)">
              <path
                d="M 150 5 L 157 25 L 178 25 L 162 38 L 169 58 L 150 45 L 131 58 L 138 38 L 122 25 L 143 25 Z"
                fill="url(#starGlow)"
                stroke="#f59e0b"
                strokeWidth="2"
                className="animate-pulse"
              />
              <circle cx="150" cy="32" r="20" fill="#fef08a" opacity="0.3" className="animate-pulse"/>
            </g>

            {/* Ствол с текстурой */}
            <rect x="135" y="360" width="30" height="60" fill="#6b4423" stroke="#4a2c16" strokeWidth="2" rx="2"/>
            <rect x="140" y="363" width="20" height="54" fill="#8b5a3c" opacity="0.4"/>
            <line x1="145" y1="365" x2="145" y2="415" stroke="#4a2c16" strokeWidth="1" opacity="0.5"/>
            <line x1="155" y1="365" x2="155" y2="415" stroke="#4a2c16" strokeWidth="1" opacity="0.5"/>

            {/* Многослойная ёлка с эффектом объёма */}
            {/* Слой 1 - верхний */}
            <path
              d="M 150 50 L 110 100 L 125 100 L 95 140 L 205 140 L 175 100 L 190 100 Z"
              fill="url(#treeGradient)"
              stroke="#0f4d2d"
              strokeWidth="2"
            />
            <path
              d="M 150 50 L 115 95 L 130 95 L 100 135 L 200 135 L 170 95 L 185 95 Z"
              fill="#047857"
              opacity="0.6"
            />
            
            {/* Слой 2 - средний */}
            <path
              d="M 150 125 L 100 185 L 120 185 L 80 240 L 220 240 L 180 185 L 200 185 Z"
              fill="url(#treeGradient)"
              stroke="#0f4d2d"
              strokeWidth="2"
            />
            <path
              d="M 150 125 L 105 180 L 125 180 L 85 235 L 215 235 L 175 180 L 195 180 Z"
              fill="#047857"
              opacity="0.6"
            />
            
            {/* Слой 3 - нижний */}
            <path
              d="M 150 225 L 75 305 L 100 305 L 60 360 L 240 360 L 200 305 L 225 305 Z"
              fill="url(#treeGradient)"
              stroke="#0f4d2d"
              strokeWidth="2"
            />
            <path
              d="M 150 225 L 80 300 L 105 300 L 65 355 L 235 355 L 195 300 L 220 300 Z"
              fill="#047857"
              opacity="0.6"
            />

            {/* Снег на ветках - реалистичный */}
            {[
              {x: 150, y: 50, w: 15, h: 6},
              {x: 120, y: 95, w: 25, h: 8},
              {x: 180, y: 95, w: 25, h: 8},
              {x: 110, y: 135, w: 30, h: 9},
              {x: 190, y: 135, w: 30, h: 9},
              {x: 105, y: 180, w: 35, h: 10},
              {x: 195, y: 180, w: 35, h: 10},
              {x: 95, y: 230, w: 40, h: 11},
              {x: 205, y: 230, w: 40, h: 11},
              {x: 85, y: 295, w: 45, h: 12},
              {x: 215, y: 295, w: 45, h: 12},
            ].map((snow, i) => (
              <ellipse
                key={`snow-${i}`}
                cx={snow.x}
                cy={snow.y}
                rx={snow.w}
                ry={snow.h}
                fill="white"
                opacity="0.85"
                filter="url(#treeGlow)"
              />
            ))}

            {/* Реалистичные шарики с бликами */}
            {[
              {x: 130, y: 80, color: '#ef4444', size: 8},
              {x: 170, y: 85, color: '#3b82f6', size: 7},
              {x: 150, y: 110, color: '#a855f7', size: 9},
              {x: 120, y: 125, color: '#f59e0b', size: 7},
              {x: 180, y: 120, color: '#10b981', size: 8},
              {x: 110, y: 160, color: '#ec4899', size: 9},
              {x: 150, y: 170, color: '#ef4444', size: 8},
              {x: 190, y: 165, color: '#3b82f6', size: 7},
              {x: 100, y: 200, color: '#fbbf24', size: 10},
              {x: 140, y: 210, color: '#a855f7', size: 8},
              {x: 160, y: 205, color: '#10b981', size: 9},
              {x: 200, y: 200, color: '#ec4899', size: 8},
              {x: 90, y: 250, color: '#ef4444', size: 9},
              {x: 125, y: 260, color: '#3b82f6', size: 10},
              {x: 150, y: 265, color: '#fbbf24', size: 8},
              {x: 175, y: 260, color: '#a855f7', size: 9},
              {x: 210, y: 250, color: '#10b981', size: 10},
              {x: 85, y: 310, color: '#ec4899', size: 11},
              {x: 120, y: 320, color: '#ef4444', size: 9},
              {x: 150, y: 325, color: '#3b82f6', size: 10},
              {x: 180, y: 320, color: '#fbbf24', size: 9},
              {x: 215, y: 310, color: '#a855f7', size: 11},
            ].map((ball, i) => (
              <g key={`ball-${i}`} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s`, animationDuration: '3s' }}>
                <circle
                  cx={ball.x}
                  cy={ball.y}
                  r={ball.size}
                  fill={ball.color}
                  filter="url(#treeGlow)"
                />
                <ellipse
                  cx={ball.x - 2}
                  cy={ball.y - 2}
                  rx={ball.size * 0.4}
                  ry={ball.size * 0.3}
                  fill="url(#ballShine)"
                />
              </g>
            ))}
            
            {/* Светящиеся огоньки гирлянды */}
            {[...Array(35)].map((_, i) => {
              const angle = (i / 35) * Math.PI * 6;
              const radius = 60 + (i % 4) * 25;
              const x = 150 + Math.cos(angle) * (radius - i * 1.5);
              const y = 80 + i * 7;
              const colors = ['#fbbf24', '#f59e0b', '#ef4444', '#3b82f6', '#a855f7', '#10b981'];
              return (
                <circle
                  key={`light-${i}`}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={colors[i % colors.length]}
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.08}s`, animationDuration: '1.5s' }}
                  filter="url(#treeGlow)"
                  opacity="0.9"
                />
              );
            })}
          </svg>

          {/* Кнопки + на ветках */}
          {branchPositions.map((pos, index) => {
            const hasWish = wishes.some(w => w.position.x === pos.x && w.position.y === pos.y);
            
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                {hasWish ? (
                  <div className="relative group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 via-red-500 to-red-700 border-3 border-yellow-400 shadow-xl cursor-pointer relative animate-pulse">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-3 bg-yellow-600 rounded-t"></div>
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/50 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
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

        {/* Снегурочка - более реалистичная */}
        <div className="relative animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <svg width="200" height="320" viewBox="0 0 200 320" className="drop-shadow-2xl">
            <defs>
              <linearGradient id="blueCoatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6"/>
                <stop offset="50%" stopColor="#2563eb"/>
                <stop offset="100%" stopColor="#1e40af"/>
              </linearGradient>
              <radialGradient id="whiteFur">
                <stop offset="0%" stopColor="#ffffff"/>
                <stop offset="100%" stopColor="#f8fafc"/>
              </radialGradient>
              <filter id="kokoshnikGlow">
                <feGaussianBlur stdDeviation="2"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Шубка с градиентом */}
            <path d="M 100 85 L 70 125 L 60 190 L 55 260 L 55 285 L 145 285 L 145 260 L 140 190 L 130 125 Z" 
              fill="url(#blueCoatGradient)" stroke="#1e40af" strokeWidth="2"/>
            
            {/* Серебряная окантовка */}
            <path d="M 100 85 L 70 125 L 60 190" stroke="#cbd5e1" strokeWidth="3" fill="none" opacity="0.9"/>
            <path d="M 100 85 L 130 125 L 140 190" stroke="#cbd5e1" strokeWidth="3" fill="none" opacity="0.9"/>
            
            {/* Белый мех воротник */}
            <ellipse cx="100" cy="85" rx="42" ry="16" fill="url(#whiteFur)" filter="url(#kokoshnikGlow)"/>
            
            {/* Белый мех низ */}
            <ellipse cx="100" cy="283" rx="45" ry="13" fill="url(#whiteFur)" filter="url(#kokoshnikGlow)"/>
            
            {/* Белый мех центр */}
            <rect x="92" y="90" width="16" height="190" rx="8" fill="url(#whiteFur)" filter="url(#kokoshnikGlow)"/>
            
            {/* Голова */}
            <circle cx="100" cy="55" r="28" fill="#fdd5b1"/>
            
            {/* Кокошник - синий с узорами */}
            <path d="M 65 48 Q 65 15 100 10 Q 135 15 135 48" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2"/>
            <path d="M 70 45 Q 75 20 100 15 Q 125 20 130 45" fill="#3b82f6"/>
            
            {/* Узоры на кокошнике */}
            <circle cx="85" cy="28" r="3" fill="white" opacity="0.9"/>
            <circle cx="100" cy="20" r="3" fill="white" opacity="0.9"/>
            <circle cx="115" cy="28" r="3" fill="white" opacity="0.9"/>
            <circle cx="80" cy="35" r="2" fill="#cbd5e1"/>
            <circle cx="95" cy="30" r="2" fill="#cbd5e1"/>
            <circle cx="105" cy="30" r="2" fill="#cbd5e1"/>
            <circle cx="120" cy="35" r="2" fill="#cbd5e1"/>
            
            {/* Окантовка кокошника */}
            <ellipse cx="100" cy="48" rx="36" ry="8" fill="url(#whiteFur)"/>
            
            {/* Длинная коса */}
            <path d="M 135 55 Q 145 90 150 140 Q 148 180 145 220" 
              stroke="#fbbf24" strokeWidth="14" fill="none" strokeLinecap="round"/>
            
            {/* Плетение косы */}
            <circle cx="147" cy="100" r="8" fill="#f59e0b" opacity="0.6"/>
            <circle cx="149" cy="140" r="8" fill="#f59e0b" opacity="0.6"/>
            <circle cx="146" cy="180" r="8" fill="#f59e0b" opacity="0.6"/>
            
            {/* Бант на косе */}
            <ellipse cx="140" cy="225" rx="10" ry="8" fill="#ef4444"/>
            <ellipse cx="150" cy="225" rx="10" ry="8" fill="#ef4444"/>
            <circle cx="145" cy="225" r="5" fill="#dc2626"/>
            
            {/* Лицо */}
            <ellipse cx="87" cy="50" rx="3" ry="4" fill="#1f2937"/>
            <ellipse cx="113" cy="50" rx="3" ry="4" fill="#1f2937"/>
            <circle cx="88" cy="49" r="1.5" fill="white" opacity="0.9"/>
            <circle cx="114" cy="49" r="1.5" fill="white" opacity="0.9"/>
            
            {/* Ресницы */}
            <path d="M 84 47 Q 83 45 82 44" stroke="#1f2937" strokeWidth="1" fill="none"/>
            <path d="M 110 47 Q 111 45 112 44" stroke="#1f2937" strokeWidth="1" fill="none"/>
            
            {/* Нос */}
            <ellipse cx="100" cy="60" rx="3" ry="4" fill="#fca5a5" opacity="0.7"/>
            
            {/* Улыбка */}
            <path d="M 88 68 Q 100 73 112 68" stroke="#f87171" strokeWidth="2" fill="none" strokeLinecap="round"/>
            
            {/* Румянец */}
            <circle cx="75" cy="62" r="7" fill="#fca5a5" opacity="0.6"/>
            <circle cx="125" cy="62" r="7" fill="#fca5a5" opacity="0.6"/>
            
            {/* Руки */}
            <ellipse cx="52" cy="160" rx="15" ry="45" fill="url(#blueCoatGradient)" stroke="#1e40af" strokeWidth="2" transform="rotate(-15 52 160)"/>
            <ellipse cx="148" cy="160" rx="15" ry="45" fill="url(#blueCoatGradient)" stroke="#1e40af" strokeWidth="2" transform="rotate(15 148 160)"/>
            
            {/* Мех на рукавах */}
            <ellipse cx="48" cy="203" rx="17" ry="11" fill="url(#whiteFur)" transform="rotate(-15 48 203)" filter="url(#kokoshnikGlow)"/>
            <ellipse cx="152" cy="203" rx="17" ry="11" fill="url(#whiteFur)" transform="rotate(15 152 203)" filter="url(#kokoshnikGlow)"/>
            
            {/* Варежки белые */}
            <ellipse cx="45" cy="210" rx="13" ry="15" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
            <ellipse cx="155" cy="210" rx="13" ry="15" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
            
            {/* Пояс серебряный */}
            <rect x="70" y="145" width="60" height="12" rx="6" fill="#475569" stroke="#cbd5e1" strokeWidth="2"/>
            <circle cx="100" cy="151" r="4" fill="#e2e8f0"/>
            
            {/* Снежинки вокруг */}
            {[{x: 25, y: 100}, {x: 175, y: 120}, {x: 30, y: 180}, {x: 170, y: 200}].map((pos, i) => (
              <text key={i} x={pos.x} y={pos.y} fontSize="18" fill="#93c5fd" opacity="0.7" className="animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>❄</text>
            ))}
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