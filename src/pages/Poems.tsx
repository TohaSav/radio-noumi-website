import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import Icon from "@/components/ui/icon";

interface Poem {
  id: string;
  title: string;
  author: string;
  text: string;
  createdAt: Date;
}

const Poems = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [poems, setPoems] = useState<Poem[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    text: "",
  });

  // Загружаем стихи из localStorage при запуске
  useEffect(() => {
    const savedPoems = localStorage.getItem("poems");
    if (savedPoems) {
      const parsedPoems = JSON.parse(savedPoems);
      setPoems(
        parsedPoems.map((poem: any) => ({
          ...poem,
          createdAt: new Date(poem.createdAt),
        })),
      );
    }
  }, []);

  // Сохраняем стихи в localStorage при изменении
  useEffect(() => {
    if (poems.length > 0) {
      localStorage.setItem("poems", JSON.stringify(poems));
    }
  }, [poems]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.text.trim()) return;

    // Проверяем админ-права перед добавлением
    if (!isAdmin) return;

    const newPoem: Poem = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      author: formData.author.trim() || "Аноним",
      text: formData.text.trim(),
      createdAt: new Date(),
    };

    const updatedPoems = [newPoem, ...poems];
    setPoems(updatedPoems);
    localStorage.setItem("poems", JSON.stringify(updatedPoems));
    setFormData({ title: "", author: "", text: "" });
  };

  const handleDelete = (id: string) => {
    const updatedPoems = poems.filter((poem) => poem.id !== id);
    setPoems(updatedPoems);
    localStorage.setItem("poems", JSON.stringify(updatedPoems));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">📝 Мои стихи</h1>
            <p className="text-purple-200">
              Создавайте и сохраняйте свои произведения
            </p>
          </div>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Development-only Form Section - Hidden in production */}
          {process.env.NODE_ENV === "development" && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-semibold text-white mb-6">
                ✨ Добавить стих
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Название стиха"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                </div>

                <div>
                  <Input
                    placeholder="Автор"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                </div>

                <div>
                  <Textarea
                    placeholder="Текст стиха..."
                    value={formData.text}
                    onChange={(e) =>
                      setFormData({ ...formData, text: e.target.value })
                    }
                    rows={8}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/60 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white"
                  disabled={!formData.title.trim() || !formData.text.trim()}
                >
                  <Icon name="Plus" size={16} />
                  Добавить стих
                </Button>
              </form>
            </div>
          )}

          {/* Poems List */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 border border-white/20">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">
              📚 Сохранённые стихи ({poems.length})
            </h2>

            <div className="space-y-3 md:space-y-4 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto">
              {poems.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-white/60">
                  <Icon
                    name="BookOpen"
                    size={32}
                    className="sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 opacity-50"
                  />
                  <p className="text-sm sm:text-base">
                    Пока нет добавленных стихов
                  </p>
                </div>
              ) : (
                poems.map((poem) => (
                  <div
                    key={poem.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-white">{poem.title}</h3>
                      <Button
                        onClick={() => handleDelete(poem.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                    <p className="text-purple-200 text-sm mb-3">
                      Автор: {poem.author}
                    </p>
                    <div className="text-white/80 text-sm whitespace-pre-line line-clamp-3">
                      {poem.text}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poems;
