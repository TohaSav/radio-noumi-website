import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            🎵
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-white text-lg font-medium">
            Загружаем радио...
          </div>
          <div className="w-48 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-white/60 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
