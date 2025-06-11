import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

interface Song {
  id: number;
  title: string;
  audioFile: File;
  audioUrl: string;
  cover: string;
  likes: number;
  dislikes: number;
  userReaction: "like" | "dislike" | null;
}

const TopChart = () => {
  const { isAdmin } = useAuth();
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});

  // Форма добавления
  const [songTitle, setSongTitle] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      const reader = new FileReader();
      reader.onload = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    }
  };

  const handleAddSong = () => {
    if (!songTitle.trim() || !audioFile || !coverFile) return;

    const audioUrl = URL.createObjectURL(audioFile);
    const newSong: Song = {
      id: Date.now(),
      title: songTitle.trim(),
      audioFile,
      audioUrl,
      cover: coverPreview,
      likes: 0,
      dislikes: 0,
      userReaction: null,
    };

    setSongs((prev) => [newSong, ...prev]);

    // Очищаем форму
    setSongTitle("");
    setAudioFile(null);
    setCoverFile(null);
    setCoverPreview("");
  };

  const togglePlay = (songId: number) => {
    const audio = audioRefs.current[songId];
    if (!audio) return;

    if (currentlyPlaying === songId) {
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      Object.values(audioRefs.current).forEach((a) => a.pause());
      audio.play();
      setCurrentlyPlaying(songId);
    }

    audio.onended = () => setCurrentlyPlaying(null);
  };

  const handleReaction = (songId: number, reaction: "like" | "dislike") => {
    setSongs((prev) =>
      prev.map((song) => {
        if (song.id !== songId) return song;

        const newSong = { ...song };

        // Убираем предыдущую реакцию
        if (song.userReaction === "like") newSong.likes--;
        if (song.userReaction === "dislike") newSong.dislikes--;

        // Добавляем новую реакцию (или убираем, если та же)
        if (song.userReaction === reaction) {
          newSong.userReaction = null;
        } else {
          newSong.userReaction = reaction;
          if (reaction === "like") newSong.likes++;
          if (reaction === "dislike") newSong.dislikes++;
        }

        return newSong;
      }),
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Топ Чарт</h2>

      {isAdmin && (
        <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
          <h3 className="font-semibold mb-4 text-orange-800 text-lg">
            Добавить песню в чарт
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название песни
              </label>
              <input
                type="text"
                placeholder="Введите название песни"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Обложка (50x50px)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {coverPreview && (
                <div className="mt-3">
                  <img
                    src={coverPreview}
                    alt="Превью обложки"
                    className="w-[50px] h-[50px] object-cover rounded border-2 border-gray-200"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Аудиофайл
              </label>
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {audioFile && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ Файл выбран: {audioFile.name}
                </p>
              )}
            </div>

            <button
              onClick={handleAddSong}
              disabled={!songTitle.trim() || !audioFile || !coverFile}
              className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Добавить в чарт
            </button>
          </div>
        </div>
      )}

      {songs.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Icon
            name="TrendingUp"
            size={64}
            className="mx-auto mb-4 opacity-30"
          />
          <p className="text-xl mb-2">Чарт пуст</p>
          <p className="text-sm">Добавьте первую песню!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-shadow"
            >
              {/* Позиция в чарте */}
              <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>

              {/* Обложка с плеером */}
              <div className="relative flex-shrink-0 group">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-[50px] h-[50px] object-cover rounded"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded flex items-center justify-center">
                  <button
                    onClick={() => togglePlay(song.id)}
                    className="bg-white/90 hover:bg-white p-1 rounded-full shadow-md transform scale-75 group-hover:scale-100 transition-transform"
                  >
                    <Icon
                      name={currentlyPlaying === song.id ? "Pause" : "Play"}
                      size={16}
                      className="text-orange-600"
                    />
                  </button>
                </div>

                <audio
                  ref={(el) => {
                    if (el) audioRefs.current[song.id] = el;
                  }}
                  src={song.audioUrl}
                  preload="metadata"
                />
              </div>

              {/* Название песни */}
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {song.title}
                </h3>
              </div>

              {/* Кнопки лайк/дизлайк */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleReaction(song.id, "like")}
                  className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                    song.userReaction === "like"
                      ? "bg-green-100 text-green-600"
                      : "hover:bg-green-50 text-gray-600"
                  }`}
                >
                  <Icon name="ThumbsUp" size={16} />
                  <span className="text-sm font-medium">{song.likes}</span>
                </button>

                <button
                  onClick={() => handleReaction(song.id, "dislike")}
                  className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                    song.userReaction === "dislike"
                      ? "bg-red-100 text-red-600"
                      : "hover:bg-red-50 text-gray-600"
                  }`}
                >
                  <Icon name="ThumbsDown" size={16} />
                  <span className="text-sm font-medium">{song.dislikes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopChart;
