import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProfileFormData {
  photo: string;
  name: string;
  age: string;
  city: string;
  height: string;
  weight: string;
  lookingFor: string;
  about: string;
}

interface ProfileFormProps {
  form: ProfileFormData;
  onChange: (data: ProfileFormData) => void;
  onSubmit: () => void;
}

const ProfileForm = ({ form, onChange, onSubmit }: ProfileFormProps) => {
  const handleChange = (field: keyof ProfileFormData, value: string) => {
    onChange({ ...form, [field]: value });
  };

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      <div>
        <label className="text-sm font-medium">Фото (URL)</label>
        <Input
          value={form.photo}
          onChange={(e) => handleChange("photo", e.target.value)}
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Имя *</label>
        <Input
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Ваше имя"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Возраст *</label>
        <Input
          type="number"
          value={form.age}
          onChange={(e) => handleChange("age", e.target.value)}
          placeholder="25"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Город</label>
        <Input
          value={form.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Москва"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Рост</label>
        <Input
          value={form.height}
          onChange={(e) => handleChange("height", e.target.value)}
          placeholder="175 см"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Вес</label>
        <Input
          value={form.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          placeholder="70 кг"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Кого ищете</label>
        <Input
          value={form.lookingFor}
          onChange={(e) => handleChange("lookingFor", e.target.value)}
          placeholder="Девушку для отношений"
        />
      </div>

      <div>
        <label className="text-sm font-medium">О себе</label>
        <Textarea
          value={form.about}
          onChange={(e) => handleChange("about", e.target.value)}
          placeholder="Расскажите о себе..."
          rows={3}
        />
      </div>

      <Button
        onClick={onSubmit}
        className="w-full"
        disabled={!form.name || !form.age}
      >
        Создать анкету
      </Button>
    </div>
  );
};

export default ProfileForm;
