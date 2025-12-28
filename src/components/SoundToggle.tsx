import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Try to load a local Mariah Carey mp3 placed in `public/mariah-carey.mp3`.
    // If not available, fall back to a royalty-free example.
    const localSrc = '/mariah-carey.mp3';
    const fallbackSrc = 'public/Mariah Carey - All I Want For Christmas Is You (Official Video).mp3';

    const audio = new Audio(localSrc);
    audio.loop = true;
    audio.volume = 0.3;

    const onError = () => {
      // fallback if local file not found or can't be loaded
      audio.src = fallbackSrc;
      audio.load();
    };

    audio.addEventListener('error', onError);
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', onError);
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    } else {
      audioRef.current.pause();
    }
    setIsMuted(!isMuted);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSound}
      className="rounded-full bg-muted/30 hover:bg-muted/50 transition-colors"
      title={isMuted ? 'Activează muzica' : 'Dezactivează muzica'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      ) : (
        <Volume2 className="w-5 h-5 text-secondary" />
      )}
    </Button>
  );
};

export default SoundToggle;
