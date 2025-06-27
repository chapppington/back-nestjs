import { PrismaService } from "@/prisma.service";
import { Module } from "@nestjs/common";
import { SiteConfigController } from "./site-config.controller";
import { SiteConfigService } from "./site-config.service";

@Module({
  imports: [],
  controllers: [SiteConfigController],
  providers: [SiteConfigService, PrismaService],
  exports: [SiteConfigService],
})
export class SiteConfigModule {}
