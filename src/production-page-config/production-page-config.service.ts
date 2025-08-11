import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { UpdateProductionPageConfigDto } from "./dto";

@Injectable()
export class ProductionPageConfigService {
  constructor(private prisma: PrismaService) {}

  async getConfig() {
    let config = await this.prisma.productionPageConfig.findFirst();
    if (!config) {
      config = await this.prisma.productionPageConfig.create({
        data: {
          firstScreen: {
            bg_image: "",
            title: "Заголовок",
            subtitle: "Подзаголовок",
            button_text: "Оставить заявку",
            button_href: "/contacts",
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
          secondScreen: {
            title: "Этапы производства",
            subtitle: "Как мы работаем",
            stages: [
              {
                id: 1,
                number: "01",
                title: "Разработка и оформление КД",
                description:
                  "Разработка конструкторской документации в соответствии с ТЗ заказчика, нормами ГОСТ и ЕСКД.",
                image: "",
              },
              {
                id: 2,
                number: "02",
                title: "Раскрой и гибка металла",
                description:
                  "Лазерная резка и гибка металлических заготовок на листогибочном прессе.",
                image: "",
              },
            ],
          },
          thirdScreen: {
            title: "Оборудование",
            subtitle: "Мы используем современное оборудование",
            equipment: [
              { id: 1, title: "", subtitle: "", image: "", order: 1 },
              { id: 2, title: "", subtitle: "", image: "", order: 2 },
            ],
          },
          fourthScreen: {
            items: [
              {
                title: "Бухгалтерская документация",
                content:
                  "Каждый из нас понимает очевидную вещь: выбранный нами инновационный путь не даёт нам иного выбора, кроме определения распределения внутренних резервов и ресурсов.",
                documents: [
                  { title: "Отчет 1", link: "" },
                  { title: "Отчет 2", link: "" },
                ],
              },
            ],
          },
        },
      });
    }
    return config;
  }

  async updateConfig(dto: UpdateProductionPageConfigDto) {
    let config = await this.prisma.productionPageConfig.findFirst();
    if (!config) {
      config = await this.prisma.productionPageConfig.create({
        data: {} as any,
      });
    }

    const updated = await this.prisma.productionPageConfig.update({
      where: { id: config.id },
      data: dto as any,
    });
    return updated;
  }
}



