import { useRef, useCallback } from "react";
import { AudioData } from "@/types/radio";

export const useAudioAnalysis = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number>();

  const setupAudioAnalysis = useCallback((audioElement: HTMLAudioElement) => {
    if (audioContextRef.current) return;

    try {
      audioContextRef.current = new AudioContext();
      const source =
        audioContextRef.current.createMediaElementSource(audioElement);
      analyserRef.current = audioContextRef.current.createAnalyser();

      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    } catch (error) {
      console.warn("Web Audio API not supported:", error);
    }
  }, []);

  const analyzeAudio = useCallback(
    (setAudioData: (data: AudioData) => void) => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      const bassEnd = Math.floor(dataArrayRef.current.length * 0.1);
      const midEnd = Math.floor(dataArrayRef.current.length * 0.4);

      let bassSum = 0;
      let midSum = 0;
      let trebleSum = 0;
      let overallSum = 0;

      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const value = dataArrayRef.current[i];
        overallSum += value;

        if (i < bassEnd) {
          bassSum += value;
        } else if (i < midEnd) {
          midSum += value;
        } else {
          trebleSum += value;
        }
      }

      setAudioData({
        bassLevel: bassSum / bassEnd / 255,
        midLevel: midSum / (midEnd - bassEnd) / 255,
        trebleLevel: trebleSum / (dataArrayRef.current.length - midEnd) / 255,
        overall: overallSum / dataArrayRef.current.length / 255,
      });

      animationFrameRef.current = requestAnimationFrame(() =>
        analyzeAudio(setAudioData),
      );
    },
    [],
  );

  const stopAnalysis = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);

  return {
    setupAudioAnalysis,
    analyzeAudio,
    stopAnalysis,
  };
};
