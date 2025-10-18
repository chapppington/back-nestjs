require('dotenv').config();
const nodemailer = require("nodemailer");

// Создаем транспорт для подключения к SMTP Яндекса
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.yandex.ru",
  port: parseInt(process.env.MAIL_PORT) || 465,
  secure: process.env.MAIL_SECURE === 'true' || true, // использовать STARTTLS для порта 587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD, // или пароль приложения
  },
});

// Настройки письма
const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME || process.env.MAIL_USER}" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TEST_RECIPIENT || "nikitamal902@gmail.com",
    subject: "Тестовое письмо",
    text: "Привет! Это простое текстовое письмо.",
  };
  
  // Отправляем письмо
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Ошибка отправки:", error);
    } else {
      console.log("Письмо отправлено:", info.messageId);
    }
  });
  
  