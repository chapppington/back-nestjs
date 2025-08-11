import { Module } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { ProductionPageConfigController } from "./production-page-config.controller";
import { ProductionPageConfigService } from "./production-page-config.service";

@Module({
  imports: [],
  controllers: [ProductionPageConfigController],
  providers: [ProductionPageConfigService, PrismaService],
  exports: [ProductionPageConfigService],
})
export class ProductionPageConfigModule {}
