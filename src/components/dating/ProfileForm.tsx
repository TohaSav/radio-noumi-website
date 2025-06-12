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
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Фото (URL)</label>
        <Input
          value={formData.photo}
          onChange={(e) => handleChange("photo", e.target.value)}
          placeholder="https://example.com/photo.jpg"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Имя</label>
        <Input
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Ваше имя"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Возраст</label>
        <Input
          type="number"
          value={formData.age}
          onChange={(e) => handleChange("age", e.target.value)}
          placeholder="25"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Город</label>
        <Input
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Москва"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Рост (см)</label>
        <Input
          type="number"
          value={formData.height}
          onChange={(e) => handleChange("height", e.target.value)}
          placeholder="175"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Вес (кг)</label>
        <Input
          type="number"
          value={formData.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          placeholder="70"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Кого ищете</label>
        <Input
          value={formData.lookingFor}
          onChange={(e) => handleChange("lookingFor", e.target.value)}
          placeholder="Девушку для серьезных отношений"
        />
      </div>
      <div>
        <label className="text-sm font-medium">О себе</label>
        <Textarea
          value={formData.about}
          onChange={(e) => handleChange("about", e.target.value)}
          placeholder="Расскажите о себе..."
          rows={3}
        />
      </div>
      <Button
        onClick={onSubmit}
        className="w-full"
        disabled={!formData.name || !formData.age}
      >
        Отправить анкету
      </Button>
    </div>
  );
};

export default ProfileForm;
