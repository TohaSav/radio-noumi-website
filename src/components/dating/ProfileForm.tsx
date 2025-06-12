import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

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
    <div className="space-y-6 max-h-[70vh] overflow-y-auto p-2 bg-gradient-to-br from-pink-50/50 to-purple-50/50 rounded-xl">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Icon name="Camera" size={16} className="text-pink-500" />
          Фото (URL)
        </label>
        <Input
          value={form.photo}
          onChange={(e) => handleChange("photo", e.target.value)}
          placeholder="https://example.com/photo.jpg"
          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20 bg-white/90 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Icon name="User" size={16} className="text-pink-500" />
          Имя *
        </label>
        <Input
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Ваше имя"
          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20 bg-white/90 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Icon name="Calendar" size={16} className="text-pink-500" />
          Возраст *
        </label>
        <Input
          type="number"
          value={form.age}
          onChange={(e) => handleChange("age", e.target.value)}
          placeholder="25"
          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20 bg-white/90 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Icon name="MapPin" size={16} className="text-pink-500" />
          Город
        </label>
        <Input
          value={form.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Москва"
          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20 bg-white/90 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Icon name="Ruler" size={16} className="text-pink-500" />
          Рост
        </label>
        <Input
          value={form.height}
          onChange={(e) => handleChange("height", e.target.value)}
          placeholder="175 см"
          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20 bg-white/90 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Icon name="Scale" size={16} className="text-pink-500" />
          Вес
        </label>
        <Input
          value={form.weight}
          onChange={(e) => handleChange("weight", e.target.value)}
          placeholder="70 кг"
          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20 bg-white/90 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Icon name="Search" size={16} className="text-pink-500" />
          Кого ищете
        </label>
        <Input
          value={form.lookingFor}
          onChange={(e) => handleChange("lookingFor", e.target.value)}
          placeholder="Девушку для отношений"
          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20 bg-white/90 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Icon name="FileText" size={16} className="text-pink-500" />О себе
        </label>
        <Textarea
          value={form.about}
          onChange={(e) => handleChange("about", e.target.value)}
          placeholder="Расскажите о себе..."
          rows={3}
          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400/20 bg-white/90 transition-all duration-300 resize-none"
        />
      </div>

      <Button
        onClick={onSubmit}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl py-3 rounded-xl text-lg font-semibold"
        disabled={!form.name || !form.age}
      >
        <Icon name="Sparkles" size={20} className="mr-2" />
        Отправить анкету 💕
      </Button>
    </div>
  );
};

export default ProfileForm;
