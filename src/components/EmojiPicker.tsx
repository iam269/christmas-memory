import { cn } from '@/lib/utils';

interface EmojiPickerProps {
  selected: string;
  onSelect: (emoji: string) => void;
}

const CHRISTMAS_EMOJIS = ['🎄', '🎁', '⭐', '🎅', '🦌', '❄️', '🔔', '🕯️', '🍪', '🥛', '🎿', '⛄'];

const EmojiPicker = ({ selected, onSelect }: EmojiPickerProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground/80">
        Choose an emoji
      </label>
      <div className="flex flex-wrap gap-2">
        {CHRISTMAS_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onSelect(emoji)}
            className={cn(
              'w-12 h-12 text-2xl rounded-lg transition-all duration-200',
              'hover:scale-110 hover:bg-muted/50',
              'focus:outline-none focus:ring-2 focus:ring-accent',
              selected === emoji
                ? 'bg-accent/20 ring-2 ring-accent scale-110'
                : 'bg-muted/30'
            )}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
