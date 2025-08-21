import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { UpdateCertificatesPageConfigDto } from "./dto";

@Injectable()
export class CertificatesPageConfigService {
  constructor(private prisma: PrismaService) {}

  async getConfig() {
    let config = await this.prisma.certificatesPageConfig.findFirst();
    if (!config) {
      config = await this.prisma.certificatesPageConfig.create({
        data: {
          tabs: [
            {
              name: "Декларации",
              items: [
                {
                  id: 1,
                  title: "Декларации",
                  content: "Здесь представлены декларации.",
                  order: 1,
                  documents: [{ title: "Пример декларации", link: "" }],
                },
              ],
            },
          ],
        } as any,
      });
    }
    return config;
  }

  async updateConfig(dto: UpdateCertificatesPageConfigDto) {
    let config = await this.prisma.certificatesPageConfig.findFirst();
    if (!config) {
      config = await this.prisma.certificatesPageConfig.create({
        data: {} as any,
      });
    }

    const updated = await this.prisma.certificatesPageConfig.update({
      where: { id: config.id },
      data: dto as any,
    });
    return updated;
  }
}

