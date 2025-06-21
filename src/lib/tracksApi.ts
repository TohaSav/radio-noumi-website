import { Track } from "@/types/track";

const API_BASE = "https://jsonbin.io/v3/b";
const API_KEY = "$2a$10$VdFhQkTlX8pYvQzN5mH9uOGKvP8wR4tE6sL2fA9cB1nM3xS7vD4zA";

export const tracksApi = {
  // Получить все треки
  async getTracks(): Promise<Track[]> {
    try {
      const response = await fetch(
        `${API_BASE}/673d2e8fad19ca34f8c7f123/latest`,
        {
          headers: {
            "X-Master-Key": API_KEY,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tracks");
      }

      const data = await response.json();
      const cloudTracks = data.record?.tracks || [];

      // Получаем локальные треки
      const saved = localStorage.getItem("noumi-tracks");
      const localTracks = saved ? JSON.parse(saved) : [];

      // Объединяем облачные и локальные треки, исключая дубликаты
      const allTracks = [...cloudTracks];
      localTracks.forEach((localTrack: Track) => {
        if (!allTracks.find((track) => track.id === localTrack.id)) {
          allTracks.push(localTrack);
        }
      });

      return allTracks;
    } catch (error) {
      console.warn(
        "Failed to load tracks from cloud, using localStorage:",
        error,
      );
      const saved = localStorage.getItem("noumi-tracks");
      return saved ? JSON.parse(saved) : [];
    }
  },

  // Сохранить треки
  async saveTracks(tracks: Track[]): Promise<void> {
    try {
      // Сначала сохраняем локально для мгновенного обновления
      localStorage.setItem("noumi-tracks", JSON.stringify(tracks));

      // Уведомляем о изменениях сразу
      window.dispatchEvent(new CustomEvent("tracksUpdated"));

      // Затем пытаемся сохранить в облако
      const response = await fetch(`${API_BASE}/673d2e8fad19ca34f8c7f123`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
        },
        body: JSON.stringify({ tracks }),
      });

      if (!response.ok) {
        console.warn("Failed to save to cloud, but local save completed");
      }
    } catch (error) {
      console.warn(
        "Failed to save tracks to cloud, using localStorage:",
        error,
      );
      // Локальное сохранение уже выполнено выше
      localStorage.setItem("noumi-tracks", JSON.stringify(tracks));
      window.dispatchEvent(new CustomEvent("tracksUpdated"));
    }
  },
};
