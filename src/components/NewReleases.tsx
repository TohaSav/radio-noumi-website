const NewReleases = () => {
  const releases = [
    { id: 1, title: "Новый релиз 1", artist: "Артист 1", date: "Сегодня" },
    { id: 2, title: "Новый релиз 2", artist: "Артист 2", date: "Вчера" },
    { id: 3, title: "Новый релиз 3", artist: "Артист 3", date: "2 дня назад" },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">🆕 Новые релизы</h2>
      <div className="grid gap-4">
        {releases.map((release) => (
          <div
            key={release.id}
            className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🎵</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium">{release.title}</h3>
              <p className="text-white/70 text-sm">{release.artist}</p>
            </div>
            <span className="text-white/60 text-sm">{release.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
