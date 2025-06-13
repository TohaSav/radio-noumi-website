import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/types/dating";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (user: User) => void;
  onShowProfile: () => void;
  isLoggedIn: boolean;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onShowProfile,
  isLoggedIn,
}: RegisterModalProps) {
  const [form, setForm] = useState({
    login: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    const newUser: User = {
      id: Date.now().toString(),
      login: form.login,
      email: form.email,
    };

    onRegister(newUser);
    setForm({ login: "", email: "", password: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle>Регистрация</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Логин *</label>
            <Input
              type="text"
              placeholder="Ваш логин"
              value={form.login}
              onChange={(e) => setForm({ ...form, login: e.target.value })}
              className="h-10 sm:h-11"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email *</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-10 sm:h-11"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Пароль *</label>
            <Input
              type="password"
              placeholder="Пароль"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="h-10 sm:h-11"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleSubmit}
              disabled={!form.login || !form.email || !form.password}
              className="flex-1 h-10 sm:h-11"
            >
              Зарегистрироваться
            </Button>
            <Button
              variant="outline"
              onClick={onShowProfile}
              disabled={!isLoggedIn}
              className="h-10 sm:h-11"
            >
              Анкета
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
