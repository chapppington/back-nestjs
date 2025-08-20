import { Module } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { VacanciesPageConfigController } from "./vacancies-page-config.controller";
import { VacanciesPageConfigService } from "./vacancies-page-config.service";

@Module({
  imports: [],
  controllers: [VacanciesPageConfigController],
  providers: [VacanciesPageConfigService, PrismaService],
  exports: [VacanciesPageConfigService],
})
export class VacanciesPageConfigModule {}
