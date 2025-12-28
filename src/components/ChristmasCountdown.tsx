import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ChristmasCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isChristmas, setIsChristmas] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let christmas = new Date(currentYear, 11, 25); // December 25

      // If Christmas has passed, target next year
      if (now > christmas) {
        christmas = new Date(currentYear + 1, 11, 25);
      }

      const difference = christmas.getTime() - now.getTime();

      if (difference <= 0) {
        setIsChristmas(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isChristmas) {
    return (
      <div className="glass-card p-8 text-center glow-red animate-pulse-glow">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-gradient-christmas mb-4">
          🎄 Crăciun fericit! 🎄
        </h2>
        <p className="text-foreground/80 text-lg">
          Îți dorim bucurie și fericire!
        </p>
      </div>
    );
  }

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl" />
        
        {/* Main number block */}
        <div className="relative glass-card w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center glow-red">
          <span className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient-gold tabular-nums">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
        
        {/* Decorative corners */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-accent/50 rounded-tl" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-accent/50 rounded-tr" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-accent/50 rounded-bl" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-accent/50 rounded-br" />
      </div>
      
      <span className="mt-2 text-xs sm:text-sm uppercase tracking-wider text-foreground/60 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="text-center">
      {/* Title */}
      <div className="mb-6">
        <span className="text-4xl mb-2 block">🎅</span>
        <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">
          Timp până la Crăciun
        </h3>
        <div className="flex justify-center gap-1 mt-2">
          {['❄️', '🎄', '⭐', '🎄', '❄️'].map((emoji, i) => (
            <span key={i} className="text-sm opacity-60">{emoji}</span>
          ))}
        </div>
      </div>

      {/* Countdown blocks */}
      <div className="flex justify-center gap-3 sm:gap-4 md:gap-6">
        <TimeBlock value={timeLeft.days} label="Zile" />
        
        {/* Separator */}
        <div className="flex flex-col justify-center gap-2 text-accent/60 font-bold text-xl">
          <span className="animate-pulse">:</span>
        </div>
        
        <TimeBlock value={timeLeft.hours} label="Ore" />
        
        <div className="flex flex-col justify-center gap-2 text-accent/60 font-bold text-xl">
          <span className="animate-pulse">:</span>
        </div>
        
        <TimeBlock value={timeLeft.minutes} label="Min" />
        
        <div className="hidden sm:flex flex-col justify-center gap-2 text-accent/60 font-bold text-xl">
          <span className="animate-pulse">:</span>
        </div>
        
        <div className="hidden sm:block">
          <TimeBlock value={timeLeft.seconds} label="Sec" />
        </div>
      </div>

      {/* Decorative message */}
      <p className="mt-6 text-foreground/50 text-sm italic">
        ✨ Magia este aproape! ✨
      </p>
    </div>
  );
};

export default ChristmasCountdown;
