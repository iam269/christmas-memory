import { useState } from 'react';
import Snowfall from '@/components/Snowfall';
import MemoryForm from '@/components/MemoryForm';
import MemoryWall from '@/components/MemoryWall';
import GiftCatcherGame from '@/components/GiftCatcherGame';
import ThemeToggle from '@/components/ThemeToggle';
import SoundToggle from '@/components/SoundToggle';
import AdminPanel from '@/components/AdminPanel';
import EasterEgg from '@/components/EasterEgg';
import ChristmasCountdown from '@/components/ChristmasCountdown';
import LoadingScreen from '@/components/LoadingScreen';
import useMemories from '@/hooks/useMemories';
import { ChevronDown, Gift, TreePine, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { memories, isLoading, addMemory, deleteMemory } = useMemories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  const handleSubmit = async (data: { name: string; message: string; emoji: string }) => {
    setIsSubmitting(true);
    await addMemory(data);
    setIsSubmitting(false);
  };

  const scrollToMemories = () => {
    document.getElementById('memory-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGame = () => {
    document.getElementById('mini-game')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (showLoading) {
    return <LoadingScreen onLoadingComplete={() => setShowLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-night relative">
      <Snowfall />
      <EasterEgg />

      {/* Header Controls */}
      <header className="fixed top-0 left-0 right-0 z-40 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TreePine className="w-6 h-6 text-secondary" />
            <span className="font-display text-lg text-foreground hidden sm:block">
              Amintiri de Crăciun
            </span>
          </div>
          <div className="flex items-center gap-2">
            <SoundToggle />
            <ThemeToggle />
            <AdminPanel isAdmin={isAdmin} onAdminLogin={setIsAdmin} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 relative">
        <div className="text-center animate-fade-in z-20">
          <span className="text-7xl sm:text-8xl block mb-6 float">🎄</span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-script mb-6">
            <span className="text-gradient-gold">Amintirile noastre</span>
            <br />
            <span className="text-gradient-christmas">de Crăciun</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-md mx-auto mb-8">
            Împărtășește momentele și amintirile tale preferate cu prietenii și familia în acest sezon de sărbători
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={scrollToMemories}
              className="btn-christmas text-lg px-8 py-6"
            >
              <Gift className="w-5 h-5 mr-2" />
              Adaugă o amintire 🎁
            </Button>
            <Button
              onClick={scrollToGame}
              variant="outline"
              className="bg-muted/30 border-accent/30 text-foreground hover:bg-muted/50 text-lg px-8 py-6"
            >
              <Gamepad2 className="w-5 h-5 mr-2" />
              Joacă 🎮
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
          <ChevronDown className="w-8 h-8 text-accent/50" />
        </div>

        {/* Decorative ornaments */}
        <div className="absolute top-20 left-10 text-4xl opacity-30 ornament-swing hidden md:block">🔔</div>
        <div className="absolute top-32 right-16 text-3xl opacity-30 ornament-swing hidden md:block" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute bottom-40 left-20 text-3xl opacity-30 ornament-swing hidden md:block" style={{ animationDelay: '0.5s' }}>🎁</div>
        <div className="absolute bottom-32 right-24 text-4xl opacity-30 ornament-swing hidden md:block" style={{ animationDelay: '1.5s' }}>🦌</div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 px-4 relative z-20">
        <div className="container mx-auto max-w-2xl">
          <ChristmasCountdown />
        </div>
      </section>

      {/* Memory Form Section */}
      <section id="memory-form" className="py-20 px-4 relative z-20">
        <div className="container mx-auto max-w-lg">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Împărtășește o amintire ✨
            </h2>
            <p className="text-foreground/60">
              Scrie un mesaj ca toată lumea să-l vadă
            </p>
          </div>
          
          <div className="glass-card p-6 sm:p-8 glow-gold">
            <MemoryForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </div>
        </div>
      </section>

      {/* Memory Wall Section */}
      <section id="memory-wall" className="py-20 px-4 relative z-20">
        <div className="container mx-auto">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Perete de amintiri 🎄
            </h2>
            <p className="text-foreground/60">
              {memories.length} {memories.length === 1 ? 'amintire partajată' : 'amintiri partajate'}
            </p>
          </div>
          
          <MemoryWall
            memories={memories}
            isLoading={isLoading}
            isAdmin={isAdmin}
            onDelete={deleteMemory}
          />
        </div>
      </section>

      {/* Mini Game Section */}
      <section id="mini-game" className="py-20 px-4 relative z-20">
        <div className="container mx-auto">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Ia o pauză 🎮
            </h2>
            <p className="text-foreground/60">
              Joacă un mini-joc de Crăciun!
            </p>
          </div>
          
          <GiftCatcherGame />

          {/* How to Play Guide */}
          <div className="mt-10 max-w-md mx-auto">
            <div className="glass-card p-6 text-center">
              <h3 className="text-xl font-script text-gradient-gold mb-4">
                Cum să joci
              </h3>
              <div className="space-y-3 text-sm text-foreground/80">
                <p>🎮 Folosește tastele ← → sau mută mouse-ul</p>
                <p>🎁 Prinde cadourile care cad cu coșul</p>
                <p>⭐ Stele = 3 puncte, 🍪 Fursecuri = 2 puncte</p>
                <p>💨 Jocul se accelerează pe măsură ce obții puncte!</p>
                <p>❌ Ratezi 5 cadouri și jocul se termină</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-border/20 relative z-20 bg-gradient-to-b from-transparent to-background/50">
        <div className="container mx-auto text-center max-w-2xl">
          {/* Thank You Message */}
          <div className="mb-8">
            <h3 className="text-3xl sm:text-4xl font-script text-gradient-gold mb-4">
              Mulțumim pentru vizită! 🎅
            </h3>
            <p className="text-foreground/70 text-base sm:text-lg leading-relaxed">
              Îți dorim să ai sărbători pline de căldură, iubire și bucurie.
              Îți dorim un Crăciun fericit și un An Nou fericit!
            </p>
          </div>

          {/* Christmas Tree */}
          <div className="text-5xl mb-6 float">🎄</div>

          {/* Made with love */}
          <p className="text-muted-foreground text-sm mb-4">
            Creat cu ❤️ și spirit de sărbătoare • 2025
          </p>

          {/* Snowflake decoration */}
          <div className="flex justify-center gap-2 text-2xl opacity-60 mb-4">
            <span className="animate-pulse" style={{ animationDelay: '0s' }}>❄️</span>
            <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>❄️</span>
            <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>❄️</span>
            <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>❄️</span>
            <span className="animate-pulse" style={{ animationDelay: '0.8s' }}>❄️</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
