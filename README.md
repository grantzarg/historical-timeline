# Исторические даты - Timeline Component

React компонент для отображения исторических периодов с интерактивной навигацией и слайдером событий.

## 🌟 Особенности

- 🎯 **TypeScript** - Полная типизация для надежности кода
- ⚛️ **React 18** - Современные функциональные компоненты и хуки
- 🎨 **SASS/SCSS** - Продвинутая стилизация с использованием препроцессора
- 📦 **Webpack** - Современная сборка с поддержкой всех необходимых лоадеров
- 🎪 **GSAP** - Плавные анимации для улучшения UX
- 📱 **Swiper** - Интерактивный слайдер для событий
- 🎨 **Адаптивный дизайн** - Корректное отображение на всех устройствах
- 🧪 **Jest + Testing Library** - Полное покрытие тестами
- 🔍 **ESLint** - Качество кода и соблюдение стандартов
- 🚀 **GitHub Pages** - Автоматический деплой

## 🏗️ Архитектура

```
src/
├── components/           # Переиспользуемые UI компоненты
│   ├── Button/          # Кнопка с вариантами стилей
│   └── Slider/          # Обертка для Swiper
├── containers/          # Компоненты с бизнес-логикой
│   └── HistoricalTimeline/
│       ├── HistoricalTimeline.tsx      # Основной контейнер
│       ├── CircularNavigation/         # Круговая навигация
│       └── EventsSlider/               # Слайдер событий
├── hooks/               # Кастомные хуки
│   └── useTimeline.ts   # Логика управления таймлайном
├── types/               # TypeScript типы
│   ├── timeline.ts      # Типы для таймлайна
│   └── swiper.ts        # Типы для Swiper
├── constants/           # Константы проекта
│   ├── navigation.ts    # Константы навигации
│   └── slider.ts        # Константы слайдера
├── data/                # Конфигурация данных
│   └── config.ts        # Данные периодов и событий
└── styles/              # Глобальные стили
    └── global.scss      # Глобальные стили и переменные
```

## 🚀 Установка и запуск

1. **Клонируйте репозиторий:**
```bash
git clone https://github.com/grantzarg/historical-timeline.git
cd historical-timeline
```

2. **Установите зависимости:**
```bash
npm install
```

3. **Запустите проект в режиме разработки:**
```bash
npm run dev
```

4. **Для сборки проекта:**
```bash
npm run build
```

## 🧪 Тестирование

```bash
# Запуск всех тестов
npm test

# Запуск тестов в режиме watch
npm run test:watch
```

**Покрытие тестами:**
- ✅ Button компонент (5 тестов)
- ✅ Slider компонент (3 теста)  
- ✅ useTimeline хук (5 тестов)

## 🔍 Линтинг

```bash
# Проверка кода
npm run lint

# Автоматическое исправление
npm run lint:fix
```

## 📱 Использование

```tsx
import { HistoricalTimeline } from './containers/HistoricalTimeline/HistoricalTimeline';
import { periods } from './data/config';

function App() {
  return (
    <HistoricalTimeline periods={periods} />
  );
}
```

## 📊 Структура данных

```typescript
interface TimelinePeriod {
  id: string;
  category: string;
  categoryNumber: number;
  startYear: number;
  endYear: number;
  events: Event[];
}

interface Event {
  id: string;
  year: number;
  description: string;
}
```

## 🎨 Основные компоненты

### CircularNavigation
- Круговая навигация по периодам
- Плавная анимация поворота
- Отображение годов с анимацией
- Категории периодов

### EventsSlider  
- Слайдер событий с Swiper
- Адаптивное количество слайдов
- Навигационные кнопки
- Пагинация для мобильных устройств

### Button
- Переиспользуемый компонент кнопки
- Варианты стилей (primary, secondary, nav)
- Размеры (small, medium, large)
- Состояния (disabled, loading)

## 🌐 Деплой

Проект автоматически деплоится на GitHub Pages при пуше в ветку `main`.

**Live Demo:** [https://grantzarg.github.io/historical-timeline](https://grantzarg.github.io/historical-timeline)

## 🛠️ Технологии

- **Frontend:** React 18, TypeScript, SASS/SCSS
- **Анимации:** GSAP
- **Слайдер:** Swiper.js
- **Сборка:** Webpack 5
- **Тестирование:** Jest, React Testing Library
- **Линтинг:** ESLint, TypeScript ESLint
- **Деплой:** GitHub Actions, GitHub Pages

## 📝 Скрипты

```json
{
  "dev": "webpack serve --mode development",
  "build": "webpack --mode production", 
  "test": "jest",
  "test:watch": "jest --watch",
  "lint": "eslint src --ext .ts,.tsx",
  "lint:fix": "eslint src --ext .ts,.tsx --fix",
  "type-check": "tsc --noEmit"
}
```
