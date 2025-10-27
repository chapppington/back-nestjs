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

export const questionsConfig: Question[] = [
  {
    id: 1,
    title: "01 · Тип КТП",
    options: [
      { value: "mast", label: "Мачтовая (КТПМ)" },
      { value: "kiosk", label: "Киосковая (КТПК)" },
      { value: "block", label: "Блочная (КТПБ)" },
      { value: "indoor", label: "Внутрицеховая" },
      { value: "attached", label: "Пристроенная" },
      { value: "stationary", label: "Стационарная" },
      { value: "mobile", label: "Передвижная" },
    ],
  },
  {
    id: 2,
    title: "02 · Исполнение КТП:",
    options: [
      { value: "through", label: "Проходная" },
      { value: "dead_end", label: "Тупиковая" },
    ],
  },
  {
    id: 3,
    title: "03 · Исполнение вводов РУВН/РУНН:",
    options: [
      { value: "air_air", label: "Воздух-Воздух" },
      { value: "cable_air", label: "Кабель-Воздух" },
      { value: "cable_cable", label: "Кабель-Кабель" },
      { value: "air_cable", label: "Воздух-Кабель" },
    ],
  },
  {
    id: 4,
    title: "04 · Количество силовых трансформаторов",
    options: [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
    ],
  },
  {
    id: 5,
    title: "05 · Тип силового трансформатора:",
    options: [
      { value: "tmg", label: "ТМГ" },
      { value: "dry_air_barrier", label: "Сухой (воздушнобарьерный)" },
      { value: "dry_cast", label: "Сухой (литой)" },
    ],
  },
  {
    id: 6,
    title: "06 · Мощность силового трансформатора, кВА:",
    options: [
      { value: 25, label: "25" },
      { value: 40, label: "40" },
      { value: 63, label: "63" },
      { value: 100, label: "100" },
      { value: 160, label: "160" },
      { value: 250, label: "250" },
      { value: 400, label: "400" },
      { value: 630, label: "630" },
      { value: 1000, label: "1000" },
      { value: 1250, label: "1250" },
      { value: 1600, label: "1600" },
      { value: 2500, label: "2500" },
      { value: 3200, label: "3200" },
    ],
  },
  {
    id: 7,
    title: "07 · Схема и группа обмотки силового трансформатора:",
    options: [
      { value: "y_yn_0", label: "У/Ун-0" },
      { value: "d_yn_11", label: "Д/Ун-11" },
      { value: "y_zn_11", label: "У/Zн-11" },
    ],
  },
  {
    id: 8,
    title: "08 · Класс напряжения по стороне ВН силового трансформатора, кВ",
    options: [
      { value: 6, label: "6" },
      { value: 10, label: "10" },
      { value: 35, label: "35" },
    ],
  },
  {
    id: 9,
    title: "09 · Тип коммутационного аппарата РУВН:",
    options: [
      { value: "vna", label: "ВНА" },
      { value: "rvz", label: "РВЗ" },
      { value: "rlnd", label: "РЛНД" },
      { value: "monoblock", label: "Моноблок" },
      { value: "vv", label: "ВВ (вакуумный выключатель)" },
      { value: "none", label: "Нет" },
    ],
  },
  {
    id: 10,
    title: "10 · Секционирование РУВН:",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 11,
    title: "11 · Учет электроэнергии в РУВН:",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 12,
    title: "12 · Секционирование РУНН:",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 13,
    title: "13 · АВР по РУНН",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 14,
    title: "14 · Тип секционного аппарата РУНН",
    options: [
      { value: "PE", label: "Рубильник" },
      { value: "BA", label: "Автоматический выключатель" },
    ],
  },
  {
    id: 15,
    title: "15 · Исполнение секционного аппарата РУНН",
    options: [
      { value: "stationary", label: "Стационарный" },
      { value: "roll_out", label: "Выкатной" },
    ],
  },
  {
    id: 16,
    title: "16 · Производитель коммутационных аппаратов РУНН:",
    options: [
      { value: "rps", label: "РПС" },
      { value: "contactor", label: "Контактор" },
      { value: "tengen", label: "Tengen" },
      { value: "keaz", label: "КЭАЗ" },
      { value: "chint", label: "Chint" },
      { value: "akel", label: "Akel" },
      { value: "systeme_electric", label: "System Electric" },
      { value: "pvr_ars", label: "ПВР ARS" },
    ],
  },
  {
    id: 17,
    title: "17 · Токи и кол-во коммутационных аппаратов по секциям:",
    type: "feeder_sections",
  },
  {
    id: 18,
    title: "18 · Количество отходящих линий (на секцию)",
    type: "text",
  },
  {
    id: 19,
    title: "19 · Учет электроэнергии РУНН:",
    options: [
      { value: "no", label: "Нет" },
      {
        value: "yes",
        label: "Да",
        nestedOptions: [
          { value: "ap", label: "AP" },
          { value: "a", label: "A" },
        ],
      },
    ],
  },
  {
    id: 20,
    title: "20 · Класс точности трансформатора тока:",
    options: [
      { value: "0.5", label: "0.5" },
      { value: "0.2s", label: "0.2s" },
      { value: "0.2", label: "0.2" },
      { value: "0.5s", label: "0.5s" },
    ],
  },
  {
    id: 21,
    title: "21 · Уличное освещение:",
    options: [
      { value: "yes", label: "Да" },
      { value: "no", label: "Нет" },
    ],
  },
  {
    id: 22,
    title: "22 · Цвет КТП:",
    options: [
      {
        value: "typical",
        label: "Типовой (корпус - серый, крыша и двери - синий)",
      },
      { value: "other", label: "Другое" },
    ],
  },
  {
    id: 23,
    title: "23 · Дополнительные требования:",
    type: "multiple_choice",
    options: [
      { value: "fire_extinguishers", label: "Средства пожаротушения" },
      {
        value: "fire_security_system",
        label: "Система охраны-пожарной сигнализации (ОПС)",
      },
      {
        value: "platforms_ladders",
        label: "Площадки/лестницы обслуживания, салазки",
      },
      {
        value: "ventilation_heating_air_conditioning_system",
        label: "Система вентиляции/обогрева/кондиционирования",
      },
      {
        value: "emergency_working_repair_lighting",
        label: "Аварийное, рабочее, ремонтное освещение",
      },
      { value: "transport_packaging", label: "Транспортная упаковка" },
      { value: "extended_warranty", label: "Расширенная гарантия (до 7 лет)" },
      {
        value: "personal_protective_equipment",
        label: "Средства индивидуальной защиты (СИЗ)",
      },
      { value: "zip_kit", label: "Комплект ЗИП" },
      { value: "lightning_protection", label: "Молниезащита" },
      {
        value: "transformer_power_increase",
        label: "Увеличение мощности трансформатора в будущем",
      },
    ],
  },
];

