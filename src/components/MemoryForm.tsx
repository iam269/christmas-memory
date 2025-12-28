import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import EmojiPicker from './EmojiPicker';
import { cn } from '@/lib/utils';
import { Send, Sparkles } from 'lucide-react';

interface MemoryFormProps {
  onSubmit: (data: { name: string; message: string; emoji: string }) => void;
  isSubmitting?: boolean;
}

const MemoryForm = ({ onSubmit, isSubmitting }: MemoryFormProps) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [emoji, setEmoji] = useState('🎄');
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; message?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Numele este obligatoriu';
    }
    
    if (!message.trim()) {
      newErrors.message = 'Mesajul este obligatoriu';
    } else if (message.length > 200) {
      newErrors.message = 'Mesajul trebuie să aibă cel mult 200 de caractere';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    onSubmit({ name: name.trim(), message: message.trim(), emoji });
    
    // Show success animation
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    
    // Reset form
    setName('');
    setMessage('');
    setEmoji('🎄');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="text-center animate-scale-in">
            <Sparkles className="w-16 h-16 text-accent mx-auto sparkle" />
            <p className="text-2xl font-display text-foreground mt-4">
              Amintire adăugată! 🎄
            </p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-foreground/80">
          Numele tău
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Introdu numele tău"
          className={cn(
            'bg-muted/50 border-border/50 focus:border-accent transition-colors',
            errors.name && 'border-destructive'
          )}
        />
        {errors.name && (
          <p className="text-destructive text-xs">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground/80">
          Amintirea ta
          <span className="text-muted-foreground ml-2">({message.length}/200)</span>
        </label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Împărtășește amintirea ta preferată de Crăciun..."
          maxLength={200}
          rows={4}
          className={cn(
            'bg-muted/50 border-border/50 focus:border-accent transition-colors resize-none',
            errors.message && 'border-destructive'
          )}
        />
        {errors.message && (
          <p className="text-destructive text-xs">{errors.message}</p>
        )}
      </div>

      <EmojiPicker selected={emoji} onSelect={setEmoji} />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-christmas"
      >
            {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⭐</span>
            Se adaugă amintirea...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Trimite amintirea 🎁
          </span>
        )}
      </Button>
    </form>
  );
};

export default MemoryForm;
