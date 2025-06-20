import { PrismaService } from "@/prisma.service";
import { Module } from "@nestjs/common";
import { SiteSeoSettingsController } from "./site-seo-settings.controller";
import { SiteSeoSettingsService } from "./site-seo-settings.service";

@Module({
  imports: [],
  controllers: [SiteSeoSettingsController],
  providers: [SiteSeoSettingsService, PrismaService],
  exports: [SiteSeoSettingsService],
})
export class SiteSeoSettingsModule {}
