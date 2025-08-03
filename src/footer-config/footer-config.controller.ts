import { Controller, Get, Patch, Body, Logger } from "@nestjs/common";
import { FooterConfigService } from "./footer-config.service";
import { Auth } from "@/auth/decorators/auth.decorator";
import { Role } from "@prisma/client";
import { UpdateFooterConfigDto } from "./dto";

@Controller("footer-config")
export class FooterConfigController {
  private readonly logger = new Logger(FooterConfigController.name);

  constructor(private readonly footerConfigService: FooterConfigService) {}

  @Get()
  getConfig() {
    this.logger.log('Getting footer config');
    return this.footerConfigService.getConfig();
  }

  @Patch()
  @Auth(Role.MANAGER)
  updateConfig(@Body() updateDto: UpdateFooterConfigDto) {
    this.logger.log(`Received update request with data: ${JSON.stringify(updateDto)}`);
    return this.footerConfigService.updateConfig(updateDto);
  }
}
