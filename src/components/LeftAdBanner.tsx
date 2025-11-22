const LeftAdBanner = () => {
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
            <div className="relative text-5xl">🖤</div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="text-slate-300 text-sm font-bold leading-tight">
              21.11.2025 года скоропостижно<br />скончалась наша исполнительница<br />песен Карина
            </div>
            <div className="text-slate-400 text-xs italic">
              Radio Noumi выражает<br />глубокие соболезнования
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-2xl mb-3">
            <span>❤️</span>
            <span>😢</span>
          </div>
          
          <div className="text-slate-500 text-xs mb-1">Соболезнований:</div>
          <div className="text-slate-200 text-lg font-bold">1.99B</div>
        </div>
      </div>
    </div>
  );
};

export default LeftAdBanner;