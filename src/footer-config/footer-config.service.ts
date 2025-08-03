import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { CreateFooterConfigDto, UpdateFooterConfigDto } from "./dto";

@Injectable()
export class FooterConfigService {
  private readonly logger = new Logger(FooterConfigService.name);

  constructor(private prisma: PrismaService) {}

  async getConfig() {
    // Предполагается, что конфиг всегда один (первый найденный)
    let config = await this.prisma.footerConfig.findFirst();
    if (!config) {
      // Если нет — создаём дефолтный
      config = await this.prisma.footerConfig.create({
        data: {
          footerLinksConfig: {
            links_in_tablet_menu: [],
            all_links: [],
          },
          departmentItems: [],
          footerAddress: "",
        },
      });
    }
    return config;
  }

  async updateConfig(updateDto: UpdateFooterConfigDto) {
    this.logger.log(`Updating footer config with data: ${JSON.stringify(updateDto)}`);
    
    let config = await this.prisma.footerConfig.findFirst();
    if (!config) {
      this.logger.log('No existing config found, creating new one');
      config = await this.prisma.footerConfig.create({
        data: {
          footerLinksConfig: updateDto.footerLinksConfig || {
            links_in_tablet_menu: [],
            all_links: [],
          },
          departmentItems: updateDto.departmentItems || [],
          footerAddress: updateDto.footerAddress || "",
        },
      });
    } else {
      this.logger.log(`Updating existing config with id: ${config.id}`);
      config = await this.prisma.footerConfig.update({
        where: { id: config.id },
        data: updateDto,
      });
    }
    
    this.logger.log(`Config updated successfully: ${JSON.stringify(config)}`);
    return config;
  }
}
