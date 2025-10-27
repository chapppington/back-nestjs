interface QuestionOption {
  value: string | number;
  label: string;
  type?: string;
  textLabel?: string;
  nestedOptions?: QuestionOption[];
}

interface Question {
  id: number;
  title: string;
  options?: QuestionOption[];
  type?: string;
}

export const krunQuestionsConfig: Question[] = [
  {
    id: 1,
    title: "01 · Номинальное напряжение, кВ",
    options: [
      { value: "6", label: "6 кВ" },
      { value: "10", label: "10 кВ" },
    ],
  },
  {
    id: 2,
    title: "02 · Номер схемы главных цепей (Приложение №1)",
    type: "text",
  },
  {
    id: 3,
    title: "03 · Номинальный ток, А",
    options: [
      { value: "630", label: "630 А" },
      { value: "1000", label: "1000 А" },
      { value: "1600", label: "1600 А" },
      { value: "2500", label: "2500 А" },
    ],
  },
  {
    id: 4,
    title: "04 · Исполнение ввода",
    options: [
      { value: "air", label: "Воздух" },
      { value: "cable", label: "Кабель" },
    ],
  },
  {
    id: 5,
    title: "05 · Исполнение вывода",
    options: [
      { value: "air", label: "Воздух" },
      { value: "cable", label: "Кабель" },
    ],
  },
  {
    id: 6,
    title: "06 · Оперативное питание вторичных цепей",
    options: [
      { value: "220_ac", label: "220 AC" },
      { value: "220_dc", label: "220 DC" },
    ],
  },
  {
    id: 7,
    title: "07 · Выключатель, тип",
    options: [
      { value: "vv_tel_tavrida", label: "ВВ/Tel (Таврида)" },
      { value: "nv2_12_chint", label: "NV2-12 (Chint)" },
      { value: "vf12_eltehnika", label: "VF12 (Элтехника)" },
      { value: "vv_keps", label: "ВВ (КЭПС)" },
      { value: "vt_tengen", label: "VT (Tengen)" },
      { value: "other", label: "Другой" },
    ],
  },
  {
    id: 8,
    title: "08 · Шинный разъединитель",
    options: [
      { value: "rvz", label: "РВЗ" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 9,
    title: "09 · Линейный разъединитель",
    options: [
      { value: "rvz", label: "РВЗ" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 10,
    title: "10 · Трансформатор тока (класс точности, коэффициент трансформации)",
    type: "text",
  },
  {
    id: 11,
    title: "11 · Трансформатор напряжения",
    options: [
      { value: "3x_znolp_6_10", label: "3xЗНОЛП-6(10)" },
      { value: "other", label: "Другой" },
    ],
  },
  {
    id: 12,
    title: "12 · Трансформатор собственных нужд",
    options: [
      { value: "olsp_1_25_6_10", label: "ОЛСП-1,25-6(10)" },
      { value: "other", label: "Другой" },
    ],
  },
  {
    id: 13,
    title: "13 · Трансформатор тока нулевой последовательности",
    options: [
      { value: "tzlk", label: "ТЗЛК" },
      { value: "tzlkr", label: "ТЗЛКР" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 14,
    title: "14 · Ограничитель перенапряжения",
    options: [
      { value: "one", label: "Один комплект" },
      { value: "two", label: "Два комплекта" },
    ],
  },
  {
    id: 15,
    title: "15 · Количество и сечение кабеля (Ввод)",
    type: "text",
  },
  {
    id: 16,
    title: "16 · Количество и сечение кабеля (Вывод)",
    type: "text",
  },
  {
    id: 17,
    title: "17 · Измерительные приборы",
    type: "multiple_choice",
    options: [
      { value: "ammeter", label: "Амперметр" },
      { value: "voltmeter", label: "Вольтметр" },
      { value: "counter", label: "Счетчик" },
      { value: "converter", label: "Преобразователь" },
    ],
  },
  {
    id: 18,
    title: "18 · Тип счетчика",
    type: "text",
  },
  {
    id: 19,
    title: "19 · Микропроцессорная защита",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 20,
    title: "20 · Реле защиты",
    type: "multiple_choice",
    options: [
      { value: "to", label: "ТО (Токовая отсечка)" },
      { value: "mtz", label: "МТЗ (Максимальная токовая защита)" },
      { value: "ozz", label: "ОЗЗ (Обратная защита)" },
      { value: "zmn", label: "ЗМН (Защита минимального напряжения)" },
    ],
  },
  {
    id: 21,
    title: "21 · Дуговая защита",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 22,
    title: "22 · Индикация напряжения",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 23,
    title: "23 · Телемеханика",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 24,
    title: "24 · Вспомогательные металлоконструкции",
    type: "multiple_choice",
    options: [
      { value: "platform", label: "Площадка обслуживания" },
      { value: "ladder", label: "Лестница" },
      { value: "slides", label: "Салазки" },
      { value: "none", label: "Не требуются" },
    ],
  },
  {
    id: 25,
    title: "25 · Цветовое решение",
    options: [
      {
        value: "standard",
        label: "Стандартное (двери – RAL 5005 синий, корпус – RAL 7035 серый)",
      },
      { value: "other", label: "Другое" },
    ],
  },
];

