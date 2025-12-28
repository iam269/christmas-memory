import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useRef } from 'react';

const SoundToggle = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for ambient Christmas music
    // Using a royalty-free Christmas melody
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
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
      title={isMuted ? 'Turn on music' : 'Turn off music'}
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
