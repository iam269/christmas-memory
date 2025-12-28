import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

export interface Memory {
  id: string;
  name: string;
  message: string;
  emoji: string;
  timestamp: Date;
}

interface MemoryCardProps {
  memory: Memory;
  index: number;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

const MemoryCard = ({ memory, index, isAdmin, onDelete }: MemoryCardProps) => {
  const glowColors = ['glow-red', 'glow-green', 'glow-gold'];
  const glowClass = glowColors[index % 3];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ro-RO', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div
      className={cn(
        'glass-card p-5 card-enter relative group',
        'hover:scale-[1.02] transition-transform duration-300',
        glowClass
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {isAdmin && onDelete && (
        <button
          onClick={() => onDelete(memory.id)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-destructive/20 hover:bg-destructive/40"
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </button>
      )}
      
      <div className="flex items-start gap-4">
        <span className="text-4xl float ornament-swing">{memory.emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-semibold text-foreground truncate">
            {memory.name}
          </h3>
          <p className="text-foreground/80 mt-2 text-sm leading-relaxed break-words">
            {memory.message}
          </p>
          <p className="text-muted-foreground text-xs mt-3">
            {formatDate(memory.timestamp)}
          </p>
        </div>
      </div>

      {/* Decorative corner ornaments */}
      <div className="absolute top-2 left-2 text-xs text-accent/30">✦</div>
      <div className="absolute bottom-2 right-2 text-xs text-accent/30">✦</div>
    </div>
  );
};

export default MemoryCard;
