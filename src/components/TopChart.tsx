import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Track {
  id: number;
  name: string;
  likes: number;
  dislikes: number;
  userVote?: "like" | "dislike" | null;
}

const TopChart = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);

  const [newTrackName, setNewTrackName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleVote = (trackId: number, voteType: "like" | "dislike") => {
    setTracks((prev) =>
      prev.map((track) => {
        if (track.id !== trackId) return track;

        const currentVote = track.userVote;
        let newLikes = track.likes;
        let newDislikes = track.dislikes;
        let newVote: "like" | "dislike" | null = voteType;

        // Убираем предыдущий голос
        if (currentVote === "like") newLikes--;
        if (currentVote === "dislike") newDislikes--;

        // Если кликнули на уже выбранный вариант, убираем голос
        if (currentVote === voteType) {
          newVote = null;
        } else {
          // Добавляем новый голос
          if (voteType === "like") newLikes++;
          if (voteType === "dislike") newDislikes++;
        }

        return {
          ...track,
          likes: newLikes,
          dislikes: newDislikes,
          userVote: newVote,
        };
      }),
    );
  };

  const handleAddTrack = () => {
    if (!newTrackName.trim() || !uploadedFile) return;

    const newTrack: Track = {
      id: Date.now(),
      name: newTrackName.trim(),
      likes: 0,
      dislikes: 0,
    };

    setTracks((prev) => [newTrack, ...prev]);
    setNewTrackName("");
    setUploadedFile(null);
  };

  const sortedTracks = [...tracks].sort((a, b) => b.likes - a.likes);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 font-montserrat">
          Топ Чарт
        </h2>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            isAdmin
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          {isAdmin ? "Выйти из админки" : "Админ"}
        </button>
      </div>

      {isAdmin && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-4 text-gray-700">
            Добавить трек (Админ)
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Название трека"
              value={newTrackName}
              onChange={(e) => setNewTrackName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleAddTrack}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Добавить трек
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {sortedTracks.map((track, index) => (
          <div
            key={track.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <span className="font-medium text-gray-800">{track.name}</span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleVote(track.id, "like")}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                  track.userVote === "like"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-green-100"
                }`}
              >
                <Icon name="ThumbsUp" size={16} />
                <span>{track.likes}</span>
              </button>

              <button
                onClick={() => handleVote(track.id, "dislike")}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                  track.userVote === "dislike"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-red-100"
                }`}
              >
                <Icon name="ThumbsDown" size={16} />
                <span>{track.dislikes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopChart;
