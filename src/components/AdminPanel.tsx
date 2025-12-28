import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ShieldCheck } from 'lucide-react';

interface AdminPanelProps {
  isAdmin: boolean;
  onAdminLogin: (isAdmin: boolean) => void;
}

// Simple admin key - in production, use proper authentication
const ADMIN_KEY = 'christmas2024';

const AdminPanel = ({ isAdmin, onAdminLogin }: AdminPanelProps) => {
  const [showInput, setShowInput] = useState(false);
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === ADMIN_KEY) {
      onAdminLogin(true);
      setShowInput(false);
      setKey('');
      setError('');
    } else {
      setError('Cheie admin invalidă');
    }
  };

  const handleLogout = () => {
    onAdminLogin(false);
    setShowInput(false);
  };

  if (isAdmin) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-secondary flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" />
          Mod admin
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Exit
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
        <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowInput(!showInput)}
        className="opacity-30 hover:opacity-100 transition-opacity"
        title="Autentificare admin"
      >
        <Shield className="w-4 h-4" />
      </Button>

      {showInput && (
        <form
          onSubmit={handleSubmit}
          className="absolute right-0 top-full mt-2 glass-card p-3 z-50 min-w-[200px]"
        >
            <Input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Cheie admin"
            className="bg-muted/50 text-sm mb-2"
          />
          {error && <p className="text-destructive text-xs mb-2">{error}</p>}
          <Button type="submit" size="sm" className="w-full btn-christmas text-xs">
            Autentificare
          </Button>
        </form>
      )}
    </div>
  );
};

export default AdminPanel;
