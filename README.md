# Backend API для СибКомплект

Серверная часть веб-сайта компании СибКомплект, построенная на NestJS с использованием PostgreSQL и Prisma ORM.

## 📋 Содержание

- [Технологии](#технологии)
- [Структура проекта](#структура-проекта)
- [Установка и настройка](#установка-и-настройка)
- [Переменные окружения](#переменные-окружения)
- [База данных](#база-данных)
- [API Endpoints](#api-endpoints)
- [Аутентификация](#аутентификация)
- [Развертывание](#развертывание)
- [Скрипты](#скрипты)

## 🚀 Технологии

- **Framework**: NestJS 11.x
- **Database**: PostgreSQL
- **ORM**: Prisma 6.x
- **Authentication**: JWT, Passport.js
- **Validation**: class-validator, class-transformer
- **Email**: Nodemailer, React Email
- **File Upload**: Multer
- **Password Hashing**: Argon2
- **Testing**: Jest
- **TypeScript**: 5.x

## 📁 Структура проекта

```
src/
├── auth/                    # Модуль аутентификации
│   ├── decorators/         # Декораторы для авторизации
│   ├── dto/               # DTO для аутентификации
│   ├── guards/            # Guards для защиты роутов
│   └── strategies/        # Стратегии Passport.js
├── user/                   # Управление пользователями
├── news/                   # Управление новостями
├── portfolio/              # Портфолио проектов
├── product/                # Каталог продукции
├── vacancy/                # Вакансии
├── submissions/            # Заявки с форм сайта
├── *-page-config/          # Конфигурации страниц сайта
│   ├── home-page-config/   # Главная страница
│   ├── about-page-config/  # О компании
│   ├── production-page-config/ # Производство
│   ├── vacancies-page-config/  # Вакансии
│   ├── certificates-page-config/ # Сертификаты
│   └── contacts-page-config/   # Контакты
├── site-config/            # Общие настройки сайта
├── site-seo-settings/      # SEO настройки
├── navbar-config/          # Конфигурация навигации
├── footer-config/          # Конфигурация футера
├── config/                 # Конфигурационные файлы
├── utils/                  # Утилиты
├── constants.ts            # Константы приложения
├── prisma.service.ts       # Сервис Prisma
└── main.ts                # Точка входа приложения
```

## 🔧 Установка и настройка

### Предварительные требования

- Node.js 18+ 
- PostgreSQL 12+
- pnpm (рекомендуется)

### Установка зависимостей

```bash
# Установка зависимостей
pnpm install

# Или с npm
npm install
```

### Настройка базы данных

1. Установите PostgreSQL и создайте базу данных
2. Скопируйте `.env.example` в `.env` и настройте переменные окружения
3. Примените миграции:

```bash
# Для разработки (синхронизация схемы)
npx prisma db push

# Для продакшена (миграции)
npx prisma migrate deploy
```

4. (Опционально) Заполните базу тестовыми данными:

```bash
npx prisma db seed
```

## 🔐 Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# База данных
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key"

# OAuth провайдеры
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:4200/auth/google/redirect"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GITHUB_CALLBACK_URL="http://localhost:4200/auth/github/redirect"

YANDEX_CLIENT_ID="your-yandex-client-id"
YANDEX_CLIENT_SECRET="your-yandex-client-secret"
YANDEX_CALLBACK_URL="http://localhost:4200/auth/yandex/redirect"

TWITCH_CLIENT_ID="your-twitch-client-id"
TWITCH_CLIENT_SECRET="your-twitch-client-secret"
TWITCH_CALLBACK_URL="https://your-ngrok-url/auth/twitch/redirect"

# Telegram Bot
TELEGRAM_BOT_TOKEN="your-telegram-bot-token"

# Apple OAuth (опционально)
APPLE_CLIENT_ID="your-apple-client-id"
APPLE_TEAM_ID="your-apple-team-id"
APPLE_KEY_ID="your-apple-key-id"
APPLE_PRIVATE_KEY="your-apple-private-key"
APPLE_CALLBACK_URL="https://localhost:4200/auth/apple/redirect"

# SMTP для отправки email
SMTP_SERVER="smtp.mailgun.org"
SMTP_LOGIN="your-smtp-login"
SMTP_PASSWORD="your-smtp-password"

# reCAPTCHA
RECAPTCHA_SECRET_KEY="your-recaptcha-secret-key"

# Infobip (SMS & WhatsApp)
INFOBIP_API_KEY="your-infobip-api-key"
INFOBIP_API_URL="your-infobip-api-url"
INFOBIP_WHATSAPP_NUMBER="your-whatsapp-number"
```

## 🗄️ База данных

### Основные модели

- **User** - Пользователи системы с ролевой моделью
- **News** - Новости компании
- **PortfolioItem** - Проекты в портфолио
- **Product** - Каталог продукции
- **Vacancy** - Вакансии
- **FormSubmission** - Заявки с форм сайта
- **SiteSeoSettings** - SEO настройки страниц
- **\*PageConfig** - Конфигурации контента страниц

### Роли пользователей

- `USER` - Обычный пользователь
- `PREMIUM` - Премиум пользователь
- `MANAGER` - Менеджер
- `ADMIN` - Администратор

### Команды Prisma

```bash
# Генерация клиента Prisma
npx prisma generate

# Применение изменений схемы (разработка)
npx prisma db push

# Создание миграции
npx prisma migrate dev --name migration_name

# Применение миграций (продакшен)
npx prisma migrate deploy

# Просмотр базы данных
npx prisma studio
```

## 📡 API Endpoints

### Аутентификация
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `POST /api/auth/logout` - Выход
- `POST /api/auth/refresh` - Обновление токена
- `GET /auth/google` - OAuth Google
- `GET /auth/github` - OAuth GitHub
- `GET /auth/yandex` - OAuth Yandex
- `GET /auth/twitch` - OAuth Twitch

### Контент
- `GET /api/news` - Список новостей
- `GET /api/news/:slug` - Новость по slug
- `GET /api/portfolio` - Портфолио проектов
- `GET /api/products` - Каталог продукции
- `GET /api/vacancies` - Список вакансий

### Конфигурация страниц
- `GET /api/home-page-config` - Конфигурация главной страницы
- `GET /api/about-page-config` - Конфигурация страницы "О компании"
- `GET /api/production-page-config` - Конфигурация страницы производства
- `GET /api/navbar-config` - Конфигурация навигации
- `GET /api/footer-config` - Конфигурация футера

### Заявки
- `POST /api/submissions` - Отправка заявки
- `GET /api/submissions` - Список заявок (админ)

### Административные эндпоинты
Все административные эндпоинты требуют аутентификации и соответствующих прав:

- `POST /api/news` - Создание новости
- `PUT /api/news/:id` - Обновление новости
- `DELETE /api/news/:id` - Удаление новости
- `POST /api/products` - Создание продукта
- `PUT /api/products/:id` - Обновление продукта
- И т.д. для всех сущностей

## 🔒 Аутентификация

Система поддерживает несколько способов аутентификации:

### JWT токены
- Access токен (короткий срок жизни)
- Refresh токен (длительный срок жизни)
- Автоматическое обновление токенов

### OAuth провайдеры
- Google
- GitHub
- Yandex
- Twitch
- Telegram
- Apple (опционально)

### Защита роутов

```typescript
// Требует аутентификации
@UseGuards(JwtGuard)
@Get('profile')
getProfile(@User() user: User) {
  return user;
}

// Требует определенную роль
@Roles(Role.ADMIN)
@UseGuards(JwtGuard, RolesGuard)
@Post('admin-only')
adminOnlyEndpoint() {
  // Только для администраторов
}
```

## 🚀 Развертывание

### Разработка

```bash
# Запуск в режиме разработки
pnpm run start:dev

# Запуск с отладкой
pnpm run start:debug
```

### Продакшен

```bash
# Сборка проекта
pnpm run build

# Запуск продакшен версии
pnpm run start:prod
```

### Docker (опционально)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 4200

CMD ["npm", "run", "start:prod"]
```

### PM2 (рекомендуется для продакшена)

```bash
# Установка PM2
npm install -g pm2

# Запуск с PM2
pm2 start ecosystem.config.js

# Мониторинг
pm2 monit

# Логи
pm2 logs
```

## 📜 Скрипты

```bash
# Разработка
pnpm run start:dev          # Запуск с hot reload
pnpm run start:debug        # Запуск с отладчиком

# Сборка и продакшен
pnpm run build              # Сборка проекта
pnpm run start:prod         # Запуск продакшен версии

# Тестирование
pnpm run test               # Запуск тестов
pnpm run test:watch         # Тесты в watch режиме
pnpm run test:cov           # Тесты с покрытием
pnpm run test:e2e           # E2E тесты

# Линтинг и форматирование
pnpm run lint               # Проверка кода ESLint
pnpm run format             # Форматирование Prettier

# Утилиты
pnpm run email              # Разработка email шаблонов
pnpm run ngrok              # Запуск ngrok для Twitch OAuth
```

## 🔧 Настройка OAuth провайдеров

### Google OAuth
1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте проект и настройте OAuth 2.0
3. Добавьте redirect URI: `http://localhost:4200/auth/google/redirect`

### GitHub OAuth
1. Перейдите в [GitHub Developer Settings](https://github.com/settings/developers)
2. Создайте OAuth App
3. Добавьте callback URL: `http://localhost:4200/auth/github/redirect`

### Twitch OAuth
⚠️ **Важно**: Twitch требует HTTPS, используйте ngrok для разработки:

```bash
pnpm run ngrok
```

### Telegram Bot
1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Получите токен бота
3. Настройте домен командой `/setdomain`

## 📧 Настройка Email

Проект использует React Email для создания шаблонов писем:

```bash
# Запуск dev сервера для email шаблонов
pnpm run email
```

Шаблоны находятся в директории `emails/` (если есть).

## 🐛 Отладка

### Логирование
Используйте встроенный Logger NestJS:

```typescript
import { Logger } from '@nestjs/common';

private readonly logger = new Logger(ServiceName.name);

this.logger.log('Информационное сообщение');
this.logger.error('Ошибка', error.stack);
this.logger.warn('Предупреждение');
```

### Prisma Studio
Для просмотра и редактирования данных в БД:

```bash
npx prisma studio
```

