import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export default function OnlineCounter() {
  const [count, setCount] = useState(47);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCount((prev) => {
          const change = Math.random() > 0.5 ? 1 : -1;
          const newCount = prev + change;
          return Math.max(20, Math.min(150, newCount));
        });
      },
      8000 + Math.random() * 12000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-green-600 bg-green-50 px-2 py-1 rounded-full">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <Icon name="Users" size={14} />
      <span className="text-xs font-medium">{count}</span>
    </div>
  );
}
