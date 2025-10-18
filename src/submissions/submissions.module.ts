import { Module } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { SubmissionsController } from "./submissions.controller";
import { SubmissionsService } from "./submissions.service";
import { EmailModule } from "@/email/email.module";

@Module({
  imports: [EmailModule],
  controllers: [SubmissionsController],
  providers: [SubmissionsService, PrismaService],
  exports: [SubmissionsService],
})
export class SubmissionsModule {}
