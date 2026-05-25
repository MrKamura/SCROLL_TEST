# SCROLL — СВИТОК ЛАЙТ

Демо-модуль универсального анализа первичных документов для бухгалтеров, менеджеров и секретарей.

Загрузите документ (или выберите пример) — получите структурированные поля, автоматические проверки, список позиций и рекомендации по дальнейшим действиям.

## Возможности

- **Три типа документов:** счёт-фактура, акт выполненных работ, товарная накладная
- **Сценарий «До → Обработка → После»:** карточка файла, анимация прогресса, блок результата
- **Извлечённые поля** — полная таблица реквизитов с кнопкой «Скопировать данные» (TSV для Excel)
- **Автоматические проверки** — OK / Внимание / Риски с анимированными счётчиками
- **Позиции** — таблица товаров и услуг (на мобильных — карточки)
- **Что нужно сделать** — конкретные рекомендации бухгалтеру
- **История** — последние 3 обработанных документа (localStorage)
- **Тёмная / светлая тема** с сохранением выбора
- **Адаптивная вёрстка** — desktop и mobile

## Стек

| Слой | Технологии |
|------|------------|
| UI | React 19, TypeScript |
| Сборка | Vite 8 |
| Стили | Tailwind CSS 4, дизайн-токены |
| Шрифт | Inter (Google Fonts) |
| Данные (демо) | Mock-данные в `src/data/mockDocuments.ts` |

## Структура проекта

```
SCROLL/
├── public/
│   └── samples/          # Примеры документов (invoice.png)
├── src/
│   ├── components/       # UI-компоненты
│   ├── data/             # Mock-данные для демо
│   ├── hooks/            # useTheme, useDocumentHistory, useAnimatedCounter
│   ├── styles/tokens.css # Дизайн-токены (цвета, типографика)
│   ├── types/            # TypeScript-типы
│   ├── utils/            # copyTable, formatFileSize
│   └── App.tsx           # Главная страница
├── index.html
├── vite.config.ts
└── package.json
```

## Требования

- **Node.js** 20+
- **npm** 10+

## Запуск локально

```bash
git clone https://github.com/MrKamura/SCROLL_TEST.git
cd SCROLL_TEST
npm install
npm run dev
```

Приложение откроется по адресу **http://localhost:5173/**

### Другие команды

```bash
npm run build    # Production-сборка → папка dist/
npm run preview  # Просмотр production-сборки локально
npm run lint     # ESLint
```

## Деплой

Проект — **статическое SPA**. После сборки достаточно отдать содержимое `dist/` любому static-хостингу.

```bash
npm install
npm run build
```

| Параметр | Значение |
|----------|----------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | 20 |

Просмотр production-сборки локально:

```bash
npm run preview
# → http://localhost:4173
```

### Docker (опционально)

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t scroll .
docker run -p 8080:80 scroll
```

## Дизайн-токены

Определены в `src/styles/tokens.css`:

| Токен | Назначение |
|-------|------------|
| `bg-page` | Фон страницы |
| `bg-card` | Фон карточек |
| `border-border` | Границы |
| `text-foreground` | Основной текст |
| `text-muted` | Вторичный текст |
| `text-accent` / `bg-accent` | Акцент |
| `text-success` / `text-warning` / `text-error` | Статусы |

Типографика: `text-page-title`, `text-block-title`, `text-table-data`, `text-status`.

## Сценарий использования

1. Выберите один из **трёх примеров** документов
2. Дождитесь **анимации обработки** (~5 сек)
3. Изучите **результат:** KPI, поля, проверки, позиции, действия
4. При необходимости нажмите **«Скопировать данные»** — таблица полей попадёт в буфер
5. Переключите **тему** или откройте документ из **истории**

## Лицензия

Private / demo project.
