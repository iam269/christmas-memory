import { useEffect, useState } from 'react';

const EasterEgg = () => {
  const [triggered, setTriggered] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  
  // Konami-style code: up up down down left right left right
  const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.key].slice(-8);
      setSequence(newSequence);
      
      if (newSequence.join(',') === secretCode.join(',')) {
        setTriggered(true);
        setTimeout(() => setTriggered(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequence]);

  if (!triggered) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      <div className="text-center animate-scale-in">
        <span className="text-8xl block mb-4">🎅</span>
        <p className="text-2xl font-display text-accent text-shadow-glow">
          Ho Ho Ho! Merry Christmas! 🎄✨
        </p>
      </div>
      
      {/* Falling presents */}
      {[...Array(30)].map((_, i) => (
        <span
          key={i}
          className="absolute text-4xl animate-[snowfall_3s_linear_forwards]"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-50px',
            animationDelay: `${Math.random() * 2}s`,
          }}
        >
          {['🎁', '🎄', '⭐', '❄️'][Math.floor(Math.random() * 4)]}
        </span>
      ))}
    </div>
  );
};

export default EasterEgg;
