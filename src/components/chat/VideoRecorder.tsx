import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface VideoRecorderProps {
  onVideoSend: (videoBlob: Blob, duration: number, thumbnail: string) => void;
}

const VideoRecorder = ({ onVideoSend }: VideoRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const generateThumbnail = (video: HTMLVideoElement): string => {
    const canvas = document.createElement("canvas");
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, 200, 200);
      return canvas.toDataURL("image/jpeg", 0.8);
    }
    return "";
  };

  const checkCameraPermission = async () => {
    try {
      const result = await navigator.permissions.query({
        name: "camera" as PermissionName,
      });
      setHasPermission(result.state === "granted");
      return result.state === "granted";
    } catch (error) {
      return null;
    }
  };

  const startRecording = async () => {
    try {
      setPermissionError(null);

      await checkCameraPermission();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 400 },
          height: { ideal: 400 },
          aspectRatio: 1,
          facingMode: "user",
        },
        audio: true,
      });

      setHasPermission(true);
      streamRef.current = stream;

      if (previewVideoRef.current) {
        previewVideoRef.current.srcObject = stream;
        previewVideoRef.current.play();
      }

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
      });
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setVideoBlob(blob);

        // Создаем превью для генерации миниатюры
        const video = document.createElement("video");
        video.src = URL.createObjectURL(blob);
        video.currentTime = 1;
        video.onloadeddata = () => {
          const thumb = generateThumbnail(video);
          setThumbnail(thumb);
        };

        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error: any) {
      console.error("Ошибка доступа к камере:", error);
      setHasPermission(false);

      if (error.name === "NotAllowedError") {
        setPermissionError(
          "Доступ к камере запрещен. Разрешите использование камеры в настройках браузера.",
        );
      } else if (error.name === "NotFoundError") {
        setPermissionError("Камера не найдена. Проверьте подключение камеры.");
      } else if (error.name === "NotSupportedError") {
        setPermissionError("Запись видео не поддерживается в вашем браузере.");
      } else {
        setPermissionError(
          "Не удалось получить доступ к камере. Попробуйте еще раз.",
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
    if (videoBlob && !isPlaying && videoRef.current) {
      videoRef.current.src = URL.createObjectURL(videoBlob);
      videoRef.current.play();
      setIsPlaying(true);

      videoRef.current.onended = () => {
        setIsPlaying(false);
      };
    } else if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const sendRecording = () => {
    if (videoBlob && thumbnail) {
      onVideoSend(videoBlob, recordingTime, thumbnail);
      setVideoBlob(null);
      setThumbnail(null);
      setRecordingTime(0);
    }
  };

  const cancelRecording = () => {
    setVideoBlob(null);
    setThumbnail(null);
    setRecordingTime(0);
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Если есть записанное видео - показываем превью
  if (videoBlob && thumbnail) {
    return (
      <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
        <div className="relative">
          <video
            ref={videoRef}
            className="w-12 h-12 rounded-lg object-cover"
            poster={thumbnail}
            muted
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={playRecording}
            className="absolute inset-0 h-12 w-12 p-0 text-white hover:bg-black/20 rounded-lg"
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-white text-sm">
          <Icon name="Video" size={14} />
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

  // Если идет запись - показываем превью с камеры
  if (isRecording) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-4">
          <div className="relative mb-4">
            <video
              ref={previewVideoRef}
              className="w-64 h-64 rounded-xl object-cover"
              muted
              autoPlay
            />
            <div className="absolute top-3 left-3 bg-red-500/90 text-white px-2 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {formatTime(recordingTime)}
            </div>
          </div>
          <div className="flex justify-center gap-3">
            <Button
              variant="ghost"
              size="lg"
              onClick={stopRecording}
              className="h-12 px-6 text-white hover:bg-white/20 bg-red-500/20"
            >
              <Icon name="Square" size={20} className="mr-2" />
              Остановить
            </Button>
          </div>
        </div>
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
          <div className="font-medium mb-1">Запись видео запрещена</div>
          <div className="text-red-300">{permissionError}</div>
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
      title="Видео сообщение"
    >
      <Icon name="Video" size={20} />
    </Button>
  );
};

export default VideoRecorder;
