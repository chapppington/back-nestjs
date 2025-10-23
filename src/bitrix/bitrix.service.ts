import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { readFile } from 'fs/promises';
import { join } from 'path';

export interface BitrixLeadData {
  title: string;
  name: string;
  lastName?: string;
  secondName?: string;
  email?: string;
  phone?: string;
  comments?: string;
  companyTitle?: string;
  addressCity?: string;
  web?: string;
}

export interface BitrixFileData {
  filename: string;
  content: string; // base64 encoded
}

@Injectable()
export class BitrixService {
  private readonly logger = new Logger(BitrixService.name);
  private readonly bitrixWebhookUrl: string;

  constructor(private configService: ConfigService) {
    // URL вебхука из .env
    this.bitrixWebhookUrl = this.configService.get<string>(
      'BITRIX_WEBHOOK_URL'
    );

    this.logger.log(`Bitrix сервис инициализирован. Webhook URL: ${this.bitrixWebhookUrl}`);
  }

  /**
   * Создает лид в Bitrix24
   * @param leadData - Данные лида
   * @param files - Массив путей к файлам (опционально)
   * @returns ID созданного лида
   */
  async createLead(leadData: BitrixLeadData, files?: string[]): Promise<number> {
    this.logger.log('=== Начало создания лида в Bitrix24 ===');
    this.logger.log(`Заголовок лида: ${leadData.title}`);
    this.logger.log(`Имя клиента: ${leadData.name}`);
    this.logger.log(`Email: ${leadData.email || 'не указан'}`);
    this.logger.log(`Телефон: ${leadData.phone || 'не указан'}`);
    this.logger.log(`Количество файлов: ${files?.length || 0}`);

    try {
      // Подготавливаем данные для создания лида
      const fields: any = {
        TITLE: leadData.title,
        ASSIGNED_BY_ID: 2, // ID ответственного (можно сделать настраиваемым)
        NAME: leadData.name,
        OPENED: 'Y', // Доступен для всех
        STATUS_ID: 'NEW', // Статус "Новый"
      };

      // Добавляем опциональные поля
      if (leadData.lastName) fields.LAST_NAME = leadData.lastName;
      if (leadData.secondName) fields.SECOND_NAME = leadData.secondName;
      if (leadData.companyTitle) fields.COMPANY_TITLE = leadData.companyTitle;
      if (leadData.addressCity) fields.ADDRESS_CITY = leadData.addressCity;
      if (leadData.comments) fields.COMMENTS = leadData.comments;

      // Добавляем email
      if (leadData.email) {
        fields.EMAIL = [
          {
            VALUE: leadData.email,
            VALUE_TYPE: 'WORK',
          },
        ];
      }

      // Добавляем телефон
      if (leadData.phone) {
        fields.PHONE = [
          {
            VALUE: leadData.phone,
            VALUE_TYPE: 'WORK',
          },
        ];
      }

      // Добавляем сайт
      if (leadData.web) {
        fields.WEB = [
          {
            VALUE: leadData.web,
            VALUE_TYPE: 'WORK',
          },
        ];
      }

      // Если есть файлы, читаем их и конвертируем в base64
      if (files && files.length > 0) {
        this.logger.log('Обработка файлов для прикрепления к лиду...');
        const fileDataArray = await this.prepareFiles(files);
        
        // Добавляем файлы в поле fileData (как в документации Bitrix24)
        fileDataArray.forEach((fileData, index) => {
          fields[`fileData[${index}]`] = [fileData.filename, fileData.content];
        });

        this.logger.log(`Подготовлено ${fileDataArray.length} файлов для отправки`);
      }

      // Формируем данные запроса
      const requestData = {
        fields,
        params: {
          REGISTER_SONET_EVENT: 'Y', // Регистрировать событие в ленте
        },
      };

      this.logger.log('Отправка запроса в Bitrix24...');
      this.logger.debug(`Request data: ${JSON.stringify(requestData, null, 2)}`);

      // Отправляем запрос на создание лида
      const response = await axios.post(
        `${this.bitrixWebhookUrl}/crm.lead.add.json`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 секунд таймаут
        }
      );

      this.logger.log('=== Ответ от Bitrix24 получен ===');
      this.logger.debug(`Response: ${JSON.stringify(response.data, null, 2)}`);

      if (response.data && response.data.result) {
        const leadId = response.data.result;
        this.logger.log(`✅ Лид успешно создан в Bitrix24! ID: ${leadId}`);
        return leadId;
      } else {
        throw new Error('Bitrix24 вернул неожиданный формат ответа');
      }
    } catch (error) {
      this.logger.error('=== ОШИБКА при создании лида в Bitrix24 ===');
      this.logger.error(`Ошибка: ${error.message}`);
      
      if (axios.isAxiosError(error)) {
        this.logger.error(`Status: ${error.response?.status}`);
        this.logger.error(`Response data: ${JSON.stringify(error.response?.data, null, 2)}`);
      }
      
      this.logger.error(`Stack trace:`, error.stack);
      throw error;
    }
  }

  /**
   * Читает файлы и конвертирует их в base64
   * @param filePaths - Массив имен файлов
   * @returns Массив объектов с данными файлов
   */
  private async prepareFiles(filePaths: string[]): Promise<BitrixFileData[]> {
    const uploadsDir = './uploads/submissions';
    const fileDataArray: BitrixFileData[] = [];

    for (const fileName of filePaths) {
      try {
        const filePath = join(uploadsDir, fileName);
        this.logger.log(`Чтение файла: ${filePath}`);
        
        const fileBuffer = await readFile(filePath);
        const base64Content = fileBuffer.toString('base64');
        
        fileDataArray.push({
          filename: fileName,
          content: base64Content,
        });

        this.logger.log(`✓ Файл "${fileName}" успешно подготовлен (размер: ${fileBuffer.length} байт)`);
      } catch (error) {
        this.logger.error(`✗ Ошибка при чтении файла "${fileName}": ${error.message}`);
        // Продолжаем обработку других файлов, но логируем ошибку
      }
    }

    return fileDataArray;
  }

  /**
   * Получает информацию о лиде по ID
   * @param leadId - ID лида
   * @returns Информация о лиде
   */
  async getLead(leadId: number): Promise<any> {
    try {
      this.logger.log(`Получение информации о лиде ID: ${leadId}`);
      
      const response = await axios.post(
        `${this.bitrixWebhookUrl}/crm.lead.get.json`,
        {
          id: leadId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.result;
    } catch (error) {
      this.logger.error(`Ошибка при получении лида ID ${leadId}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Тестирует подключение к Bitrix24
   * @returns true если подключение работает
   */
  async testConnection(): Promise<boolean> {
    try {
      this.logger.log('Тестирование подключения к Bitrix24...');
      
      const response = await axios.get(`${this.bitrixWebhookUrl}/profile.json`, {
        timeout: 10000,
      });

      if (response.data && response.data.result) {
        this.logger.log('✅ Подключение к Bitrix24 успешно!');
        this.logger.log(`Пользователь: ${response.data.result.NAME} ${response.data.result.LAST_NAME}`);
        return true;
      }
      
      return false;
    } catch (error) {
      this.logger.error('❌ Ошибка подключения к Bitrix24');
      this.logger.error(`Ошибка: ${error.message}`);
      return false;
    }
  }
}

