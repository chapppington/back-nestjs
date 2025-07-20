import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { CreateNavbarConfigDto, UpdateNavbarConfigDto } from "./dto";

@Injectable()
export class NavbarConfigService {
  constructor(private prisma: PrismaService) {}

  async getConfig() {
    // Предполагается, что конфиг всегда один (первый найденный)
    let config = await this.prisma.navbarConfig.findFirst();
    if (!config) {
      // Если нет — создаём дефолтный
      config = await this.prisma.navbarConfig.create({
        data: {
          desktopNavbarConfig: {
            links_shown: [],
            links_in_hidden_menu: [],
          },
          navbarEmail: "",
          navbarPhone: "",
          navbarCtaButtonText: "",
        },
      });
    }
    return config;
  }

  async updateConfig(updateDto: UpdateNavbarConfigDto) {
    let config = await this.prisma.navbarConfig.findFirst();
    if (!config) {
      config = await this.prisma.navbarConfig.create({
        data: {
          desktopNavbarConfig: updateDto.desktopNavbarConfig || {
            links_shown: [],
            links_in_hidden_menu: [],
          },
          navbarEmail: updateDto.navbarEmail || "",
          navbarPhone: updateDto.navbarPhone || "",
          navbarCtaButtonText: updateDto.navbarCtaButtonText || "",
        },
      });
    } else {
      config = await this.prisma.navbarConfig.update({
        where: { id: config.id },
        data: updateDto,
      });
    }
    return config;
  }
}
