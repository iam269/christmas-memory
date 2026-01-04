import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Memory } from './MemoryCard';

interface ExportImportProps {
  memories: Memory[];
  importMemories: (items: any[], replace?: boolean) => Promise<void> | void;
  clearMemories?: () => Promise<void> | void;
}

const ExportImport = ({ memories, importMemories, clearMemories }: ExportImportProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleExport = () => {
    const data = JSON.stringify(memories, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'christmas-memories.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!Array.isArray(parsed)) throw new Error('Format invalid');
        await importMemories(parsed, true);
        alert('Amintirile au fost importate.');
      } catch (err: any) {
        alert('Eroare la import: ' + (err?.message || String(err)));
      }
    };
    reader.readAsText(f);
    e.currentTarget.value = '';
  };

  return (
    <div className="flex gap-2 justify-center items-center mb-6">
      <Button onClick={handleExport} variant="outline">Exportă JSON</Button>

      <input
        ref={fileRef}
        id="memories-import"
        type="file"
        accept="application/json"
        onChange={handleFile}
        className="hidden"
      />
      <label htmlFor="memories-import">
        <Button variant="ghost">Importă JSON</Button>
      </label>

      {clearMemories && (
        <Button
          variant="destructive"
          onClick={() => {
            if (confirm('Ștergi toate amintirile?')) {
              clearMemories();
            }
          }}
        >
          Șterge toate
        </Button>
      )}
    </div>
  );
};

export default ExportImport;
