import { useState } from "react";
import { Track } from "@/types/track";

export const useAudioPlayer = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null,
  );

  const handlePlayPause = (track: Track) => {
    if (!track.audioFile) return;

    if (currentlyPlaying === track.id) {
      // Pause current track
      audioElement?.pause();
      setCurrentlyPlaying(null);
    } else {
      // Stop previous track if playing
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }

      // Play new track
      const audio = new Audio(track.audioFile);
      audio.play().catch(console.error);
      audio.onended = () => setCurrentlyPlaying(null);
      setAudioElement(audio);
      setCurrentlyPlaying(track.id);
    }
  };

  return {
    currentlyPlaying,
    handlePlayPause,
  };
};
