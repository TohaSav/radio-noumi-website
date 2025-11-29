const Snegurochka = () => {
  return (
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
        
        <path d="M 100 85 L 70 125 L 60 190 L 55 260 L 55 285 L 145 285 L 145 260 L 140 190 L 130 125 Z" 
          fill="url(#blueCoatGradient)" stroke="#1e40af" strokeWidth="2"/>
        
        <path d="M 100 85 L 70 125 L 60 190" stroke="#cbd5e1" strokeWidth="3" fill="none" opacity="0.9"/>
        <path d="M 100 85 L 130 125 L 140 190" stroke="#cbd5e1" strokeWidth="3" fill="none" opacity="0.9"/>
        
        <ellipse cx="100" cy="85" rx="42" ry="16" fill="url(#whiteFur)" filter="url(#kokoshnikGlow)"/>
        
        <ellipse cx="100" cy="283" rx="45" ry="13" fill="url(#whiteFur)" filter="url(#kokoshnikGlow)"/>
        
        <rect x="92" y="90" width="16" height="190" rx="8" fill="url(#whiteFur)" filter="url(#kokoshnikGlow)"/>
        
        <circle cx="100" cy="55" r="28" fill="#fdd5b1"/>
        
        <path d="M 65 48 Q 65 15 100 10 Q 135 15 135 48" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2"/>
        <path d="M 70 45 Q 75 20 100 15 Q 125 20 130 45" fill="#3b82f6"/>
        
        <circle cx="85" cy="28" r="3" fill="white" opacity="0.9"/>
        <circle cx="100" cy="20" r="3" fill="white" opacity="0.9"/>
        <circle cx="115" cy="28" r="3" fill="white" opacity="0.9"/>
        <circle cx="80" cy="35" r="2" fill="#cbd5e1"/>
        <circle cx="95" cy="30" r="2" fill="#cbd5e1"/>
        <circle cx="105" cy="30" r="2" fill="#cbd5e1"/>
        <circle cx="120" cy="35" r="2" fill="#cbd5e1"/>
        
        <ellipse cx="100" cy="48" rx="36" ry="8" fill="url(#whiteFur)"/>
        
        <path d="M 135 55 Q 145 90 150 140 Q 148 180 145 220" 
          stroke="#fbbf24" strokeWidth="14" fill="none" strokeLinecap="round"/>
        
        <circle cx="147" cy="100" r="8" fill="#f59e0b" opacity="0.6"/>
        <circle cx="149" cy="140" r="8" fill="#f59e0b" opacity="0.6"/>
        <circle cx="146" cy="180" r="8" fill="#f59e0b" opacity="0.6"/>
        
        <ellipse cx="140" cy="225" rx="10" ry="8" fill="#ef4444"/>
        <ellipse cx="150" cy="225" rx="10" ry="8" fill="#ef4444"/>
        <circle cx="145" cy="225" r="5" fill="#dc2626"/>
        
        <ellipse cx="87" cy="50" rx="3" ry="4" fill="#1f2937"/>
        <ellipse cx="113" cy="50" rx="3" ry="4" fill="#1f2937"/>
        <circle cx="88" cy="49" r="1.5" fill="white" opacity="0.9"/>
        <circle cx="114" cy="49" r="1.5" fill="white" opacity="0.9"/>
        
        <path d="M 84 47 Q 83 45 82 44" stroke="#1f2937" strokeWidth="1" fill="none"/>
        <path d="M 110 47 Q 111 45 112 44" stroke="#1f2937" strokeWidth="1" fill="none"/>
        
        <ellipse cx="100" cy="60" rx="3" ry="4" fill="#fca5a5" opacity="0.7"/>
        
        <path d="M 88 68 Q 100 73 112 68" stroke="#f87171" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        <circle cx="75" cy="62" r="7" fill="#fca5a5" opacity="0.6"/>
        <circle cx="125" cy="62" r="7" fill="#fca5a5" opacity="0.6"/>
        
        <ellipse cx="52" cy="160" rx="15" ry="45" fill="url(#blueCoatGradient)" stroke="#1e40af" strokeWidth="2" transform="rotate(-15 52 160)"/>
        <ellipse cx="148" cy="160" rx="15" ry="45" fill="url(#blueCoatGradient)" stroke="#1e40af" strokeWidth="2" transform="rotate(15 148 160)"/>
        
        <ellipse cx="48" cy="203" rx="17" ry="11" fill="url(#whiteFur)" transform="rotate(-15 48 203)" filter="url(#kokoshnikGlow)"/>
        <ellipse cx="152" cy="203" rx="17" ry="11" fill="url(#whiteFur)" transform="rotate(15 152 203)" filter="url(#kokoshnikGlow)"/>
        
        <ellipse cx="45" cy="210" rx="13" ry="15" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
        <ellipse cx="155" cy="210" rx="13" ry="15" fill="white" stroke="#cbd5e1" strokeWidth="2"/>
        
        <rect x="70" y="145" width="60" height="12" rx="6" fill="#475569" stroke="#cbd5e1" strokeWidth="2"/>
        <circle cx="100" cy="151" r="4" fill="#e2e8f0"/>
        
        {[{x: 25, y: 100}, {x: 175, y: 120}, {x: 30, y: 180}, {x: 170, y: 200}].map((pos, i) => (
          <text key={i} x={pos.x} y={pos.y} fontSize="18" fill="#93c5fd" opacity="0.7" className="animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}>❄</text>
        ))}
      </svg>
    </div>
  );
};

export default Snegurochka;
