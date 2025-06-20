import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateSiteSeoSettingsDto } from "./dto/create-site-seo-settings.dto";
import { UpdateSiteSeoSettingsDto } from "./dto/update-site-seo-settings.dto";

@Injectable()
export class SiteSeoSettingsService {
  constructor(private prisma: PrismaService) {}

  async create(createSiteSeoSettingsDto: CreateSiteSeoSettingsDto) {
    return this.prisma.siteSeoSettings.create({
      data: createSiteSeoSettingsDto,
    });
  }

  async findAll() {
    return this.prisma.siteSeoSettings.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const seoSettings = await this.prisma.siteSeoSettings.findUnique({
      where: { id },
    });

    if (!seoSettings) {
      throw new NotFoundException(`SEO настройки с ID ${id} не найдены`);
    }

    return seoSettings;
  }

  async findByPagePath(pagePath: string) {
    const seoSettings = await this.prisma.siteSeoSettings.findUnique({
      where: { pagePath },
    });

    if (!seoSettings || !seoSettings.isActive) {
      return null;
    }

    return seoSettings;
  }

  async update(id: string, updateSiteSeoSettingsDto: UpdateSiteSeoSettingsDto) {
    await this.findOne(id);

    return this.prisma.siteSeoSettings.update({
      where: { id },
      data: updateSiteSeoSettingsDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.siteSeoSettings.delete({
      where: { id },
    });
  }

  async getSeoPreview(seoSettings: any) {
    const baseUrl = process.env.FRONTEND_URL || "https://sibkomplekt.ru";

    return {
      google: {
        title: seoSettings.title,
        description: seoSettings.description,
        url: `${baseUrl}${seoSettings.pagePath}`,
        titleLength: seoSettings.title.length,
        descriptionLength: seoSettings.description.length,
        titleStatus: seoSettings.title.length <= 70 ? "good" : "warning",
        descriptionStatus:
          seoSettings.description.length <= 180 ? "good" : "warning",
      },
      yandex: {
        title: seoSettings.title,
        description: seoSettings.description,
        url: `${baseUrl}${seoSettings.pagePath}`,
        titleLength: seoSettings.title.length,
        descriptionLength: seoSettings.description.length,
        titleStatus: seoSettings.title.length <= 70 ? "good" : "warning",
        descriptionStatus:
          seoSettings.description.length <= 200 ? "good" : "warning",
      },
      og: {
        title: seoSettings.ogTitle || seoSettings.title,
        description: seoSettings.ogDescription || seoSettings.description,
        image: seoSettings.ogImage,
        url: `${baseUrl}${seoSettings.pagePath}`,
      },
    };
  }
}
