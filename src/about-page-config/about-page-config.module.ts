import { Module } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { AboutPageConfigController } from "./about-page-config.controller";
import { AboutPageConfigService } from "./about-page-config.service";

@Module({
  imports: [],
  controllers: [AboutPageConfigController],
  providers: [AboutPageConfigService, PrismaService],
  exports: [AboutPageConfigService],
})
export class AboutPageConfigModule {}
