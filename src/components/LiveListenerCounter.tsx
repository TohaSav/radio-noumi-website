import { useState } from "react";

const LiveListenerCounter = () => {
  const [listeners] = useState(() => {
    const { min, max } = getTimeBasedRange();
    return min + Math.floor(Math.random() * (max - min));
  });

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getTimeBasedRange = () => {
    const now = new Date();
    // Уральское время (UTC+5)
    const uralTime = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    const hour = uralTime.getHours();

    if (hour >= 9 && hour < 15) {
      return { min: 3150129, max: 12458760 };
    } else if (hour >= 15 && hour < 21) {
      return { min: 4789236, max: 78960456 };
    } else if (hour >= 21 || hour < 3) {
      return { min: 7963509, max: 96350521 };
    } else {
      return { min: 5698750, max: 9321456 };
    }
  };

  return (
    <span className="text-xl font-semibold">
      {formatNumber(listeners)} слушателей
    </span>
  );
};

export default LiveListenerCounter;
