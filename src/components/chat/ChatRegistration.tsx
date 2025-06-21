import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface ChatRegistrationProps {
  onRegister: (userData: { name: string; avatar: string }) => void;
  existingUsers: string[];
}

const ChatRegistration = ({
  onRegister,
  existingUsers,
}: ChatRegistrationProps) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Размер файла не должен превышать 5MB");
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!name.trim()) {
      setError("Введите имя");
      setIsLoading(false);
      return;
    }

    if (name.trim().length < 2) {
      setError("Имя должно содержать минимум 2 символа");
      setIsLoading(false);
      return;
    }

    if (existingUsers.includes(name.trim())) {
      setError("Это имя уже занято");
      setIsLoading(false);
      return;
    }

    const userData = {
      name: name.trim(),
      avatar:
        avatar ||
        `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=150&h=150&fit=crop&crop=face`,
    };

    setTimeout(() => {
      onRegister(userData);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="UserPlus" size={24} className="text-blue-600" />
          <h2 className="text-xl font-bold">Регистрация в чате</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Ваше имя</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите ваше имя"
              maxLength={20}
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="avatar">Аватарка (необязательно)</Label>
            <div className="mt-2">
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("avatar")?.click()}
                className="w-full"
                disabled={isLoading}
              >
                <Icon name="Upload" size={16} className="mr-2" />
                {avatarFile ? avatarFile.name : "Выбрать файл"}
              </Button>
            </div>

            {avatar && (
              <div className="mt-3 flex justify-center">
                <img
                  src={avatar}
                  alt="Предпросмотр"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Регистрация...
              </>
            ) : (
              <>
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти в чат
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatRegistration;
