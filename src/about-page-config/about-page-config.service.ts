import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { UpdateAboutPageConfigDto } from "./dto";

@Injectable()
export class AboutPageConfigService {
  constructor(private prisma: PrismaService) {}

  async getConfig() {
    let config = await this.prisma.aboutPageConfig.findFirst();
    if (!config) {
      config = await this.prisma.aboutPageConfig.create({
        data: {
          firstScreen: {
            bg_image: "",
            title: "О компании\nи нашей команде",
            subtitle: "Краткое описание компании",
            button_text: "Связаться с нами",
            button_href: "/contacts",
            stats: [
              {
                value: "20+",
                description: "лет на рынке",
                showOnMobile: true,
              },
              {
                value: "80+",
                description: "сотрудников",
                showOnMobile: true,
              },
              {
                value: "7776",
                description: "м² производственной площади",
                showOnMobile: false,
              },
            ],
          },
          historyScreen: {
            brackets_text: "История",
            title: "История компании",
            description: "С 2006 года мы прошли путь от стартапа до предприятия полного цикла: собрали сильную команду, развернули масштабное производство и внедрили передовые технологии.",
            history_events: [
              {
                id: 1,
                number: "2006",
                title: "Старт в направлении снабжения компаний хозтоварами",
                employees: 2,
                employeesHasPlus: false,
                areaM2: 0,
                order: 1,
              },
              {
                id: 2,
                number: "2007–2009",
                title: "Переход в энергетическую отрасль, первый государственный заказ",
                employees: 3,
                employeesHasPlus: false,
                areaM2: 300,
                order: 2,
              },
              {
                id: 3,
                number: "2010–2012",
                title: "Приобретение своего оборудования, первый менеджер по продажам",
                employees: 12,
                employeesHasPlus: false,
                areaM2: 360,
                order: 3,
              },
              {
                id: 4,
                number: "2013–2019",
                title: "Переход в большую энергетику, разработка фирменного стиля",
                employees: 27,
                employeesHasPlus: false,
                areaM2: 870,
                order: 4,
              },
              {
                id: 5,
                number: "2020–2023",
                title: "Большое расширение производства, открытие собственного цеха",
                employees: 80,
                employeesHasPlus: true,
                areaM2: 7776,
                order: 5,
              },
            ],
          },
          teamScreen: {
            brackets_text: "FAQ",
            title: "Сложно сказать, почему постоянный количественный рост связывает нас с нашим прошлым",
            description: "В своём стремлении улучшить пользовательский опыт мы упускаем, что предприниматели в сети интернет лишь добавляют фракционных разногласий и представлены в исключительно положительном свете.",
            cta_text: "Хотите к нам в команду?",
            cta_button_text: "Смотреть вакансии",
            cta_button_href: "/vacancies",
            team_members: [
              {
                id: 1,
                name: "Иван Федоров",
                position: "Должность",
                email: "ivanov@example.com",
                image: "/man.png",
                order: 1,
              },
              {
                id: 2,
                name: "Иван Федоров",
                position: "Должность",
                email: "petrov@example.com",
                image: "/man.png",
                order: 2,
              },
              {
                id: 3,
                name: "Иван Федоров",
                position: "Должность",
                email: "sidorov@example.com",
                image: "/man.png",
                order: 3,
              },
            ],
          },
        },
      });
    }

    return config;
  }

  async updateConfig(dto: UpdateAboutPageConfigDto) {
    let config = await this.prisma.aboutPageConfig.findFirst();
    if (!config) {
      config = await this.prisma.aboutPageConfig.create({
        data: {} as any,
      });
    }

    const updated = await this.prisma.aboutPageConfig.update({
      where: { id: config.id },
      data: dto as any,
    });
    return updated;
  }
}
