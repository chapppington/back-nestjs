import { questionsConfig as ktpQuestionsConfig } from './questionnaire-ktp-config';
import { krunQuestionsConfig } from './questionnaire-krun-config';
import { ksoQuestionsConfig } from './questionnaire-kso-config';

interface QuestionOption {
  value: string | number;
  label: string;
  type?: string;
  textLabel?: string;
  nestedOptions?: QuestionOption[];
}

export interface Question {
  id: number;
  title: string;
  options?: QuestionOption[];
  type?: string;
}

export type QuestionnaireType = 'ktp' | 'krun' | 'kso';

/**
 * Получает конфигурацию вопросов для указанного типа опросника
 * @param type - тип опросника (ktp, krun, kso)
 * @returns массив вопросов для указанного типа опросника
 */
export function getQuestionnaireConfig(type: QuestionnaireType): Question[] {
  const configMap: Record<QuestionnaireType, Question[]> = {
    ktp: ktpQuestionsConfig,
    krun: krunQuestionsConfig,
    kso: ksoQuestionsConfig,
  };

  return configMap[type] || ktpQuestionsConfig; // по умолчанию возвращаем КТП
}

/**
 * Получает заголовок вопроса по ID для указанного типа опросника
 */
export function getQuestionTitle(questionId: string, type: QuestionnaireType = 'ktp'): string {
  const config = getQuestionnaireConfig(type);
  const question = config.find((q) => q.id === parseInt(questionId));
  
  if (!question) {
    return `Вопрос ${questionId}`;
  }
  
  return question.title;
}

/**
 * Получает человекочитаемую метку для ответа
 */
export function getAnswerLabel(questionId: string, value: unknown, type: QuestionnaireType = 'ktp'): string {
  const config = getQuestionnaireConfig(type);
  const question = config.find((q) => q.id === parseInt(questionId));
  
  if (!question) return String(value);

  // Обработка текстовых полей
  if (question.type === 'text' || question.type === 'feeder_sections') {
    return String(value);
  }

  // Обработка множественного выбора
  if (question.type === 'multiple_choice' && Array.isArray(value)) {
    const labels = value
      .map((v) => {
        const option = question.options?.find((opt) => opt.value === v);
        return option ? option.label : v;
      })
      .filter(Boolean);
    return labels.length > 0 ? labels.join(', ') : String(value);
  }

  // Обработка вложенных опций
  if (question.options) {
    for (const option of question.options) {
      if (option.value === value) {
        return option.label;
      }
      // Проверка вложенных опций
      if (option.nestedOptions) {
        const nestedOption = option.nestedOptions.find((nested) => nested.value === value);
        if (nestedOption) {
          return `${option.label} - ${nestedOption.label}`;
        }
      }
    }
  }

  return String(value);
}

/**
 * Определяет тип опросника по мета-данным или URL
 */
export function detectQuestionnaireType(meta?: any): QuestionnaireType {
  if (meta?.questionnaireType) {
    return meta.questionnaireType as QuestionnaireType;
  }
  
  // Можно добавить дополнительную логику определения типа
  // Например, по количеству вопросов или структуре данных
  
  return 'ktp'; // по умолчанию
}

