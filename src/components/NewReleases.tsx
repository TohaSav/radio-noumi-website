import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/hooks/useAuth";

interface Song {
  id: number;
  title: string;
  audioFile: File;
  audioUrl: string;
  cover: string;
}

const NewReleases = () => {
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
      // Пауза
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      // Останавливаем все другие треки
      Object.values(audioRefs.current).forEach((a) => a.pause());

      // Играем выбранный трек
      audio.play();
      setCurrentlyPlaying(songId);
    }

    // Обработчик окончания трека
    audio.onended = () => setCurrentlyPlaying(null);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/50">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Новинки
      </h2>

      {isAdmin && (
        <div className="mb-10 p-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl border-2 border-purple-200 shadow-lg">
          <h3 className="font-bold mb-6 text-purple-900 text-xl">
            Добавить новую песню
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Обложка (200x200px)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {coverPreview && (
                <div className="mt-3">
                  <img
                    src={coverPreview}
                    alt="Превью обложки"
                    className="w-[200px] h-[200px] object-cover rounded-lg border-2 border-gray-200"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Добавить песню
            </button>
          </div>
        </div>
      )}

      {songs.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Icon name="Music" size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-xl mb-2">Пока нет новинок</p>
          <p className="text-sm">Следите за обновлениями!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {songs.map((song) => (
            <div
              key={song.id}
              className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-purple-100"
            >
              <div className="relative mb-4 group">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-full h-[200px] object-cover rounded-lg"
                />

                {/* Мини-плеер на обложке */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => togglePlay(song.id)}
                    className="bg-white/90 hover:bg-white p-4 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform"
                  >
                    <Icon
                      name={currentlyPlaying === song.id ? "Pause" : "Play"}
                      size={28}
                      className="text-purple-600"
                    />
                  </button>
                </div>

                {/* Скрытый аудио элемент */}
                <audio
                  ref={(el) => {
                    if (el) audioRefs.current[song.id] = el;
                  }}
                  src={song.audioUrl}
                  preload="metadata"
                />
              </div>

              <h3 className="font-semibold text-gray-800 text-center text-sm leading-tight">
                {song.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewReleases;
