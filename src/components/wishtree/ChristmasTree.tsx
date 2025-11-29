import Icon from "@/components/ui/icon";
import { Wish } from "@/pages/WishTree";

interface ChristmasTreeProps {
  wishes: Wish[];
  onAddWish: (position: { x: number; y: number }) => void;
  branchPositions: Array<{ x: number; y: number }>;
}

const ChristmasTree = ({ wishes, onAddWish, branchPositions }: ChristmasTreeProps) => {
  return (
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

        <rect x="135" y="360" width="30" height="60" fill="#6b4423" stroke="#4a2c16" strokeWidth="2" rx="2"/>
        <rect x="140" y="363" width="20" height="54" fill="#8b5a3c" opacity="0.4"/>
        <line x1="145" y1="365" x2="145" y2="415" stroke="#4a2c16" strokeWidth="1" opacity="0.5"/>
        <line x1="155" y1="365" x2="155" y2="415" stroke="#4a2c16" strokeWidth="1" opacity="0.5"/>

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
  );
};

export default ChristmasTree;
