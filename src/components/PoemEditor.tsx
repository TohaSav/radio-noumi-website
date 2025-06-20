import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePoems } from "@/hooks/usePoems";
import Icon from "@/components/ui/icon";

const PoemEditor = () => {
  const { addPoem } = usePoems();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    text: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.text.trim()) return;

    addPoem({
      title: formData.title.trim(),
      author: formData.author.trim() || "Аноним",
      text: formData.text.trim(),
    });

    // Очищаем форму после добавления
    setFormData({ title: "", author: "", text: "" });
  };

  return (
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
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
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
  );
};

export default PoemEditor;
