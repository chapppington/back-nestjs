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
   * Форматирует JSON данные в красивую HTML таблицу
   */
  private formatMetaDataAsHtml(meta: any): string {
    if (!meta || typeof meta !== 'object') {
      return '';
    }

    const formatValue = (value: any): string => {
      if (value === null || value === undefined) {
        return '<em>не указано</em>';
      }
      if (typeof value === 'boolean') {
        return value ? 'Да' : 'Нет';
      }
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      if (typeof value === 'object') {
        return JSON.stringify(value, null, 2).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;');
      }
      return String(value);
    };

    const formatLabel = (key: string): string => {
      // Преобразуем camelCase в читаемый текст
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();
    };

    let html = '<table style="border-collapse: collapse; width: 100%; margin-top: 15px;">';
    
    for (const [key, value] of Object.entries(meta)) {
      html += `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold; width: 40%;">
            ${formatLabel(key)}
          </td>
          <td style="padding: 8px; border: 1px solid #ddd;">
            ${formatValue(value)}
          </td>
        </tr>
      `;
    }
    
    html += '</table>';
    return html;
  }

  /**
   * Отправляет уведомление о новой заявке
   * @param submissionData - Данные заявки
   */
  async sendSubmissionNotification(submissionData: any): Promise<void> {
    this.logger.log('=== Подготовка уведомления о заявке ===');
    
    const { formType, name, email, phone, comments, files, meta } = submissionData;

    this.logger.log(`Тип формы: ${formType}`);
    this.logger.log(`Имя отправителя: ${name}`);
    this.logger.log(`Email отправителя: ${email || 'не указан'}`);
    this.logger.log(`Телефон отправителя: ${phone || 'не указан'}`);
    this.logger.log(`Есть комментарии: ${!!comments}`);
    this.logger.log(`Количество файлов: ${files?.length || 0}`);
    this.logger.log(`Есть meta данные: ${!!meta}`);
    
    if (files && files.length > 0) {
      this.logger.log('Прикрепленные файлы:');
      files.forEach((file: string, index: number) => {
        this.logger.log(`  ${index + 1}. ${file}`);
      });
    }

    const subject = `Новая заявка: ${formType}`;
    const backendUrl = 'https://sibkomplekt.ru';
    
    let text = `Получена новая заявка\n\n`;
    text += `Тип формы: ${formType}\n`;
    text += `Имя: ${name}\n`;
    if (email) text += `Email: ${email}\n`;
    if (phone) text += `Телефон: ${phone}\n`;
    if (comments) text += `Комментарии: ${comments}\n`;
    if (files && files.length > 0) {
      text += `\nПрикрепленные файлы:\n`;
      files.forEach((file: string) => {
        text += `- ${backendUrl}/uploads/submissions/${file}\n`;
      });
    }
    if (meta) {
      text += `\nДополнительные данные: ${JSON.stringify(meta, null, 2)}\n`;
    }

    // Формируем HTML для основной информации
    let html = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Получена новая заявка
        </h2>
        
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold; width: 30%;">
              Тип формы:
            </td>
            <td style="padding: 12px; border: 1px solid #ddd;">
              ${formType}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">
              Имя:
            </td>
            <td style="padding: 12px; border: 1px solid #ddd;">
              ${name}
            </td>
          </tr>
          ${email ? `
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">
              Email:
            </td>
            <td style="padding: 12px; border: 1px solid #ddd;">
              <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
            </td>
          </tr>
          ` : ''}
          ${phone ? `
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">
              Телефон:
            </td>
            <td style="padding: 12px; border: 1px solid #ddd;">
              <a href="tel:${phone}" style="color: #007bff; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          ` : ''}
          ${comments ? `
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd; background-color: #f5f5f5; font-weight: bold;">
              Комментарии:
            </td>
            <td style="padding: 12px; border: 1px solid #ddd;">
              ${comments}
            </td>
          </tr>
          ` : ''}
        </table>
    `;

    // Добавляем секцию с файлами для резюме (VACANCY)
    if (files && files.length > 0 && formType === 'VACANCY') {
      html += `
        <div style="margin: 20px 0; padding: 20px; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #28a745;">
          <h3 style="color: #28a745; margin-top: 0;">📄 Резюме кандидата</h3>
          ${files.map((file: string) => {
            const fileUrl = `${backendUrl}/uploads/submissions/${file}`;
            return `
              <div style="margin: 10px 0;">
                <a href="${fileUrl}" 
                   style="display: inline-block; 
                          padding: 12px 24px; 
                          background-color: #28a745; 
                          color: white; 
                          text-decoration: none; 
                          border-radius: 5px;
                          font-weight: bold;
                          transition: background-color 0.3s;">
                  📥 Смотреть резюме кандидата
                </a>
                <p style="margin: 5px 0; color: #666; font-size: 12px;">
                  Файл: ${file}
                </p>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } 
    // Для других типов форм просто показываем список файлов
    else if (files && files.length > 0) {
      html += `
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">📎 Прикрепленные файлы:</h3>
          <ul style="list-style: none; padding: 0;">
            ${files.map((file: string) => {
              const fileUrl = `${backendUrl}/uploads/submissions/${file}`;
              return `
                <li style="margin: 8px 0;">
                  <a href="${fileUrl}" style="color: #007bff; text-decoration: none;">
                    📄 ${file}
                  </a>
                </li>
              `;
            }).join('')}
          </ul>
        </div>
      `;
    }

    // Добавляем секцию с данными опросного листа (QUESTIONNAIRE)
    if (meta && formType === 'QUESTIONNAIRE') {
      html += `
        <div style="margin: 20px 0;">
          <h3 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 8px;">
            📋 Данные опросного листа
          </h3>
          ${this.formatMetaDataAsHtml(meta)}
        </div>
      `;
    }
    // Для других типов форм показываем meta данные если есть
    else if (meta) {
      html += `
        <div style="margin: 20px 0;">
          <h3 style="color: #333;">📝 Дополнительная информация:</h3>
          ${this.formatMetaDataAsHtml(meta)}
        </div>
      `;
    }

    html += `
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Это автоматическое уведомление. Не отвечайте на это письмо.</p>
        </div>
      </div>
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
