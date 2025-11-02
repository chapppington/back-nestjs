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

export const ksoQuestionsConfig: Question[] = [
  {
    id: 1,
    title: "01 · Модификация камеры",
    type: "text",
  },
  {
    id: 2,
    title: "02 · Номинальное напряжение сборных шин, кВ",
    options: [
      { value: "6", label: "6 кВ" },
      { value: "10", label: "10 кВ" },
    ],
  },
  {
    id: 3,
    title: "03 · Номинальный ток сборных шин, А",
    type: "text",
  },
  {
    id: 4,
    title: "04 · Ток термической стойкости сборных шин, кА",
    type: "text",
  },
  {
    id: 5,
    title: "05 · Род и значение оперативного тока",
    type: "text",
  },
  {
    id: 6,
    title: "06 · Схема главных цепей",
    type: "text",
  },
  {
    id: 7,
    title: "07 · Порядковый номер камеры РУ",
    type: "text",
  },
  {
    id: 8,
    title: "08 · Назначение камеры",
    options: [
      { value: "incoming", label: "Ввод" },
      { value: "sectionalizing", label: "Секционирование" },
      { value: "outgoing", label: "Отходящая линия" },
      { value: "vt", label: "ТН" },
      { value: "tsn", label: "ТСН" },
      { value: "other", label: "Другое" },
    ],
  },
  {
    id: 9,
    title: "09 · Силовой выключатель",
    type: "text",
  },
  {
    id: 10,
    title: "10 · Тип предохранителя, ток плавкой вставки",
    type: "text",
  },
  {
    id: 11,
    title: "11 · Шинный разъединитель",
    options: [
      { value: "yes", label: "Есть" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 12,
    title: "12 · Линейный разъединитель",
    options: [
      { value: "yes", label: "Есть" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 13,
    title: "13 · Трансформатор собственных нужд (ТСН): тип, мощность",
    type: "text",
  },
  {
    id: 14,
    title: "14 · Трансформатор напряжения (ТН), тип",
    options: [
      { value: "znolp_6_10", label: "ЗНОЛП-6(10)" },
      { value: "other", label: "Другой" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 15,
    title: "15 · Трансформатор тока (ТТ): тип, коэффициент трансформации, класс точности",
    type: "text",
  },
  {
    id: 16,
    title: "16 · Трансформаторы тока нулевой последовательности (ЗТТ)",
    options: [
      { value: "yes", label: "Есть" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 17,
    title: "17 · Ограничители перенапряжения (ОПН), тип",
    type: "text",
  },
  {
    id: 18,
    title: "18 · Вид устройства защиты",
    options: [
      { value: "mechanical", label: "Механика" },
      { value: "microprocessor", label: "Микропроцессорная" },
    ],
  },
  {
    id: 19,
    title: "19 · Требуемые защиты",
    type: "multiple_choice",
    options: [
      { value: "mtz", label: "Максимальная токовая защита (МТЗ)" },
      { value: "to", label: "Токовая отсечка (ТО)" },
      { value: "overload", label: "Перегрузка" },
      { value: "zzn", label: "От однофазных замыканий на землю (ЗЗН)" },
      { value: "earth_wire_break", label: "Защита от обрыва земляной жилы" },
      { value: "voltage_control", label: "Контроль напряжения" },
      { value: "apv", label: "Автоматическое повторное включение (АПВ)" },
      { value: "achr", label: "Автоматическая частотная разгрузка (АЧР)" },
      { value: "arc_protection", label: "Дуговая защита" },
    ],
  },
  {
    id: 20,
    title: "20 · Оперативное питание (~220В АС/=220В DC)",
    options: [
      { value: "220_ac", label: "~220В AC" },
      { value: "220_dc", label: "=220В DC" },
    ],
  },
  {
    id: 21,
    title: "21 · Мнемосхема",
    options: [
      { value: "yes", label: "Есть" },
      { value: "no", label: "Нет" },
      { value: "digital", label: "Цифровая" },
    ],
  },
  {
    id: 22,
    title: "22 · Блокировки",
    options: [
      { value: "electromagnetic", label: "Электромагнитные" },
      { value: "mechanical", label: "Механические" },
      { value: "not_required", label: "Не требуются" },
    ],
  },
  {
    id: 23,
    title: "23 · Указатели напряжения",
    options: [
      { value: "yes", label: "Есть" },
      { value: "no", label: "Нет" },
      { value: "with_contact", label: "С контактом наличия напряжения" },
    ],
  },
  {
    id: 24,
    title: "24 · Наличие коммерческого учёта, тип счётчика",
    options: [
      { value: "no", label: "Нет" },
      { value: "yes", label: "Есть" },
    ],
  },
  {
    id: 25,
    title: "25 · Приборы контроля тока и напряжения, тип и количество",
    type: "text",
  },
  {
    id: 26,
    title: "26 · Обогрев релейного отсека",
    options: [
      { value: "manual", label: "Ручной" },
      { value: "automatic", label: "Автоматический" },
      { value: "no", label: "Не требуется" },
    ],
  },
];

