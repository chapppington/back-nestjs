import { PrismaService } from "@/prisma.service";
import { Module } from "@nestjs/common";
import { HomePageConfigController } from "./home-page-config.controller";
import { HomePageConfigService } from "./home-page-config.service";

@Module({
  imports: [],
  controllers: [HomePageConfigController],
  providers: [HomePageConfigService, PrismaService],
  exports: [HomePageConfigService],
})
export class HomePageConfigModule {}
