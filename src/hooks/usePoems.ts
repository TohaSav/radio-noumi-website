import { useState, useEffect } from "react";

export interface Poem {
  id: string;
  title: string;
  author: string;
  text: string;
  createdAt: Date;
}

const POEMS_STORAGE_KEY = "poems";

export const usePoems = () => {
  const [poems, setPoems] = useState<Poem[]>([]);

  // Загружаем стихи из localStorage
  useEffect(() => {
    const loadPoems = () => {
      try {
        const savedPoems = localStorage.getItem(POEMS_STORAGE_KEY);
        if (savedPoems) {
          const parsedPoems = JSON.parse(savedPoems);
          setPoems(
            parsedPoems.map((poem: any) => ({
              ...poem,
              createdAt: new Date(poem.createdAt),
            })),
          );
        }
      } catch (error) {
        console.error("Ошибка загрузки стихов:", error);
      }
    };

    loadPoems();

    // Слушаем изменения в localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === POEMS_STORAGE_KEY) {
        loadPoems();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addPoem = (poem: Omit<Poem, "id" | "createdAt">) => {
    const newPoem: Poem = {
      id: Date.now().toString(),
      ...poem,
      createdAt: new Date(),
    };

    const updatedPoems = [newPoem, ...poems];
    setPoems(updatedPoems);
    localStorage.setItem(POEMS_STORAGE_KEY, JSON.stringify(updatedPoems));

    return newPoem;
  };

  const deletePoem = (id: string) => {
    const updatedPoems = poems.filter((poem) => poem.id !== id);
    setPoems(updatedPoems);
    localStorage.setItem(POEMS_STORAGE_KEY, JSON.stringify(updatedPoems));
  };

  return {
    poems,
    addPoem,
    deletePoem,
  };
};
