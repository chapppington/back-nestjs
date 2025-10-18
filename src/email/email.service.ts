import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    // Создаем транспорт для подключения к SMTP Яндекса
    const host = this.configService.get('MAIL_HOST') || 'smtp.yandex.ru';
    const port = parseInt(this.configService.get('MAIL_PORT')) || 465;
    const user = this.configService.get('MAIL_USER');
    
    this.logger.log('=== Инициализация Email Service ===');
    this.logger.log(`SMTP Host: ${host}`);
    this.logger.log(`SMTP Port: ${port}`);
    this.logger.log(`SMTP User: ${user}`);
    this.logger.log(`Secure Connection: ${this.configService.get('MAIL_SECURE') === 'true' || true}`);
    
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: this.configService.get('MAIL_SECURE') === 'true' || true,
      auth: {
        user,
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
    
    this.logger.log('Email транспорт успешно создан');
  }

  /**
   * Отправляет email письмо
   * @param options - Опции для отправки письма
   * @returns Promise с результатом отправки
   */
  async sendMail(options: SendEmailOptions): Promise<any> {
    const fromName = this.configService.get('MAIL_FROM_NAME') || this.configService.get('MAIL_USER');
    const fromEmail = this.configService.get('MAIL_USER');
    
    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const startTime = Date.now();
    
    this.logger.log('=== Начало отправки письма ===');
    this.logger.log(`От кого: "${fromName}" <${fromEmail}>`);
    this.logger.log(`Кому: ${options.to}`);
    this.logger.log(`Тема: ${options.subject}`);
    this.logger.log(`Размер текста: ${options.text?.length || 0} символов`);
    this.logger.log(`Размер HTML: ${options.html?.length || 0} символов`);

    try {
      const info = await this.transporter.sendMail(mailOptions);
      const duration = Date.now() - startTime;
      
      this.logger.log('=== Письмо успешно отправлено ===');
      this.logger.log(`Message ID: ${info.messageId}`);
      this.logger.log(`Получатель: ${options.to}`);
      this.logger.log(`Тема: ${options.subject}`);
      this.logger.log(`Время отправки: ${duration}ms`);
      this.logger.log(`Response: ${info.response}`);
      
      return info;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      this.logger.error('=== ОШИБКА при отправке письма ===');
      this.logger.error(`Получатель: ${options.to}`);
      this.logger.error(`Тема: ${options.subject}`);
      this.logger.error(`Время до ошибки: ${duration}ms`);
      this.logger.error(`Тип ошибки: ${error.name}`);
      this.logger.error(`Сообщение ошибки: ${error.message}`);
      this.logger.error(`Код ошибки: ${error.code || 'N/A'}`);
      this.logger.error(`Stack trace:`, error.stack);
      
      throw error;
    }
  }

  /**
   * Отправляет уведомление о новой заявке
   * @param submissionData - Данные заявки
   */
  async sendSubmissionNotification(submissionData: any): Promise<void> {
    this.logger.log('=== Подготовка уведомления о заявке ===');
    
    const { formType, name, email, phone, comments, files } = submissionData;

    this.logger.log(`Тип формы: ${formType}`);
    this.logger.log(`Имя отправителя: ${name}`);
    this.logger.log(`Email отправителя: ${email || 'не указан'}`);
    this.logger.log(`Телефон отправителя: ${phone || 'не указан'}`);
    this.logger.log(`Есть комментарии: ${!!comments}`);
    this.logger.log(`Количество файлов: ${files?.length || 0}`);
    
    if (files && files.length > 0) {
      this.logger.log('Прикрепленные файлы:');
      files.forEach((file: string, index: number) => {
        this.logger.log(`  ${index + 1}. ${file}`);
      });
    }

    const subject = `Новая заявка: ${formType}`;
    
    let text = `Получена новая заявка\n\n`;
    text += `Тип формы: ${formType}\n`;
    text += `Имя: ${name}\n`;
    if (email) text += `Email: ${email}\n`;
    if (phone) text += `Телефон: ${phone}\n`;
    if (comments) text += `Комментарии: ${comments}\n`;
    if (files && files.length > 0) {
      text += `\nПрикрепленные файлы:\n`;
      files.forEach((file: string) => {
        text += `- ${file}\n`;
      });
    }

    const html = `
      <h2>Получена новая заявка</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Тип формы:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${formType}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Имя:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
        </tr>
        ${email ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
        </tr>
        ` : ''}
        ${phone ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Телефон:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
        </tr>
        ` : ''}
        ${comments ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Комментарии:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${comments}</td>
        </tr>
        ` : ''}
      </table>
      ${files && files.length > 0 ? `
      <h3>Прикрепленные файлы:</h3>
      <ul>
        ${files.map((file: string) => `<li>${file}</li>`).join('')}
      </ul>
      ` : ''}
    `;

    const recipientEmail = this.configService.get('MAIL_RECIPIENT') || this.configService.get('MAIL_USER');
    
    this.logger.log(`Получатель уведомления: ${recipientEmail}`);
    this.logger.log(`Тема письма: ${subject}`);
    
    try {
      await this.sendMail({
        to: recipientEmail,
        subject,
        text,
        html,
      });
      
      this.logger.log('=== Уведомление о заявке успешно отправлено ===');
    } catch (error) {
      this.logger.error('=== ОШИБКА при отправке уведомления о заявке ===');
      this.logger.error(`Не удалось отправить уведомление для заявки от: ${name}`);
      throw error;
    }
  }
}
