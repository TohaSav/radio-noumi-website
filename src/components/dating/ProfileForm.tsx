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
  formData: ProfileFormData;
  onFormChange: (data: ProfileFormData) => void;
  onSubmit: () => void;
}

const ProfileForm = ({
  formData,
  onFormChange,
  onSubmit,
}: ProfileFormProps) => {
  const handleChange = (field: keyof ProfileFormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-4 h-[70vh] overflow-y-auto">
      <div>
        <label className="text-sm font-medium text-gray-700">Фото (URL)</label>
        <Input
          value={formData.photo}
          onChange={(e) => handleChange("photo", e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Имя</label>
        <Input
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Ваше имя"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Возраст</label>
        <Input
          type="number"
          value={formData.age}
          onChange={(e) => handleChange("age", e.target.value)}
          placeholder="25"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Город</label>
        <Input
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Москва"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Рост (см)</label>
        <Input
          type="number"
          value={formData.height}
          onChange={(e) => handleChange("height", e.target.value)}
          placeholder="175"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Вес (кг)</label>
        <Input
          type="number"
          value={formData.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          placeholder="70"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Кого ищете</label>
        <Input
          value={formData.lookingFor}
          onChange={(e) => handleChange("lookingFor", e.target.value)}
          placeholder="Девушку для серьезных отношений"
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">О себе</label>
        <Textarea
          value={formData.about}
          onChange={(e) => handleChange("about", e.target.value)}
          placeholder="Расскажите о себе..."
          rows={4}
          className="mt-1"
        />
      </div>

      <Button
        onClick={onSubmit}
        className="w-full bg-pink-500 hover:bg-pink-600"
        disabled={!formData.name || !formData.age}
      >
        Отправить анкету
      </Button>
    </div>
  );
};

export default ProfileForm;
