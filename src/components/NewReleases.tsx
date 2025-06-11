import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Release {
  id: number;
  name: string;
  cover: string;
  likes: number;
  dislikes: number;
  userVote?: "like" | "dislike" | null;
}

const NewReleases = () => {
  const [isAdmin] = useState(false); // В реальном приложении это будет из контекста auth
  const [releases, setReleases] = useState<Release[]>([
    {
      id: 1,
      name: "Neon Nights",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=center",
      likes: 342,
      dislikes: 12,
    },
    {
      id: 2,
      name: "Digital Dreams",
      cover:
        "https://images.unsplash.com/photo-1571974599782-87624638275c?w=200&h=200&fit=crop&crop=center",
      likes: 156,
      dislikes: 8,
    },
    {
      id: 3,
      name: "Cosmic Dance",
      cover:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop&crop=center",
      likes: 89,
      dislikes: 3,
    },
  ]);

  const [newReleaseName, setNewReleaseName] = useState("");
  const [uploadedCover, setUploadedCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");

  const handleVote = (releaseId: number, voteType: "like" | "dislike") => {
    setReleases((prev) =>
      prev.map((release) => {
        if (release.id !== releaseId) return release;

        const currentVote = release.userVote;
        let newLikes = release.likes;
        let newDislikes = release.dislikes;
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
          ...release,
          likes: newLikes,
          dislikes: newDislikes,
          userVote: newVote,
        };
      }),
    );
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedCover(file);
      const reader = new FileReader();
      reader.onload = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAddRelease = () => {
    if (!newReleaseName.trim() || !uploadedCover) return;

    const newRelease: Release = {
      id: Date.now(),
      name: newReleaseName.trim(),
      cover: coverPreview,
      likes: 0,
      dislikes: 0,
    };

    setReleases((prev) => [newRelease, ...prev]);
    setNewReleaseName("");
    setUploadedCover(null);
    setCoverPreview("");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 font-montserrat">
        Новинки
      </h2>

      {isAdmin && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-4 text-gray-700">
            Добавить новинку (Админ)
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Название трека"
              value={newReleaseName}
              onChange={(e) => setNewReleaseName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Обложка (200x200px)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Preview"
                  className="mt-2 w-20 h-20 object-cover rounded-lg"
                />
              )}
            </div>
            <button
              onClick={handleAddRelease}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Добавить новинку
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {releases.map((release) => (
          <div
            key={release.id}
            className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
          >
            <div className="relative mb-4">
              <img
                src={release.cover}
                alt={release.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full hover:bg-white transition-colors shadow-lg">
                <Icon name="Play" size={24} className="text-purple-600" />
              </button>
            </div>

            <h3 className="font-semibold text-gray-800 mb-3 text-center">
              {release.name}
            </h3>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleVote(release.id, "like")}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                  release.userVote === "like"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-green-100"
                }`}
              >
                <Icon name="ThumbsUp" size={16} />
                <span>{release.likes}</span>
              </button>

              <button
                onClick={() => handleVote(release.id, "dislike")}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                  release.userVote === "dislike"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-red-100"
                }`}
              >
                <Icon name="ThumbsDown" size={16} />
                <span>{release.dislikes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
