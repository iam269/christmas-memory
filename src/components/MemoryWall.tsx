import MemoryCard, { Memory } from './MemoryCard';
import { cn } from '@/lib/utils';

interface MemoryWallProps {
  memories: Memory[];
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

const MemoryWall = ({ memories, isAdmin, onDelete, isLoading }: MemoryWallProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="glass-card p-5 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-muted/50" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-muted/50 rounded w-1/2" />
                <div className="h-3 bg-muted/50 rounded w-full" />
                <div className="h-3 bg-muted/50 rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-6xl mb-4 block float">🎄</span>
        <h3 className="text-xl font-display text-foreground mb-2">
          Încă nu există amintiri!
        </h3>
        <p className="text-muted-foreground">
          Fii primul care împărtășește o amintire de Crăciun
        </p>
      </div>
    );
  }

  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    )}>
      {memories.map((memory, index) => (
        <MemoryCard
          key={memory.id}
          memory={memory}
          index={index}
          isAdmin={isAdmin}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default MemoryWall;
