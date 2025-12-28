import { useState, useEffect } from 'react';
import { Memory } from '@/components/MemoryCard';

// Local storage key
const STORAGE_KEY = 'christmas-memories';

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

export const useMemories = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load memories from localStorage on mount
  useEffect(() => {
    const loadMemories = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Convert timestamp strings back to Date objects
          const memoriesWithDates = parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }));
          setMemories(memoriesWithDates);
        }
      } catch (error) {
        console.error('Error loading memories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate network delay for smoother UX
    setTimeout(loadMemories, 500);
  }, []);

  // Save memories to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
    }
  }, [memories, isLoading]);

  const addMemory = async (data: { name: string; message: string; emoji: string }) => {
    const newMemory: Memory = {
      id: generateId(),
      name: data.name,
      message: data.message,
      emoji: data.emoji,
      timestamp: new Date(),
    };

    setMemories((prev) => [newMemory, ...prev]);
    return newMemory;
  };

  const deleteMemory = async (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  return {
    memories,
    isLoading,
    addMemory,
    deleteMemory,
  };
};

export default useMemories;
