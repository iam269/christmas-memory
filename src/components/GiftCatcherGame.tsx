import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Play, RotateCcw, Trophy } from 'lucide-react';

interface Gift {
  id: number;
  x: number;
  y: number;
  emoji: string;
  speed: number;
}

const GIFT_EMOJIS = ['🎁', '🎄', '⭐', '🔔', '🍪', '🎅'];
const GAME_WIDTH = 320;
const GAME_HEIGHT = 400;
const BASKET_WIDTH = 60;
const GIFT_SIZE = 30;

const GiftCatcherGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [basketX, setBasketX] = useState(GAME_WIDTH / 2 - BASKET_WIDTH / 2);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const gameRef = useRef<HTMLDivElement>(null);
  const giftIdRef = useRef(0);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('christmas-gift-high-score');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  // Handle mouse/touch movement
  const handleMove = useCallback((clientX: number) => {
    if (!gameRef.current || !isPlaying) return;
    const rect = gameRef.current.getBoundingClientRect();
    const x = clientX - rect.left - BASKET_WIDTH / 2;
    setBasketX(Math.max(0, Math.min(GAME_WIDTH - BASKET_WIDTH, x)));
  }, [isPlaying]);

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  // Spawn gifts
  useEffect(() => {
    if (!isPlaying) return;

    const spawnInterval = setInterval(() => {
      const newGift: Gift = {
        id: giftIdRef.current++,
        x: Math.random() * (GAME_WIDTH - GIFT_SIZE),
        y: -GIFT_SIZE,
        emoji: GIFT_EMOJIS[Math.floor(Math.random() * GIFT_EMOJIS.length)],
        speed: 2 + Math.random() * 3,
      };
      setGifts((prev) => [...prev, newGift]);
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [isPlaying]);

  // Move gifts and check collisions
  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      setGifts((prev) => {
        const newGifts: Gift[] = [];
        
        prev.forEach((gift) => {
          const newY = gift.y + gift.speed;
          
          // Check if gift is caught
          if (
            newY + GIFT_SIZE >= GAME_HEIGHT - 40 &&
            newY <= GAME_HEIGHT - 20 &&
            gift.x + GIFT_SIZE >= basketX &&
            gift.x <= basketX + BASKET_WIDTH
          ) {
            setScore((s) => s + 10);
            return; // Don't add to newGifts (caught)
          }
          
          // Check if gift fell off screen
          if (newY > GAME_HEIGHT) {
            return; // Don't add to newGifts (missed)
          }
          
          newGifts.push({ ...gift, y: newY });
        });
        
        return newGifts;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [isPlaying, basketX]);

  // Timer
  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsPlaying(false);
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('christmas-gift-high-score', score.toString());
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setGifts([]);
    setBasketX(GAME_WIDTH / 2 - BASKET_WIDTH / 2);
  };

  return (
    <div className="glass-card p-6 max-w-sm mx-auto">
      <h3 className="text-xl font-display text-center mb-4 text-foreground">
        🎁 Prinde cadouri 🎁
      </h3>

      {/* Score Display */}
      <div className="flex justify-between items-center mb-4 text-sm">
        <span className="text-foreground/80">Scor: <span className="text-accent font-bold">{score}</span></span>
        <span className="text-foreground/80">Timp: <span className="text-primary font-bold">{timeLeft}s</span></span>
        <span className="text-foreground/80 flex items-center gap-1">
          <Trophy className="w-4 h-4 text-accent" /> {highScore}
        </span>
      </div>

      {/* Game Area */}
      <div
        ref={gameRef}
        className={cn(
          'relative bg-night/50 rounded-lg overflow-hidden cursor-none mx-auto',
          'border border-border/30'
        )}
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="absolute text-[8px] text-accent/30 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ✦
            </span>
          ))}
        </div>

        {/* Gifts */}
        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="absolute text-2xl transition-none"
            style={{
              left: gift.x,
              top: gift.y,
              width: GIFT_SIZE,
              height: GIFT_SIZE,
            }}
          >
            {gift.emoji}
          </div>
        ))}

        {/* Basket */}
        <div
          className="absolute bottom-2 transition-none"
          style={{ left: basketX, width: BASKET_WIDTH }}
        >
          <span className="text-4xl">🧺</span>
        </div>

        {/* Start/Game Over Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
                  {gameOver ? (
                <>
                  <p className="text-2xl font-display text-foreground mb-2">
                    {score > highScore - 10 ? '🎉 Bravo!' : 'Joc terminat!'}
                  </p>
                  <p className="text-accent text-lg mb-4">Scor: {score}</p>
                  <Button onClick={startGame} className="btn-christmas">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Joacă din nou
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-lg text-foreground/80 mb-4">
                    Prinde cadourile care cad!
                  </p>
                  <Button onClick={startGame} className="btn-gold">
                    <Play className="w-4 h-4 mr-2" />
                    Începe jocul
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Mută mouse-ul sau folosește degetul pentru a prinde cadourile!
      </p>
    </div>
  );
};

export default GiftCatcherGame;
