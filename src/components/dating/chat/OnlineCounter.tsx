import { useState, useEffect } from "react";

interface OnlineCounterProps {
  className?: string;
}

const OnlineCounter = ({ className = "" }: OnlineCounterProps) => {
  const [onlineCount, setOnlineCount] = useState(1500000);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setOnlineCount((prev) => {
          const changePercent = (Math.random() - 0.5) * 0.02;
          const change = Math.floor(prev * changePercent);
          const randomBoost = Math.floor(Math.random() * 2000) - 1000;
          const newCount = prev + change + randomBoost;
          return Math.max(1500, Math.min(1800000, newCount));
        });
      },
      1500 + Math.random() * 3000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex items-center gap-2 text-xs text-green-600 font-medium ${className}`}
    >
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse md:w-2 md:h-2 w-1.5 h-1.5"></div>
      <span>
        {onlineCount.toLocaleString()}
        {window.innerWidth < 768 ? " онлайн" : ""}
      </span>
    </div>
  );
};

export default OnlineCounter;
