export const formatTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) return `${hours}ч`;
  if (minutes > 0) return `${minutes}м`;
  return "только что";
};

export const emojis = ["❤️", "😍", "😂", "😮", "😢", "👏", "🔥", "💯"];
