const DedMoroz = () => {
  return (
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
        
        <path d="M 110 95 L 75 140 L 65 200 L 58 270 L 55 315 L 165 315 L 162 270 L 155 200 L 145 140 Z" 
          fill="url(#redCoat)" stroke="#7f1d1d" strokeWidth="2" filter="url(#softShadow)"/>
        
        <path d="M 110 95 L 75 140 L 65 200 L 58 270" 
          stroke="url(#goldPattern)" strokeWidth="18" fill="none" opacity="0.9"/>
        <path d="M 110 95 L 75 140 L 65 200 L 58 270" 
          stroke="#dc2626" strokeWidth="12" fill="none"/>
        
        {[120, 160, 200, 240, 280].map((y, i) => (
          <g key={`left-${i}`}>
            <circle cx={78 - i * 2} cy={y} r="3" fill="#f59e0b" opacity="0.8"/>
            <circle cx={74 - i * 2} cy={y + 15} r="2" fill="#fbbf24"/>
          </g>
        ))}
        
        <path d="M 110 95 L 145 140 L 155 200 L 162 270" 
          stroke="url(#goldPattern)" strokeWidth="18" fill="none" opacity="0.9"/>
        <path d="M 110 95 L 145 140 L 155 200 L 162 270" 
          stroke="#dc2626" strokeWidth="12" fill="none"/>
        
        {[120, 160, 200, 240, 280].map((y, i) => (
          <g key={`right-${i}`}>
            <circle cx={142 + i * 2} cy={y} r="3" fill="#f59e0b" opacity="0.8"/>
            <circle cx={146 + i * 2} cy={y + 15} r="2" fill="#fbbf24"/>
          </g>
        ))}
        
        <ellipse cx="110" cy="95" rx="48" ry="18" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
        <ellipse cx="110" cy="93" rx="45" ry="15" fill="white" opacity="0.7"/>
        
        <ellipse cx="110" cy="313" rx="55" ry="15" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
        <ellipse cx="110" cy="311" rx="52" ry="12" fill="white" opacity="0.7"/>
        
        <rect x="101" y="100" width="18" height="208" rx="9" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
        <rect x="103" y="100" width="14" height="208" rx="7" fill="white" opacity="0.6"/>
        
        <ellipse cx="110" cy="60" rx="32" ry="34" fill="#fdd5b1"/>
        <ellipse cx="105" cy="58" rx="28" ry="30" fill="#fde4c8" opacity="0.5"/>
        
        <path d="M 75 55 Q 72 25 110 20 Q 148 25 145 55" 
          fill="#dc2626" stroke="#991b1b" strokeWidth="2" filter="url(#softShadow)"/>
        <path d="M 78 55 Q 75 30 110 25 Q 145 30 142 55" 
          fill="#b91c1c"/>
        
        <ellipse cx="110" cy="55" rx="37" ry="12" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
        <ellipse cx="110" cy="54" rx="35" ry="10" fill="white" opacity="0.8"/>
        
        <circle cx="110" cy="18" r="10" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
        <circle cx="110" cy="18" r="8" fill="white" opacity="0.9"/>
        
        <ellipse cx="110" cy="78" rx="35" ry="28" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
        <ellipse cx="108" cy="76" rx="32" ry="25" fill="white" opacity="0.8"/>
        
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
        
        <ellipse cx="85" cy="68" rx="15" ry="8" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
        <ellipse cx="135" cy="68" rx="15" ry="8" fill="url(#whiteFur)" filter="url(#beardTexture)"/>
        <ellipse cx="84" cy="67" rx="13" ry="6" fill="white" opacity="0.9"/>
        <ellipse cx="136" cy="67" rx="13" ry="6" fill="white" opacity="0.9"/>
        
        <ellipse cx="93" cy="54" rx="4" ry="5" fill="#3b2414"/>
        <ellipse cx="127" cy="54" rx="4" ry="5" fill="#3b2414"/>
        <circle cx="94" cy="53" r="2" fill="white" opacity="0.9"/>
        <circle cx="128" cy="53" r="2" fill="white" opacity="0.9"/>
        
        <path d="M 85 46 Q 93 44 100 46" stroke="#f3f4f6" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8"/>
        <path d="M 120 46 Q 127 44 135 46" stroke="#f3f4f6" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8"/>
        
        <ellipse cx="110" cy="64" rx="5" ry="6" fill="#f87171"/>
        <ellipse cx="109" cy="63" rx="2" ry="3" fill="#fca5a5" opacity="0.7"/>
        
        <circle cx="82" cy="66" r="8" fill="#fca5a5" opacity="0.4"/>
        <circle cx="138" cy="66" r="8" fill="#fca5a5" opacity="0.4"/>
        
        <ellipse cx="50" cy="170" rx="18" ry="50" fill="url(#redCoat)" stroke="#7f1d1d" strokeWidth="2" transform="rotate(-25 50 170)" filter="url(#softShadow)"/>
        <ellipse cx="170" cy="170" rx="18" ry="50" fill="url(#redCoat)" stroke="#7f1d1d" strokeWidth="2" transform="rotate(25 170 170)" filter="url(#softShadow)"/>
        
        <ellipse cx="46" cy="190" rx="10" ry="18" fill="url(#goldPattern)" transform="rotate(-25 46 190)" opacity="0.8"/>
        <ellipse cx="174" cy="190" rx="10" ry="18" fill="url(#goldPattern)" transform="rotate(25 174 190)" opacity="0.8"/>
        
        <ellipse cx="44" cy="218" rx="20" ry="13" fill="url(#whiteFur)" transform="rotate(-25 44 218)" filter="url(#beardTexture)"/>
        <ellipse cx="176" cy="218" rx="20" ry="13" fill="url(#whiteFur)" transform="rotate(25 176 218)" filter="url(#beardTexture)"/>
        
        <ellipse cx="40" cy="228" rx="15" ry="18" fill="#dc2626" stroke="#991b1b" strokeWidth="2" filter="url(#softShadow)"/>
        <ellipse cx="180" cy="228" rx="15" ry="18" fill="#dc2626" stroke="#991b1b" strokeWidth="2" filter="url(#softShadow)"/>
        <ellipse cx="42" cy="225" rx="8" ry="10" fill="#b91c1c" opacity="0.6"/>
        <ellipse cx="178" cy="225" rx="8" ry="10" fill="#b91c1c" opacity="0.6"/>
        
        <line x1="185" y1="225" x2="205" y2="75" stroke="#6b4423" strokeWidth="8" strokeLinecap="round" filter="url(#softShadow)"/>
        <line x1="187" y1="225" x2="207" y2="75" stroke="#8b5a3c" strokeWidth="5"/>
        
        <circle cx="207" cy="68" r="14" fill="#3b82f6" stroke="#1e40af" strokeWidth="3" filter="url(#softShadow)"/>
        <circle cx="209" cy="66" r="7" fill="#60a5fa" opacity="0.8"/>
        <circle cx="211" cy="64" r="3" fill="#93c5fd"/>
      </svg>
    </div>
  );
};

export default DedMoroz;
