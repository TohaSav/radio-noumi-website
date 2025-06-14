const Stories = () => {
  const stories = [
    { id: 1, title: "Рок", emoji: "🎸", active: true },
    { id: 2, title: "Поп", emoji: "🎤", active: false },
    { id: 3, title: "Джаз", emoji: "🎷", active: false },
    { id: 4, title: "Классика", emoji: "🎼", active: false },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {stories.map((story) => (
        <div
          key={story.id}
          className={`flex-shrink-0 w-20 h-20 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
            story.active
              ? "bg-white/20 border-2 border-white"
              : "bg-white/10 border border-white/20 hover:bg-white/15"
          }`}
        >
          <span className="text-2xl mb-1">{story.emoji}</span>
          <span className="text-white text-xs font-medium">{story.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
