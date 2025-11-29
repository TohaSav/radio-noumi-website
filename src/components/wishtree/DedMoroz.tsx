const DedMoroz = () => {
  return (
    <div className="relative animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
      <svg width="240" height="360" viewBox="0 0 240 360" className="drop-shadow-2xl">
        <path d="M 60 340 L 60 355 L 95 355 L 95 340 Z" fill="#4a1e1e" stroke="#2d1010" strokeWidth="2"/>
        <path d="M 145 340 L 145 355 L 180 355 L 180 340 Z" fill="#4a1e1e" stroke="#2d1010" strokeWidth="2"/>
        
        <path d="M 80 210 L 60 240 L 55 340 L 95 340 L 145 340 L 185 340 L 180 240 L 160 210 Z" 
          fill="#ffffff" stroke="#2d1010" strokeWidth="2.5"/>
        
        <path d="M 80 130 L 50 180 L 30 240 L 30 260 L 210 260 L 210 240 L 190 180 L 160 130 Z" 
          fill="#ea5a67" stroke="#d63447" strokeWidth="3"/>
        
        <line x1="105" y1="140" x2="105" y2="250" stroke="#2d1010" strokeWidth="2.5"/>
        <line x1="135" y1="140" x2="135" y2="250" stroke="#2d1010" strokeWidth="2.5"/>
        
        {[{x: 70, y: 155}, {x: 110, y: 170}, {x: 85, y: 190}, {x: 120, y: 210}, {x: 75, y: 225}].map((dot, i) => (
          <circle key={`left-${i}`} cx={dot.x} cy={dot.y} r="5" fill="#ffffff"/>
        ))}
        {[{x: 170, y: 155}, {x: 130, y: 170}, {x: 155, y: 190}, {x: 120, y: 210}, {x: 165, y: 225}].map((dot, i) => (
          <circle key={`right-${i}`} cx={dot.x} cy={dot.y} r="5" fill="#ffffff"/>
        ))}
        
        <path d="M 80 130 Q 70 120 65 105 L 65 85 Q 70 75 80 70" 
          fill="#ea5a67" stroke="#d63447" strokeWidth="3"/>
        <path d="M 70 100 L 65 95" stroke="#2d1010" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 70 85 L 65 90" stroke="#2d1010" strokeWidth="2" strokeLinecap="round"/>
        
        <ellipse cx="55" cy="70" rx="12" ry="16" fill="#e8a87c" stroke="#2d1010" strokeWidth="1.5"/>
        
        <path d="M 40 55 Q 35 40 45 30 L 60 20 L 75 25 Q 85 35 82 50" 
          fill="#d4954a" stroke="#2d1010" strokeWidth="2"/>
        <ellipse cx="50" cy="40" rx="8" ry="10" fill="#d4954a" opacity="0.7"/>
        
        <path d="M 160 130 Q 170 120 175 105 L 175 85 Q 170 75 160 70" 
          fill="#ea5a67" stroke="#d63447" strokeWidth="3"/>
        <path d="M 170 100 L 175 95" stroke="#2d1010" strokeWidth="2" strokeLinecap="round"/>
        <path d="M 170 85 L 175 90" stroke="#2d1010" strokeWidth="2" strokeLinecap="round"/>
        
        <ellipse cx="185" cy="70" rx="12" ry="16" fill="#e8a87c" stroke="#2d1010" strokeWidth="1.5"/>
        
        <path d="M 200 55 Q 205 40 195 30 L 180 20 L 165 25 Q 155 35 158 50" 
          fill="#d4954a" stroke="#2d1010" strokeWidth="2"/>
        <ellipse cx="190" cy="40" rx="8" ry="10" fill="#d4954a" opacity="0.7"/>
        
        <ellipse cx="120" cy="110" rx="55" ry="62" fill="#ffffff" stroke="#e8e8e8" strokeWidth="2"/>
        
        <path d="M 75 110 Q 70 95 75 80 Q 85 70 100 70 Q 110 72 118 78" 
          stroke="#e8e8e8" strokeWidth="2" fill="none"/>
        <path d="M 165 110 Q 170 95 165 80 Q 155 70 140 70 Q 130 72 122 78" 
          stroke="#e8e8e8" strokeWidth="2" fill="none"/>
        
        <ellipse cx="120" cy="70" rx="48" ry="52" fill="#f4c7a8"/>
        
        <circle cx="95" cy="55" r="2.5" fill="#2d1010"/>
        <circle cx="145" cy="55" r="2.5" fill="#2d1010"/>
        
        <path d="M 90 45 Q 92 42 95 42" stroke="#2d1010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M 150 45 Q 148 42 145 42" stroke="#2d1010" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        
        <ellipse cx="75" cy="60" rx="14" ry="16" fill="#e8a87c"/>
        <ellipse cx="165" cy="60" rx="14" ry="16" fill="#e8a87c"/>
        
        <ellipse cx="120" cy="65" rx="4" ry="5" fill="#f4a17a"/>
        
        <path d="M 100 72 Q 110 76 120 76 Q 130 76 140 72" stroke="#2d1010" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        <path d="M 70 20 Q 65 8 70 5 L 80 2 L 150 2 L 160 2 L 170 5 Q 175 8 170 20 L 165 40 L 75 40 Z" 
          fill="#ea5a67" stroke="#d63447" strokeWidth="3"/>
        
        <ellipse cx="120" cy="20" rx="52" ry="18" fill="#ffffff"/>
        
        <circle cx="120" cy="2" r="7" fill="#f5e6d3" stroke="#e8e8e8" strokeWidth="2"/>
        
        <ellipse cx="100" cy="120" rx="50" ry="20" fill="#ffffff"/>
        
        <path d="M 15 110 L 5 105 L 2 95 L 5 85 L 12 82 L 20 85 L 25 95 L 20 105 Z" 
          fill="#d4954a" stroke="#2d1010" strokeWidth="2"/>
        
        <line x1="20" y1="95" x2="80" y2="70" stroke="#d4954a" strokeWidth="6" strokeLinecap="round"/>
        <line x1="20" y1="95" x2="80" y2="70" stroke="#e8b76a" strokeWidth="4" strokeLinecap="round"/>
        
        <path d="M 60 22 L 45 10 L 50 8 L 60 15 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
        <circle cx="50" cy="8" r="3" fill="#fef3c7"/>
        <line x1="47" y1="6" x2="43" y2="3" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="53" y1="6" x2="57" y2="3" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="50" y1="5" x2="50" y2="1" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default DedMoroz;