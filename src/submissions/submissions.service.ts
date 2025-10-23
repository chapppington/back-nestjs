import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";
import { EmailService } from "@/email/email.service";
import { BitrixService } from "@/bitrix/bitrix.service";
import { questionsConfig } from "@/email/questionnaire-config";

@Injectable()
export class SubmissionsService {
  private readonly logger = new Logger(SubmissionsService.name);

  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private bitrixService: BitrixService
  ) {}

  private addFileUrls(submission: any) {
    if (submission.files && submission.files.length > 0) {
      submission.fileUrls = submission.files.map(
        (fileName: string) => `/uploads/submissions/${fileName}`
      );
    }
    return submission;
  }

  async create(createSubmissionDto: CreateSubmissionDto) {
    // Преобразуем consent из строки в булево значение
    const data = {
      ...createSubmissionDto,
      consent:
        (createSubmissionDto.consent as any) === "true" ||
        createSubmissionDto.consent === true,
    };

    const submission = await this.prisma.formSubmission
      .create({
        data,
      })
      .then(this.addFileUrls.bind(this));

    // Отправляем уведомление по email о новой заявке
    try {
      await this.emailService.sendSubmissionNotification(submission);
      this.logger.log(`Email уведомление отправлено для заявки ID: ${submission.id}`);
    } catch (error) {
      this.logger.error(
        `Не удалось отправить email уведомление для заявки ID: ${submission.id}`,
        error.stack
      );
      // Не прерываем создание заявки, если email не отправился
    }

    // Создаем лид в Bitrix24
    try {
      await this.createBitrixLead(submission);
      this.logger.log(`Лид в Bitrix24 создан для заявки ID: ${submission.id}`);
    } catch (error) {
      this.logger.error(
        `Не удалось создать лид в Bitrix24 для заявки ID: ${submission.id}`,
        error.stack
      );
      // Не прерываем создание заявки, если Bitrix не отправился
    }

    return submission;
  }

  async findAll() {
    const submissions = await this.prisma.formSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return submissions.map(this.addFileUrls.bind(this));
  }

  findOne(id: string) {
    return this.prisma.formSubmission
      .findUnique({
        where: { id },
      })
      .then(this.addFileUrls.bind(this));
  }

  update(id: string, updateSubmissionDto: UpdateSubmissionDto) {
    // Преобразуем consent из строки в булево значение, если он присутствует
    const data = { ...updateSubmissionDto };
    if (data.consent !== undefined) {
      data.consent = (data.consent as any) === "true" || data.consent === true;
    }

    return this.prisma.formSubmission
      .update({
        where: { id },
        data,
      })
      .then(this.addFileUrls.bind(this));
  }

  remove(id: string) {
    return this.prisma.formSubmission.delete({
      where: { id },
    });
  }

  async findByFormType(formType: string) {
    const submissions = await this.prisma.formSubmission.findMany({
      where: { formType: formType as any },
      orderBy: {
        createdAt: "desc",
      },
    });
    return submissions.map(this.addFileUrls.bind(this));
  }

  /**
   * Создает лид в Bitrix24 на основе данных заявки
   */
  private async createBitrixLead(submission: any): Promise<number> {
    const { formType, name, email, phone, comments, files, meta } = submission;

    // Определяем заголовок лида в зависимости от типа формы
    const titleMap: Record<string, string> = {
      VACANCY: 'Отклик на вакансию с сайта',
      QUESTIONNAIRE: 'Опросный лист с сайта',
      REQUEST: 'Заявка с сайта',
      DEFAULT: 'Обращение с сайта',
    };

    const title = titleMap[formType] || 'Заявка с сайта';

    // Формируем комментарий, добавляя информацию из meta если есть
    let leadComments = comments || '';

    if (meta && formType === 'QUESTIONNAIRE' && meta.questionnaireData) {
      leadComments += '\n\n=== Данные опросного листа ===\n';
      leadComments += this.formatQuestionnaireDataForBitrix(meta.questionnaireData);
    } else if (meta) {
      leadComments += '\n\n=== Дополнительная информация ===\n';
      leadComments += JSON.stringify(meta, null, 2);
    }

    // Добавляем ссылки на файлы в комментарии
    if (files && files.length > 0) {
      leadComments += '\n\n=== Прикрепленные файлы ===\n';
      files.forEach((file: string) => {
        leadComments += `https://sibkomplekt.ru/uploads/submissions/${file}\n`;
      });
    }

    // Разбиваем имя на части (если есть фамилия и отчество)
    const nameParts = name.split(' ');
    const firstName = nameParts[0] || name;
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
    const secondName = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';

    // Создаем лид в Bitrix24
    const leadId = await this.bitrixService.createLead({
      title,
      name: firstName,
      lastName,
      secondName,
      email,
      phone,
      comments: leadComments,
      web: 'https://sibkomplekt.ru',
    });

    return leadId;
  }

  /**
   * Получает заголовок вопроса по ID
   */
  private getQuestionTitle(questionId: string): string {
    const question = questionsConfig.find((q) => q.id === parseInt(questionId));
    if (!question) {
      return `Вопрос ${questionId}`;
    }
    // Удаляем номер из заголовка (например, "01 · " -> "")
    return question.title.replace(/^\d+\s*·\s*/, '');
  }

  /**
   * Получает человекочитаемую метку для ответа
   */
  private getAnswerLabel(questionId: string, value: unknown): string {
    const question = questionsConfig.find((q) => q.id === parseInt(questionId));
    
    if (!question) return String(value);

    // Если значение - массив (множественный выбор)
    if (Array.isArray(value)) {
      if (value.length === 0) return '—';
      return value
        .map((v) => {
          const option = question.options?.find((opt) => opt.value === v);
          return option?.label || v;
        })
        .join(', ');
    }

    // Если значение - объект (например, для feeder_sections)
    if (typeof value === 'object' && value !== null) {
      if (question.type === 'feeder_sections') {
        const entries = Object.entries(value as Record<string, any>);
        return entries
          .map(([key, val]) => `${key}: ${val}`)
          .join('; ');
      }
      return JSON.stringify(value, null, 2);
    }

    // Если пустое значение
    if (value === '' || value === null || value === undefined) {
      return '—';
    }

    // Ищем соответствующий option
    const option = question.options?.find((opt) => opt.value === value);
    return option?.label || String(value);
  }

  /**
   * Форматирует данные опросника для комментария в Bitrix
   */
  private formatQuestionnaireDataForBitrix(questionnaireData: any): string {
    if (!questionnaireData || typeof questionnaireData !== 'object') {
      return '';
    }

    let result = '';
    
    // Фильтруем только заполненные ответы и сортируем по ID вопроса
    const entries = Object.entries(questionnaireData)
      .filter(
        ([_, value]) =>
          value !== '' &&
          value !== null &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0)
      )
      .sort(([a], [b]) => parseInt(a) - parseInt(b));

    if (entries.length === 0) {
      return 'Нет заполненных ответов';
    }

    entries.forEach(([questionId, value]) => {
      const questionTitle = this.getQuestionTitle(questionId);
      const answerLabel = this.getAnswerLabel(questionId, value);
      const paddedId = questionId.padStart(2, '0');

      result += `${paddedId}. ${questionTitle}: ${answerLabel}\n`;
    });

    return result;
  }
}
