const LeftAdBanner = () => {
  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="w-[250px] h-[300px] bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative">
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-tr-full"></div>
          
          <div className="text-slate-400 text-sm mb-4 font-medium">Рекламное место</div>
          <div className="text-6xl mb-4 animate-pulse">📢</div>
          <div className="text-slate-300 text-lg font-bold mb-2">250 × 300</div>
          <div className="text-slate-500 text-xs">Реклама здесь</div>
        </div>
      </div>
    </div>
  );
};

export default LeftAdBanner;
