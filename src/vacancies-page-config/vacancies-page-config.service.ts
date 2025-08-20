import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { UpdateVacanciesPageConfigDto } from "./dto";

@Injectable()
export class VacanciesPageConfigService {
  constructor(private prisma: PrismaService) {}

  async getConfig() {
    let config = await this.prisma.vacanciesPageConfig.findFirst();
    if (!config) {
      config = await this.prisma.vacanciesPageConfig.create({
        data: {
          firstScreen: {
            bg_image: "",
            title: "Работа в СибКомплект",
            subtitle: "Присоединяйся к команде профессионалов",
            stats: [
              {
                value: "200+",
                description: "часов ежегодного обучения сотрудников",
                showOnMobile: false,
              },
              {
                value: "81% eNPS",
                description: "Индекс удовлетворенности сотрудников",
                showOnMobile: true,
              },
              {
                value: "85%",
                description: "сотрудников работают в компании более 2 лет",
                showOnMobile: true,
              },
            ],
          },
          secondScreen: {
            title: "Открытые вакансии",
            subtitle: "Мы ищем талантливых специалистов",
          },
          thirdScreen: {
            title: "Наши ценности",
            subtitle: "Что для нас важно",
            values: [
              {
                title: "Профессионализм",
                subtitle: "Растем каждый день",
                icon_path: "",
              },
            ],
          },
          fourthScreen: {
            title: "Преимущества",
            subtitle: "Почему выбирают нас",
            subtitle_icon: "",
            advantages: [{ icon: "", text: "ДМС и соцпакет" }],
          },
          fifthScreen: {
            title: "Отзывы сотрудников",
            subtitle: "Что говорят о работе у нас",
            reviews: [
              {
                name: "Иван",
                position: "Инженер",
                image: "",
                text: "Отличная команда",
                shortText: "Отлично",
              },
            ],
          },
          sixthScreen: {
            title: "Вопросы и ответы",
            subtitle: "Часто задаваемые вопросы",
            answers: [
              {
                title: "Как подать заявку?",
                content: "Отправьте резюме через форму.",
                list: [],
              },
            ],
          },
        },
      });
    }
    return config;
  }

  async updateConfig(dto: UpdateVacanciesPageConfigDto) {
    let config = await this.prisma.vacanciesPageConfig.findFirst();
    if (!config) {
      config = await this.prisma.vacanciesPageConfig.create({
        data: {} as any,
      });
    }
    const updated = await this.prisma.vacanciesPageConfig.update({
      where: { id: config.id },
      data: dto as any,
    });
    return updated;
  }
}
