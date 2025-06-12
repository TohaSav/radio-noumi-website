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
    <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
      <div>
        <label className="text-sm font-medium text-gray-700">Фото (URL)</label>
        <Input
          value={form.photo}
          onChange={(e) => handleChange("photo", e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Имя *</label>
        <Input
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Ваше имя"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Возраст *</label>
        <Input
          type="number"
          value={form.age}
          onChange={(e) => handleChange("age", e.target.value)}
          placeholder="25"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Город</label>
        <Input
          value={form.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Москва"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Рост</label>
        <Input
          value={form.height}
          onChange={(e) => handleChange("height", e.target.value)}
          placeholder="175 см"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Вес</label>
        <Input
          value={form.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          placeholder="70 кг"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Кого ищете</label>
        <Input
          value={form.lookingFor}
          onChange={(e) => handleChange("lookingFor", e.target.value)}
          placeholder="Девушку для отношений"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">О себе</label>
        <Textarea
          value={form.about}
          onChange={(e) => handleChange("about", e.target.value)}
          placeholder="Расскажите о себе..."
          rows={3}
          className="mt-1"
        />
      </div>

      <Button
        onClick={onSubmit}
        className="w-full bg-pink-500 hover:bg-pink-600"
        disabled={!form.name || !form.age}
      >
        Отправить анкету 💕
      </Button>
    </div>
  );
};

export default ProfileForm;
