import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'argon2';
import * as readline from 'readline';

const prisma = new PrismaClient();

/**
 * Скрипт для создания нового пользователя с ролью MANAGER
 * 
 * Использование:
 * pnpm run create-manager
 * 
 * Или с передачей параметров:
 * pnpm run create-manager -- --email=manager@example.com --password=SecurePass123 --name="Иван Иванов" --phone="+79001234567"
 */

interface CreateManagerOptions {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

function parseArgs(): Partial<CreateManagerOptions> {
  const args = process.argv.slice(2);
  const options: Partial<CreateManagerOptions> = {};

  for (const arg of args) {
    if (arg.startsWith('--email=')) {
      options.email = arg.split('=')[1];
    } else if (arg.startsWith('--password=')) {
      options.password = arg.split('=')[1];
    } else if (arg.startsWith('--name=')) {
      options.name = arg.split('=')[1];
    } else if (arg.startsWith('--phone=')) {
      options.phone = arg.split('=')[1];
    }
  }

  return options;
}

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function question(rl: readline.Interface, query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function promptForData(): Promise<CreateManagerOptions> {
  const rl = createInterface();
  
  console.log('\n📝 Создание пользователя с ролью MANAGER\n');
  
  const email = await question(rl, 'Email (обязательно): ');
  if (!email) {
    rl.close();
    throw new Error('Email обязателен');
  }

  const password = await question(rl, 'Пароль (минимум 6 символов): ');
  if (!password || password.length < 6) {
    rl.close();
    throw new Error('Пароль должен быть минимум 6 символов');
  }

  const name = await question(rl, 'Имя (необязательно): ');
  const phone = await question(rl, 'Телефон (необязательно): ');

  rl.close();

  return {
    email: email.trim(),
    password: password.trim(),
    name: name.trim() || undefined,
    phone: phone.trim() || undefined,
  };
}

async function createManager(options: CreateManagerOptions) {
  console.log('\n🔍 Проверка существующего пользователя...');

  // Проверяем, существует ли пользователь с таким email
  const existingUserByEmail = await prisma.user.findUnique({
    where: { email: options.email },
  });

  if (existingUserByEmail) {
    throw new Error(`Пользователь с email "${options.email}" уже существует`);
  }

  // Проверяем, существует ли пользователь с таким телефоном
  if (options.phone) {
    const existingUserByPhone = await prisma.user.findUnique({
      where: { phone: options.phone },
    });

    if (existingUserByPhone) {
      throw new Error(`Пользователь с телефоном "${options.phone}" уже существует`);
    }
  }

  console.log('🔐 Хеширование пароля...');
  const hashedPassword = await hash(options.password);

  console.log('💾 Создание пользователя...');
  const user = await prisma.user.create({
    data: {
      email: options.email,
      password: hashedPassword,
      name: options.name,
      phone: options.phone,
      rights: [Role.MANAGER],
    },
  });

  console.log('\n' + '='.repeat(60));
  console.log('✅ Пользователь успешно создан!');
  console.log('='.repeat(60));
  console.log(`ID:       ${user.id}`);
  console.log(`Email:    ${user.email}`);
  console.log(`Имя:      ${user.name || '—'}`);
  console.log(`Телефон:  ${user.phone || '—'}`);
  console.log(`Роли:     ${user.rights.join(', ')}`);
  console.log('='.repeat(60));
  console.log('\n💡 Теперь можно войти в систему с этими учетными данными\n');
}

async function main() {
  try {
    const args = parseArgs();

    let options: CreateManagerOptions;

    // Если есть аргументы командной строки, используем их
    if (args.email && args.password) {
      options = args as CreateManagerOptions;
      console.log('\n📋 Используются параметры из командной строки\n');
    } else {
      // Иначе запрашиваем данные интерактивно
      options = await promptForData();
    }

    await createManager(options);
  } catch (error) {
    console.error('\n❌ Ошибка:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

