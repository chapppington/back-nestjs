import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { CreateHomePageConfigDto, UpdateHomePageConfigDto } from "./dto";

@Injectable()
export class HomePageConfigService {
  constructor(private prisma: PrismaService) {}

  async getConfig() {
    // Предполагается, что конфиг всегда один (первый найденный)
    let config = await this.prisma.homePageConfig.findFirst();
    if (!config) {
      // Если нет — создаём дефолтный
      config = await this.prisma.homePageConfig.create({
        data: {
          firstScreen: {
            title: "Заголовок главной страницы",
            subtitle: "Подзаголовок главной страницы",
            main_button_text: "Кнопка",
            stats: [
              {
                value: "20+",
                description: "лет на рынке электрооборудования",
                showOnMobile: true,
              },
              {
                value: "600+",
                description: "реализованных проектов",
                showOnMobile: false,
              },
              {
                value: "7 лет",
                description: "максимальный срок гарантии",
                showOnMobile: true,
              },
            ],
          },
          rotatingText: "Вращающийся текст",
          missionScreen: {
            mission_title: "Заголовок миссии",
            mission_text: "Текст миссии",
            button_text: "Больше о компании",
          },
          productsScreen: {
            button_text: "Кнопка продуктов",
            products: [
              {
                title: "Трансформаторные подстанции",
                image: "/ktp.webp",
                description:
                  "Трансформаторные подстанции 10/0,4 кВ используют в конце пути электроэнергии для приема, преобразования и распределения.",
                slug: "komplektnye-transformatornye-podstancii",
              },
              {
                title:
                  "Распределительные устройства среднего напряжения 6(10) кВ",
                image: "/610kv.webp",
                description:
                  "Распределительные устройства среднего напряжения 6(10) кВ предназначены для приема, распределения и защиты электрической энергии в сетях промышленного и гражданского назначения. Обеспечивают надежную работу оборудования и безопасность эксплуатации.",
                slug: "raspredelitelnye-ustroystva-srednego-napryazheniya-6-10-kv",
              },
            ],
          },
          reviewsScreen: {
            title: "Заголовок отзывов",
            subtitle: "Подзаголовок отзывов",
            reviews: [
              {
                image: "/sberbank.png",
                title: "Красильников Р.В.",
                jobTitle: "Директор филиала",
                content_path: "/review1.png",
              },
              {
                image: "/sberbank.png",
                title: "Рыбников А.А.",
                jobTitle: "Генеральный директор ООО «БПЗ»",
                content_path: "/review2.png",
              },
            ],
          },
        },
      });
    }
    return config;
  }

  async updateConfig(updateDto: UpdateHomePageConfigDto) {
    let config = await this.prisma.homePageConfig.findFirst();
    if (!config) {
      // Если конфига нет, создаем с дефолтными значениями и обновляем их
      config = await this.prisma.homePageConfig.create({
        data: {
          firstScreen: {
            title: "Заголовок главной страницы",
            subtitle: "Подзаголовок главной страницы",
            main_button_text: "Кнопка",
            stats: [
              {
                value: "20+",
                description: "лет на рынке электрооборудования",
                showOnMobile: true,
              },
              {
                value: "600+",
                description: "реализованных проектов",
                showOnMobile: false,
              },
              {
                value: "7 лет",
                description: "максимальный срок гарантии",
                showOnMobile: true,
              },
            ],
          },
          rotatingText: "Вращающийся текст",
          missionScreen: {
            mission_title: "Заголовок миссии",
            mission_text: "Текст миссии",
            button_text: "Больше о компании",
          },
          productsScreen: {
            button_text: "Кнопка продуктов",
            products: [
              {
                title: "Трансформаторные подстанции",
                image: "/ktp.webp",
                description:
                  "Трансформаторные подстанции 10/0,4 кВ используют в конце пути электроэнергии для приема, преобразования и распределения.",
                slug: "komplektnye-transformatornye-podstancii",
              },
              {
                title:
                  "Распределительные устройства среднего напряжения 6(10) кВ",
                image: "/610kv.webp",
                description:
                  "Распределительные устройства среднего напряжения 6(10) кВ предназначены для приема, распределения и защиты электрической энергии в сетях промышленного и гражданского назначения. Обеспечивают надежную работу оборудования и безопасность эксплуатации.",
                slug: "raspredelitelnye-ustroystva-srednego-napryazheniya-6-10-kv",
              },
            ],
          },
          reviewsScreen: {
            title: "Заголовок отзывов",
            subtitle: "Подзаголовок отзывов",
            reviews: [
              {
                image: "/sberbank.png",
                title: "Красильников Р.В.",
                jobTitle: "Директор филиала",
                content_path: "/review1.png",
              },
              {
                image: "/sberbank.png",
                title: "Рыбников А.А.",
                jobTitle: "Генеральный директор ООО «БПЗ»",
                content_path: "/review2.png",
              },
            ],
          },
        },
      });
    }

    // Обновляем существующий конфиг
    config = await this.prisma.homePageConfig.update({
      where: { id: config.id },
      data: updateDto,
    });

    return config;
  }
}
