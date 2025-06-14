import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfileFormProps {
  form: any;
  onChange: (form: any) => void;
  onSubmit: () => void;
}

export default function ProfileForm({
  form,
  onChange,
  onSubmit,
}: ProfileFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Имя *</label>
        <Input
          placeholder="Ваше имя"
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm font-medium">Возраст *</label>
          <Input
            type="number"
            placeholder="25"
            value={form.age}
            onChange={(e) => onChange({ ...form, age: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Пол *</label>
          <Select
            value={form.gender}
            onValueChange={(value) => onChange({ ...form, gender: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Мужской</SelectItem>
              <SelectItem value="female">Женский</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Город *</label>
        <Input
          placeholder="Москва"
          value={form.city}
          onChange={(e) => onChange({ ...form, city: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm font-medium">Рост</label>
          <Input
            placeholder="170 см"
            value={form.height}
            onChange={(e) => onChange({ ...form, height: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Вес</label>
          <Input
            placeholder="65 кг"
            value={form.weight}
            onChange={(e) => onChange({ ...form, weight: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Ищу *</label>
        <Input
          placeholder="Серьезные отношения"
          value={form.lookingFor}
          onChange={(e) => onChange({ ...form, lookingFor: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm font-medium">О себе *</label>
        <Textarea
          placeholder="Расскажите о себе..."
          value={form.about}
          onChange={(e) => onChange({ ...form, about: e.target.value })}
          rows={3}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Фото (URL)</label>
        <Input
          placeholder="https://..."
          value={form.photo}
          onChange={(e) => onChange({ ...form, photo: e.target.value })}
        />
      </div>

      <Button
        onClick={onSubmit}
        className="w-full"
        disabled={
          !form.name ||
          !form.age ||
          !form.city ||
          !form.lookingFor ||
          !form.about ||
          !form.gender
        }
      >
        Создать анкету
      </Button>
    </div>
  );
}
