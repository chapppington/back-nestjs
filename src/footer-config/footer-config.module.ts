import { PrismaService } from "@/prisma.service";
import { Module } from "@nestjs/common";
import { FooterConfigController } from "./footer-config.controller";
import { FooterConfigService } from "./footer-config.service";

@Module({
  imports: [],
  controllers: [FooterConfigController],
  providers: [FooterConfigService, PrismaService],
  exports: [FooterConfigService],
})
export class FooterConfigModule {}
