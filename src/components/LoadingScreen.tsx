import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const christmasItems = [
    { emoji: '🎄', label: 'Brad de Crăciun' },
    { emoji: '🎁', label: 'Cadouri' },
    { emoji: '⭐', label: 'Stele' },
    { emoji: '🦌', label: 'Ren' },
    { emoji: '🎅', label: 'Moș Crăciun' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExiting(true);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const activeItems = Math.floor((progress / 100) * christmasItems.length);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-night transition-opacity duration-500 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Snowflakes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-snow/30 animate-fall"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              fontSize: `${10 + Math.random() * 15}px`,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Christmas Tree with glow */}
        <div className="relative mb-8">
          <div className="absolute inset-0 blur-3xl bg-christmas-green/30 rounded-full scale-150" />
          <div className="text-8xl sm:text-9xl animate-bounce-gentle relative">
            🎄
          </div>
          {/* Star on top */}
          <div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl"
            style={{ 
              animation: 'twinkle 1s ease-in-out infinite',
              textShadow: '0 0 20px hsl(var(--christmas-gold))'
            }}
          >
            ⭐
          </div>
        </div>

        {/* Loading text */}
        <h1 className="text-3xl sm:text-4xl font-script text-gradient-gold mb-2">
          Se încarcă magia de Crăciun
        </h1>
        <p className="text-foreground/60 text-sm mb-8">
          Se pregătește spiritul sărbătorilor...
        </p>

        {/* Progress bar */}
        <div className="w-64 sm:w-80 mx-auto mb-8">
          <div className="h-3 bg-muted/30 rounded-full overflow-hidden border border-accent/20">
            <div
              className="h-full bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-green rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
          <p className="text-foreground/50 text-xs mt-2">{progress}%</p>
        </div>

        {/* Christmas items loading */}
        <div className="flex justify-center gap-4 sm:gap-6">
          {christmasItems.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center transition-all duration-300 ${
                index < activeItems
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-30 scale-75 translate-y-2'
              }`}
            >
              <span
                className={`text-2xl sm:text-3xl ${
                  index < activeItems ? 'animate-bounce-gentle' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.emoji}
              </span>
              <span className="text-[10px] sm:text-xs text-foreground/50 mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="mt-10 flex justify-center gap-2">
          {['❄️', '🔔', '🎀', '🔔', '❄️'].map((emoji, i) => (
            <span
              key={i}
              className="text-lg opacity-40 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
