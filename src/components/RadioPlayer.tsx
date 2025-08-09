import { useEffect } from "react";

interface RadioPlayerProps {
  streamUrl?: string;
  onPlayingChange?: (isPlaying: boolean) => void;
  onAudioData?: (data: {
    bass: number;
    mid: number;
    treble: number;
    overall: number;
  }) => void;
}

const RadioPlayer = (props: RadioPlayerProps) => {
  // Загружаем скрипт плеера при монтировании компонента
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://myradio24.com/player/player.js?v3.31';
    script.setAttribute('data-radio', '61673');
    script.setAttribute('data-interval', '15');
    script.setAttribute('data-vmid', '0');
    script.setAttribute('data-lang', 'ru');
    script.async = true;
    
    document.body.appendChild(script);

    return () => {
      // Очищаем скрипт при размонтировании
      const existingScript = document.querySelector('script[src*="myradio24.com/player/player.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        id="my_player" 
        className="my_player" 
        data-player="adaptive" 
        data-skin="" 
        data-width="200" 
        data-autoplay="1" 
        data-volume="70" 
        data-streamurl="https://myradio24.org/61673"
      />
    </div>
  );
};

export default RadioPlayer;