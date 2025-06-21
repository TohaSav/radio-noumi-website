import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface VoiceRecorderProps {
  onVoiceSend: (audioBlob: Blob, duration: number) => void;
}

const VoiceRecorder = ({ onVoiceSend }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const checkMicrophonePermission = async () => {
    try {
      const result = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });
      setHasPermission(result.state === "granted");
      return result.state === "granted";
    } catch (error) {
      // Fallback если permissions API не поддерживается
      return null;
    }
  };

  const startRecording = async () => {
    try {
      setPermissionError(null);

      // Проверяем разрешения перед запросом
      const hasPermissionCheck = await checkMicrophonePermission();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      setHasPermission(true);
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error: any) {
      console.error("Ошибка доступа к микрофону:", error);
      setHasPermission(false);

      if (error.name === "NotAllowedError") {
        setPermissionError(
          "Доступ к микрофону запрещен. Разрешите использование микрофона в настройках браузера.",
        );
      } else if (error.name === "NotFoundError") {
        setPermissionError(
          "Микрофон не найден. Проверьте подключение микрофона.",
        );
      } else if (error.name === "NotSupportedError") {
        setPermissionError("Запись аудио не поддерживается в вашем браузере.");
      } else {
        setPermissionError(
          "Не удалось получить доступ к микрофону. Попробуйте еще раз.",
        );
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);

      audio.onended = () => {
        setIsPlaying(false);
      };
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const sendRecording = () => {
    if (audioBlob) {
      onVoiceSend(audioBlob, recordingTime);
      setAudioBlob(null);
      setRecordingTime(0);
    }
  };

  const cancelRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (audioBlob) {
    return (
      <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={playRecording}
          className="h-8 w-8 p-0 text-white hover:bg-white/20"
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
        </Button>
        <div className="flex items-center gap-2 text-white text-sm">
          <Icon name="Mic" size={14} />
          <span>{formatTime(recordingTime)}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={sendRecording}
          className="h-8 px-2 text-green-400 hover:bg-green-400/20"
        >
          <Icon name="Send" size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={cancelRecording}
          className="h-8 w-8 p-0 text-red-400 hover:bg-red-400/20"
        >
          <Icon name="X" size={14} />
        </Button>
      </div>
    );
  }

  if (isRecording) {
    return (
      <div className="flex items-center gap-2 bg-red-500/20 rounded-lg p-2">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <div className="text-white text-sm font-medium">
          {formatTime(recordingTime)}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={stopRecording}
          className="h-8 px-2 text-white hover:bg-white/20"
        >
          <Icon name="Square" size={14} />
        </Button>
      </div>
    );
  }

  // Показываем ошибку разрешений
  if (permissionError) {
    return (
      <div className="flex items-center gap-2 bg-red-500/20 rounded-lg p-3 max-w-sm">
        <Icon
          name="AlertCircle"
          size={16}
          className="text-red-400 flex-shrink-0"
        />
        <div className="text-xs text-red-200">
          <div className="font-medium mb-1">Запись видео и аудио запрещена</div>
          <div className="text-red-300">
            Ваша организация запретила использовать камеру, микрофон и удаленный
            рабочий стол на этой странице. Чтобы начать запись, обратитесь к
            системному администратору.
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPermissionError(null)}
          className="h-8 px-2 text-red-400 hover:bg-red-400/20 flex-shrink-0"
        >
          Понятно
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={startRecording}
      className="h-12 px-3 text-white hover:text-purple-600 hover:bg-purple-50"
      title="Голосовое сообщение"
    >
      <Icon name="Mic" size={20} />
    </Button>
  );
};

export default VoiceRecorder;
