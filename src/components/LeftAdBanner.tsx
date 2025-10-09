const LeftAdBanner = () => {
  return (
    <div className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div 
        className="bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden"
        style={{ width: '250px', height: '300px' }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative">
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-tr-full"></div>
          
          <div className="text-slate-400 text-sm mb-3 font-medium">Рекламное место</div>
          <div className="text-6xl mb-3 animate-pulse">📢</div>
          <div className="text-slate-300 text-lg font-bold mb-2">250 × 300</div>
          <div className="text-slate-500 text-xs mb-4">Реклама здесь</div>
          
          <a
            href="https://wa.me/79049808275?text=Здравствуйте!%20Хочу%20разместить%20рекламу%20на%20Radio%20Noumi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            📱 WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeftAdBanner;