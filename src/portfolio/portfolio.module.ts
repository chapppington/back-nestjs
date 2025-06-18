import { PrismaService } from "@/prisma.service";
import { Module } from "@nestjs/common";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioService } from "./portfolio.service";

@Module({
  imports: [],
  controllers: [PortfolioController],
  providers: [PortfolioService, PrismaService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
