import { Module } from "@nestjs/common";
import { VacancyController } from "./vacancy.controller";
import { VacancyService } from "./vacancy.service";
import { PrismaService } from "@/prisma.service";

@Module({
  imports: [],
  controllers: [VacancyController],
  providers: [VacancyService, PrismaService],
  exports: [VacancyService],
})
export class VacancyModule {}
