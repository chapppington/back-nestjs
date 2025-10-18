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
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST') || 'smtp.yandex.ru',
      port: parseInt(this.configService.get('MAIL_PORT')) || 465,
      secure: this.configService.get('MAIL_SECURE') === 'true' || true,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  /**
   * Отправляет email письмо
   * @param options - Опции для отправки письма
   * @returns Promise с результатом отправки
   */
  async sendMail(options: SendEmailOptions): Promise<any> {
    const mailOptions = {
      from: `"${this.configService.get('MAIL_FROM_NAME') || this.configService.get('MAIL_USER')}" <${this.configService.get('MAIL_USER')}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Письмо отправлено: ${info.messageId}`);
      return info;
    } catch (error) {
      this.logger.error(`Ошибка отправки письма: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Отправляет уведомление о новой заявке
   * @param submissionData - Данные заявки
   */
  async sendSubmissionNotification(submissionData: any): Promise<void> {
    const { formType, name, email, phone, comments, files } = submissionData;

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
    
    await this.sendMail({
      to: recipientEmail,
      subject,
      text,
      html,
    });
  }
}
