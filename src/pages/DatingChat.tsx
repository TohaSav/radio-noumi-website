import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { Profile, User, Like, Message } from "@/types/dating";
import ProfileCard from "@/components/dating/ProfileCard";
import ProfileForm from "@/components/dating/ProfileForm";
import ChatSection from "@/components/dating/ChatSection";
import UserPanel from "@/components/dating/UserPanel";

// Ключ для localStorage
const MESSAGES_STORAGE_KEY = "dating_chat_all_messages";

const DatingChat = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: "1",
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
      name: "Анна",
      age: 25,
      city: "Москва",
      height: "165 см",
      weight: "55 кг",
      lookingFor: "Серьезные отношения",
      about: "Люблю путешествовать и читать книги. Работаю дизайнером.",
      userId: "user1",
      gender: "female",
    },
    {
      id: "2",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      name: "Дмитрий",
      age: 28,
      city: "СПб",
      height: "180 см",
      weight: "75 кг",
      lookingFor: "Дружба и общение",
      about: "Программист, увлекаюсь спортом и кино.",
      userId: "user2",
      gender: "male",
    },
  ]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">(
    "all",
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  const [profileForm, setProfileForm] = useState({
    photo: "",
    name: "",
    age: "",
    city: "",
    height: "",
    weight: "",
    lookingFor: "",
    about: "",
  });

  const handleChatSelect = (userName: string) => {};

  const [registerForm, setRegisterForm] = useState({
    login: "",
    email: "",
    password: "",
  });

  // Загрузка сохраненных сообщений при инициализации
  useEffect(() => {
    const savedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Ошибка загрузки сообщений:", error);
      }
    }
  }, []);

  // Сохранение сообщений в localStorage при каждом изменении
  const saveMessages = (newMessages: Message[]) => {
    try {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(newMessages));
    } catch (error) {
      console.error("Ошибка сохранения сообщений:", error);
    }
  };

  // Фоновое радио
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  // Автоматическое добавление анкет каждые 1-3 минуты
  useEffect(() => {
    const interval = setInterval(
      () => {
        const generateRandomProfile = (): Profile => {
          const isFemale = Math.random() > 0.5;

          const femaleProfiles = [
            {
              name: "Алёна",
              age: 24,
              city: "Москва",
              about:
                "Работаю маркетологом, люблю йогу и путешествия. Ищу серьёзные отношения с добрым человеком.",
              lookingFor: "Серьезные отношения",
              photo:
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
            },
            {
              name: "Виктория",
              age: 27,
              city: "СПб",
              about:
                "Врач-стоматолог, увлекаюсь фотографией и готовкой. Хочу встретить своего человека.",
              lookingFor: "Спутник жизни",
              photo:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
            },
            {
              name: "Ксения",
              age: 22,
              city: "Екатеринбург",
              about:
                "Студентка последнего курса, танцую и изучаю языки. Открыта к новым знакомствам.",
              lookingFor: "Дружба и общение",
              photo:
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
            },
            {
              name: "Марина",
              age: 29,
              city: "Казань",
              about:
                "Финансист, мама сына 5 лет. Ищу понимающего партнёра для создания семьи.",
              lookingFor: "Серьезные отношения",
              photo:
                "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400",
            },
            {
              name: "Елизавета",
              age: 26,
              city: "Новосибирск",
              about:
                "IT-дизайнер, обожаю животных и активный отдых. Хочу найти спутника для приключений.",
              lookingFor: "Совместный досуг",
              photo:
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
            },
            {
              name: "Анастасия",
              age: 23,
              city: "Краснодар",
              about:
                "Учитель начальных классов, люблю детей и природу. Мечтаю о крепкой семье.",
              lookingFor: "Спутник жизни",
              photo:
                "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400",
            },
            {
              name: "Дарья",
              age: 25,
              city: "Ростов-на-Дону",
              about:
                "Журналист, пишу статьи о культуре. Ценю интеллектуальные беседы и честность.",
              lookingFor: "Серьезные отношения",
              photo:
                "https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400",
            },
            {
              name: "Полина",
              age: 28,
              city: "Волгоград",
              about:
                "Психолог, помогаю людям решать проблемы. Сама ищу гармоничные отношения.",
              lookingFor: "Серьезные отношения",
              photo:
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
            },
            {
              name: "София",
              age: 30,
              city: "Тюмень",
              about:
                "Владею салоном красоты, люблю искусство и театр. Ищу интеллигентного мужчину.",
              lookingFor: "Серьезные отношения",
              photo:
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
            },
            {
              name: "Катарина",
              age: 24,
              city: "Самара",
              about:
                "Фитнес-тренер, веду здоровый образ жизни. Хочу встретить активного партнёра.",
              lookingFor: "Активный образ жизни",
              photo:
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
            },
          ];

          const maleProfiles = [
            {
              name: "Александр",
              age: 30,
              city: "Москва",
              about:
                "Инженер-программист, занимаюсь спортом. Ищу умную и добрую спутницу жизни.",
              lookingFor: "Серьезные отношения",
              photo:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
            },
            {
              name: "Дмитрий",
              age: 32,
              city: "СПб",
              about:
                "Врач-хирург, люблю читать и путешествовать. Хочу создать крепкую семью.",
              lookingFor: "Спутник жизни",
              photo:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
            },
            {
              name: "Максим",
              age: 26,
              city: "Екатеринбург",
              about:
                "Предприниматель, развиваю свой бизнес. Ищу девушку для серьёзных отношений.",
              lookingFor: "Серьезные отношения",
              photo:
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
            },
            {
              name: "Артём",
              age: 28,
              city: "Казань",
              about:
                "Архитектор, создаю красивые здания. Мечтаю найти свою музу и построить семью.",
              lookingFor: "Спутник жизни",
              photo:
                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
            },
            {
              name: "Сергей",
              age: 31,
              city: "Новосибирск",
              about:
                "Учитель физики, увлекаюсь астрономией. Ищу умную собеседницу и верную спутницу.",
              lookingFor: "Серьезные отношения",
              photo:
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
            },
            {
              name: "Андрей",
              age: 29,
              city: "Краснодар",
              about:
                "Менеджер по продажам, активный и целеустремлённый. Хочу найти девушку для совместной жизни.",
              lookingFor: "Серьезные отношения",
              photo:
                "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400",
            },
            {
              name: "Илья",
              age: 25,
              city: "Ростов-на-Дону",
              about:
                "Дизайнер интерьеров, творческая личность. Ищу вдохновляющую девушку для отношений.",
              lookingFor: "Совместный досуг",
              photo:
                "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
            },
            {
              name: "Владислав",
              age: 27,
              city: "Волгоград",
              about:
                "Повар в ресторане, умею готовить вкусно. Хочу радовать любимую женщину каждый день.",
              lookingFor: "Спутник жизни",
              photo:
                "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400",
            },
            {
              name: "Никита",
              age: 29,
              city: "Тюмень",
              about:
                "Юрист, защищаю права людей. Ищу честную и верную девушку для создания семьи.",
              lookingFor: "Серьезные отношения",
              photo:
                "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400",
            },
            {
              name: "Роман",
              age: 33,
              city: "Самара",
              about:
                "Механик, работаю руками и умею чинить всё. Мечтаю о домашнем уюте с любимой.",
              lookingFor: "Домашний уют",
              photo:
                "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=400",
            },
          ];

          const profileData = isFemale
            ? femaleProfiles[Math.floor(Math.random() * femaleProfiles.length)]
            : maleProfiles[Math.floor(Math.random() * maleProfiles.length)];

          return {
            id: `auto_${Date.now()}_${Math.random()}`,
            photo: profileData.photo,
            name: profileData.name,
            age: profileData.age,
            city: profileData.city,
            height: isFemale
              ? `${155 + Math.floor(Math.random() * 20)} см`
              : `${170 + Math.floor(Math.random() * 25)} см`,
            weight: isFemale
              ? `${45 + Math.floor(Math.random() * 25)} кг`
              : `${65 + Math.floor(Math.random() * 35)} кг`,
            lookingFor: profileData.lookingFor,
            about: profileData.about,
            userId: `auto_user_${Date.now()}`,
            gender: isFemale ? "female" : "male",
          };
        };

        setProfiles((prev) => [...prev, generateRandomProfile()]);
      },
      Math.random() * 120000 + 60000, // от 1 до 3 минут
    );

    return () => clearInterval(interval);
  }, []);

  // Автоматические сообщения с уникальным контентом
  useEffect(() => {
    const uniqueDatingMessages = [
      "Привет всем! Меня зовут Анна, ищу серьёзные отношения в Москве 💕",
      "Дмитрий здесь! Кто любит активный отдых и походы? Давайте знакомиться! 🏔️",
      "Девчонки из СПб, есть кто? Марина, 28 лет, работаю дизайнером ✨",
      "Максим, 31 год. Ищу спутницу жизни для создания семьи 👨‍👩‍👧‍👦",
      "Привет! Елена, врач из Екатеринбурга. Кто ценит доброту и искренность? 💝",
      "Александр, программист. Ищу умную девушку для долгих разговоров 💭",
      "Юлия здесь! Кто любит путешествия? Планирую поездку в Турцию ✈️",
      "Сергей, 29 лет. Учитель физики, увлекаюсь астрономией. Ищу родственную душу 🌟",
      "Привет! Ольга, мама двоих детей. Ищу понимающего мужчину 👩‍👧‍👦",
      "Артём из Казани! Архитектор, люблю создавать красоту. Кто разделит мои интересы? 🏛️",
      "Наталья здесь! Работаю психологом, помогаю людям. Сама ищу гармонию 🧘‍♀️",
      "Игорь, механик. Золотые руки и доброе сердце. Ищу хозяюшку 🔧",
      "Катя, 24 года! Фитнес-тренер, веду здоровый образ жизни 💪",
      "Владислав, повар. Готовлю вкусно, ищу того, кого буду радовать каждый день 👨‍🍳",
      "Светлана из Новосибирска! Библиотекарь, люблю книги и тишину 📚",
      "Денис здесь! Предприниматель, развиваю своё дело. Ищу единомышленницу 💼",
      "Ира, журналист! Пишу о культуре, ищу интеллигентного собеседника 📝",
      "Константин, юрист. Защищаю справедливость, ищу честную девушку ⚖️",
      "Алёна из Краснодара! Учитель начальных классов, обожаю детей 👩‍🏫",
      "Роман, водитель дальнобойщик. Много путешествую, ищу домашний уют 🚛",
      "Вика здесь! Медсестра, помогаю людям выздоравливать. Ищу заботливого мужчину 👩‍⚕️",
      "Павел, строитель. Строю дома, мечтаю построить семью 🏗️",
      "Лена из Ростова! Парикмахер, делаю людей красивыми. Сама ищу красивую любовь 💇‍♀️",
      "Михаил, пожарный. Спасаю людей на работе, ищу ту, кто спасёт моё сердце 🚒",
      "Таня здесь! Бухгалтер, люблю порядок во всём. Ищу надёжного партнёра 📊",
      "Евгений, электрик. Провожу свет в дома, ищу свет в своей жизни 💡",
      "Марина из Волгограда! Продавец-консультант, умею находить подход к людям 🛍️",
      "Андрей, охранник. Защищаю покой других, ищу свой покой дома 🛡️",
      "Галя здесь! Воспитатель в детском саду, очень люблю малышей 👶",
      "Виктор, слесарь. Чиню технику, хочу починить своё одинокое сердце 🔨",
      "Женя из Тюмени! Официантка, привыкла заботиться о людях 🍽️",
      "Николай, дальнобойщик. Объездил всю страну, не нашёл только любовь 🗺️",
      "Аня здесь! Кассир в супермаркете, общительная и добрая 🛒",
      "Валерий, сварщик. Соединяю металл, ищу того, с кем соединить судьбы 🔥",
      "Лиза из Самары! Студентка медицинского, буду лечить души и сердца 💊",
      "Станислав, грузчик. Сильный физически, нежный душой 💪",
      "Оксана здесь! Кондитер, делаю сладкую жизнь другим 🧁",
      "Федор, тракторист. Работаю на земле, мечтаю о семейном гнёздышке 🚜",
      "Настя из Челябинска! Секретарь, умею организовать всё и всех 📋",
      "Вячеслав, дворник. Убираю мусор с улиц, ищу чистую любовь 🧹",
      "Рита здесь! Маникюрша, делаю красивые ногти и жду красивой любви 💅",
      "Геннадий, сантехник. Устраняю протечки, ищу ту, с кем не будет утечек чувств 🔧",
      "Вера из Уфы! Няня, забочусь о детях, мечтаю о своих 👧",
      "Степан, пекарь. Встаю рано, пеку хлеб, ищу домашнее тепло 🍞",
      "Кристина здесь! Флорист, окружена красотой, ищу красивые отношения 🌺",
      "Борис, таксист. Вожу людей к их счастью, ищу своё 🚗",
      "Даша из Омска! Продавец в аптеке, лечу людей, сама нуждаюсь в заботе 💉",
      "Тимур, курьер. Доставляю радость людям, жду свою доставку счастья 📦",
      "Лида здесь! Уборщица в офисе, привыкла к порядку и чистоте 🧽",
      "Олег, сторож. Охраняю сон других, мечтаю о совместном сне 🌙",
      "Ксюша из Барнаула! Продавец цветов, дарю радость каждый день 🌹",
      "Петр, дворник в школе. Забочусь о детях, хочу своих 🏫",
      "Жанна здесь! Кассир на заправке, встречаю разных людей ⛽",
      "Василий, грузчик на складе. Сильные руки, доброе сердце 📦",
      "Катерина из Иркутска! Библиотекарь, храню знания и мечты 📖",
      "Антон, электрик на заводе. Даю свет людям, ищу свой 🏭",
      "Надя здесь! Продавец в магазине одежды, помогаю людям выглядеть красиво 👗",
      "Семён, водитель автобуса. Вожу людей домой, сам ищу дом 🚌",
      "Алла из Кирова! Воспитатель, учу детей добру 👩‍🏫",
      "Валентин, слесарь на заводе. Работаю руками и сердцем ⚙️",
      "Инна здесь! Парикмахер в салоне красоты, создаю красоту ✂️",
      "Григорий, охранник в магазине. Слежу за порядком 🛡️",
      "Люда из Курска! Медсестра в больнице, лечу людей 🏥",
      "Аркадий, дворник во дворе. Убираю листья, мечтаю о семейном дереве 🍂",
      "Зина здесь! Продавец на рынке, торгую овощами 🥕",
      "Леонид, сварщик на стройке. Строю будущее города 🏗️",
      "Тоня из Брянска! Кондуктор в автобусе, помогаю людям добраться 🎫",
      "Эдуард, механик в автосервисе. Чиню машины, хочу починить сердце 🔧",
      "Рая здесь! Уборщица в больнице, забочусь о чистоте 🧼",
      "Леонид, охранник на стройке. Охраняю будущие дома 🏘️",
      "Клава из Твери! Продавец в булочной, продаю свежий хлеб 🥖",
      "Мирон, дворник в парке. Убираю мусор, ищу чистые отношения 🌳",
      "Зоя здесь! Билетёр в театре, впускаю людей в мир искусства 🎭",
      "Прохор, грузчик в порту. Разгружаю корабли, мечтаю разгрузить сердце ⚓",
      "Фаина из Калуги! Продавец газет, читаю новости о любви 📰",
      "Трофим, сторож на складе. Охраняю товары, ищу сокровище 💎",
      "Устинья здесь! Техничка в школе, мою полы, мечтаю о чистой любви 🏫",
      "Ефим, водитель погрузчика. Поднимаю тяжести, хочу поднять настроение 🚛",
      "Агафья из Пскова! Продавец семечек, сею семена любви 🌻",
      "Никифор, истопник в котельной. Даю тепло домам, ищу тепло души 🔥",
      "Матрёна здесь! Дояр на ферме, забочусь о коровах 🐄",
      "Спиридон, пастух овец. Слежу за стадом, ищу свою паству 🐑",
      "Пелагея из Рязани! Продавец мёда, сладкая как мёд 🍯",
      "Савелий, кочегар в бане. Топлю печи, согреваю души 🔥",
      "Феврония здесь! Ткачиха, плету ткани и судьбы 🧵",
      "Макарий, мельник. Мелю зерно, ищу зёрнышко счастья 🌾",
      "Акулина из Владимира! Пчеловод, собираю мёд любви 🐝",
      "Митрофан, кузнец. Кую железо, хочу сковать судьбы ⚒️",
      "Домна здесь! Прачка, стираю грязь, ищу чистые чувства 🧺",
      "Остап, возчик. Вожу телеги, везу надежды 🐴",
      "Мавра из Костромы! Доярка, дою коров на рассвете 🌅",
      "Лука, рыбак. Ловлю рыбу, хочу поймать счастье 🎣",
      "Евдокия здесь! Огородница, выращиваю овощи и любовь 🥬",
      "Нестор, пасечник. Разводжу пчёл, ищу свою пчёлку 🍯",
      "Марфа из Смоленска! Швея, шью платья и мечты 👗",
      "Емельян, печник. Кладу печи, согреваю дома 🏠",
      "Параскева здесь! Молочница, продаю молоко 🥛",
      "Панкрат, бондарь. Делаю бочки, храню надежды 🪣",
      "Соломония из Тулы! Кружевница, плету красоту 🕸️",
      "Еремей, коновал. Лечу лошадей, лечу души 🐎",
      "Василиса здесь! Сказительница, рассказываю истории любви 📚",
      "Никодим, плотник. Строю дома из дерева и мечтаний 🪵",
      "Федора из Орла! Травница, лечу травами и добротой 🌿",
      "Порфирий, сапожник. Чиню обувь, иду к счастью 👞",
      "Анфиса здесь! Горшечница, леплю посуду и надежды 🏺",
    ];

    const USED_MESSAGES_KEY = "used_dating_messages";

    const getUsedMessages = (): string[] => {
      const stored = localStorage.getItem(USED_MESSAGES_KEY);
      return stored ? JSON.parse(stored) : [];
    };

    const saveUsedMessage = (message: string) => {
      const used = getUsedMessages();
      used.push(message);
      localStorage.setItem(USED_MESSAGES_KEY, JSON.stringify(used));
    };

    const getUnusedMessage = (): string | null => {
      const usedMessages = getUsedMessages();
      const availableMessages = uniqueDatingMessages.filter(
        (msg) => !usedMessages.includes(msg),
      );

      if (availableMessages.length === 0) {
        localStorage.removeItem(USED_MESSAGES_KEY);
        return uniqueDatingMessages[0];
      }

      return availableMessages[
        Math.floor(Math.random() * availableMessages.length)
      ];
    };

    const generateMessage = () => {
      const messageText = getUnusedMessage();
      if (!messageText) return;

      const nameMatch = messageText.match(
        /зовут (\w+)|(\w+) здесь|(\w+),|(\w+) из/,
      );
      const randomName = nameMatch
        ? nameMatch[1] || nameMatch[2] || nameMatch[3] || nameMatch[4]
        : "Аноним";

      const newMessage: Message = {
        id: `auto_${Date.now()}_${Math.random()}`,
        text: messageText,
        userId: `auto_user_${Date.now()}`,
        userName: randomName,
        chatType: "general",
        timestamp: new Date(),
      };

      addMessage(newMessage);
      saveUsedMessage(messageText);
    };

    const messageInterval = setInterval(
      () => {
        generateMessage();
      },
      Math.random() * 30000 + 15000, // от 15 до 45 секунд
    );

    return () => clearInterval(messageInterval);
  }, []);

  const handleProfileSubmit = () => {
    if (!currentUser) return;

    const newProfile: Profile = {
      id: Date.now().toString(),
      photo:
        profileForm.photo ||
        "https://images.unsplash.com/photo-1494790108755-2616b612b786",
      name: profileForm.name,
      age: parseInt(profileForm.age),
      city: profileForm.city,
      height: profileForm.height,
      weight: profileForm.weight,
      lookingFor: profileForm.lookingFor,
      about: profileForm.about,
      userId: currentUser.id,
    };

    setProfiles([...profiles, newProfile]);
    setShowProfileModal(false);
    setProfileForm({
      photo: "",
      name: "",
      age: "",
      city: "",
      height: "",
      weight: "",
      lookingFor: "",
      about: "",
    });
  };

  const handleLike = (profileId: string) => {
    if (!currentUser) return;

    const newLike: Like = {
      id: Date.now().toString(),
      fromUserId: currentUser.id,
      toProfileId: profileId,
    };

    setLikes([...likes, newLike]);
  };

  const addMessage = (message: Message) => {
    setMessages((prev) => {
      const newMessages = [...prev, message];
      saveMessages(newMessages);
      return newMessages;
    });
  };

  const handleRegisterSubmit = () => {
    const newUser: User = {
      id: Date.now().toString(),
      login: registerForm.login,
      email: registerForm.email,
    };

    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setShowRegisterForm(false);
    setRegisterForm({ login: "", email: "", password: "" });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageInput,
      userId: currentUser.id,
      userName: currentUser.login,
      chatType: activeTab === "private" ? "private" : "general",
      timestamp: new Date(),
    };

    addMessage(newMessage);
    setMessageInput("");
  };

  const handleInputFocus = () => {
    if (!isLoggedIn) {
      setShowRegisterForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100 flex flex-col">
      {/* Фоновое радио */}
      <audio ref={audioRef} loop>
        <source src="https://myradio24.org/61673" type="audio/mpeg" />
      </audio>

      {/* Хедер */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-pink-200/50">
        <div className="container mx-auto px-2 md:px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              to="/"
              className="flex items-center gap-1 md:gap-2 text-gray-600 hover:text-gray-800"
            >
              <Icon name="ArrowLeft" size={16} className="md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Radio Noumi</span>
            </Link>
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-1 md:gap-2">
              <Icon name="Heart" size={18} className="md:w-6 md:h-6" />
              <span className="hidden sm:inline">Чат знакомств</span>
              <span className="sm:hidden">Знакомства</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-3 text-sm text-gray-600">
            <Icon name="Radio" size={16} />
            <span>Фоновое радио</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Основной чат */}
        <div className="flex-1 flex flex-col min-h-0">
          <ChatSection
            messages={messages}
            activeTab={activeTab}
            selectedChat={selectedChat}
            onTabChange={setActiveTab}
            onChatSelect={setSelectedChat}
            profiles={profiles.filter(
              (profile) =>
                genderFilter === "all" || profile.gender === genderFilter,
            )}
            onLike={handleLike}
            currentUserId={currentUser?.id}
            onAddMessage={(msg) => setMessages((prev) => [...prev, msg])}
            genderFilter={genderFilter}
            onGenderFilterChange={setGenderFilter}
          />

          {/* Поле ввода */}
          <div className="p-2 md:p-4 bg-white/90 border-t border-pink-200/50">
            <div className="flex gap-2 md:gap-3 max-w-4xl mx-auto">
              <Input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onFocus={handleInputFocus}
                placeholder={
                  isLoggedIn
                    ? "Написать сообщение..."
                    : "Нажмите для создания анкеты..."
                }
                className="flex-1 text-sm md:text-base"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || !isLoggedIn}
                size={window.innerWidth < 768 ? "sm" : "default"}
              >
                <Icon name="Send" size={14} className="md:w-4 md:h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Боковая панель - скрыта на мобильных */}
        <div className="hidden md:block">
          <UserPanel
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            likes={likes}
            profiles={profiles.filter(
              (profile) =>
                genderFilter === "all" || profile.gender === genderFilter,
            )}
            onRegisterClick={() => setShowRegisterForm(true)}
            genderFilter={genderFilter}
            onGenderFilterChange={setGenderFilter}
          />
        </div>
      </div>

      {/* Модальные окна */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Создать анкету</DialogTitle>
          </DialogHeader>
          <ProfileForm
            form={profileForm}
            onChange={setProfileForm}
            onSubmit={handleProfileSubmit}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showRegisterForm} onOpenChange={setShowRegisterForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Регистрация</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Логин *</label>
              <Input
                type="text"
                placeholder="Ваш логин"
                value={registerForm.login}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, login: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Пароль *</label>
              <Input
                type="password"
                placeholder="Пароль"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleRegisterSubmit}
                disabled={
                  !registerForm.login ||
                  !registerForm.email ||
                  !registerForm.password
                }
                className="flex-1"
              >
                Зарегистрироваться
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRegisterForm(false);
                  setShowProfileModal(true);
                }}
                disabled={!isLoggedIn}
              >
                Анкета
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatingChat;
