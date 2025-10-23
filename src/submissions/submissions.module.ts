import { Module } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { SubmissionsController } from "./submissions.controller";
import { SubmissionsService } from "./submissions.service";
import { EmailModule } from "@/email/email.module";
import { BitrixModule } from "@/bitrix/bitrix.module";

@Module({
  imports: [EmailModule, BitrixModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, PrismaService],
  exports: [SubmissionsService],
})
export class SubmissionsModule {}
