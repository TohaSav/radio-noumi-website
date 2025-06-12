
# Инструкция по сборке Android APK

## Быстрый старт

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Добавьте Android платформу (только при первой настройке):**
   ```bash
   npm run cap:add
   ```

3. **Соберите приложение:**
   ```bash
   npm run android:build
   ```

4. **Откройте Android Studio:**
   ```bash
   npm run cap:open
   ```

## Пошаговая инструкция

### 1. Подготовка среды разработки

- Установите [Android Studio](https://developer.android.com/studio)
- Установите Android SDK (API level 33+)
- Настройте переменные окружения ANDROID_HOME и PATH

### 2. Инициализация Capacitor

```bash
# Если впервые настраиваете проект
npx cap init "Radio Noumi" "com.radionoumi.app"
npx cap add android
```

### 3. Сборка и синхронизация

```bash
# Сборка веб-приложения и синхронизация с Android
npm run cap:build

# Альтернативно - отдельные команды
npm run build
npx cap sync
```

### 4. Открытие в Android Studio

```bash
npm run cap:open
```

### 5. Сборка APK в Android Studio

1. В Android Studio: Build → Build Bundle(s) / APK(s) → Build APK(s)
2. APK файл будет в: `android/app/build/outputs/apk/debug/app-debug.apk`

### 6. Настройка для релиза

Для создания подписанного APK:

1. Создайте keystore файл
2. Настройте `android/app/build.gradle`
3. Build → Generate Signed Bundle / APK

## Команды для разработки

```bash
# Разработка с hot reload
npm run android:dev

# Обновление native кода
npm run cap:sync

# Просмотр логов
npx cap run android --log
```

## Возможные проблемы

### Ошибка Java/Gradle
- Проверьте версию Java (должна быть 11+)
- Обновите Gradle в Android Studio

### Проблемы с разрешениями
- Добавьте необходимые разрешения в `android/app/src/main/AndroidManifest.xml`

### Ошибки сборки
- Очистите кеш: `./gradlew clean` в папке android
- Пересоберите: `npm run cap:build`

## Структура проекта

```
├── android/          # Native Android код
├── src/             # React приложение
├── dist/            # Собранное веб-приложение
└── capacitor.config.ts  # Конфигурация Capacitor
```

## Готовое приложение включает:

✅ Радиоплеер с визуализацией
✅ Stories и Reels
✅ Чат знакомств
✅ Живой чат
✅ Мобильная навигация
✅ Haptic feedback
✅ Splash screen
✅ Status bar настройки
✅ Адаптивный дизайн

После сборки получите полноценное Android приложение Radio Noumi!
