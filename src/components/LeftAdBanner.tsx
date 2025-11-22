import { useState, useEffect } from "react";

const formatCondolences = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + "B";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const LeftAdBanner = () => {
  const [condolences, setCondolences] = useState(1985352950);
  const [candleClicked, setCandleClicked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('karina_condolences');
    const candleSaved = localStorage.getItem('karina_candle_clicked');
    
    if (saved) {
      setCondolences(parseInt(saved));
    }
    if (candleSaved === 'true') {
      setCandleClicked(true);
    }
  }, []);

  const handleCandleClick = () => {
    if (!candleClicked) {
      const newCount = condolences + 1;
      setCondolences(newCount);
      setCandleClicked(true);
      localStorage.setItem('karina_condolences', newCount.toString());
      localStorage.setItem('karina_candle_clicked', 'true');
    }
  };

  return (
    <div className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div 
        className="bg-gradient-to-br from-slate-900/95 via-slate-950/95 to-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-800/70 shadow-2xl overflow-hidden"
        style={{ width: '250px', minHeight: '300px' }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
          
          <div className="text-slate-500 text-xs mb-3 font-semibold uppercase tracking-wider">Памяти артиста</div>
          
          <div className="mb-4 relative">
            <div className="absolute inset-0 bg-slate-700/30 blur-xl rounded-full"></div>
            <div className="relative text-5xl flex items-center gap-2">
              🕯️
              <span>🖤</span>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="text-slate-300 text-sm font-bold leading-tight">
              21.11.2025 года скоропостижно<br />скончалась наша исполнительница<br />песен Карина
            </div>
            <div className="text-slate-400 text-xs italic">
              Radio Noumi выражает<br />глубокие соболезнования
            </div>
          </div>
          
          <div className="flex items-center justify-center text-3xl mb-3">
            <button
              onClick={handleCandleClick}
              disabled={candleClicked}
              className={`transition-all duration-300 ${
                candleClicked 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:scale-125 cursor-pointer active:scale-110'
              }`}
              title={candleClicked ? 'Вы уже выразили соболезнования' : 'Нажмите, чтобы зажечь свечу'}
            >
              🕯️
            </button>
          </div>
          
          <div className="text-slate-500 text-xs mb-1">Соболезнований:</div>
          <div className="text-slate-200 text-lg font-bold">{formatCondolences(condolences)}</div>
        </div>
      </div>
    </div>
  );
};

export default LeftAdBanner;