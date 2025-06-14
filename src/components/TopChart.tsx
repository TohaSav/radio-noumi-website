const TopChart = () => {
  const tracks = [
    {
      id: 1,
      title: "Популярный трек 1",
      artist: "Исполнитель 1",
      plays: "1.2M",
    },
    {
      id: 2,
      title: "Популярный трек 2",
      artist: "Исполнитель 2",
      plays: "980K",
    },
    {
      id: 3,
      title: "Популярный трек 3",
      artist: "Исполнитель 3",
      plays: "850K",
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">🔥 Топ чарт</h2>
      <div className="space-y-3">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
          >
            <span className="text-white font-bold text-lg w-6">
              #{index + 1}
            </span>
            <div className="flex-1">
              <h3 className="text-white font-medium">{track.title}</h3>
              <p className="text-white/70 text-sm">{track.artist}</p>
            </div>
            <span className="text-white/60 text-sm">{track.plays}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopChart;
