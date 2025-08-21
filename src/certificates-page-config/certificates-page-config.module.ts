import { Module } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { CertificatesPageConfigController } from "./certificates-page-config.controller";
import { CertificatesPageConfigService } from "./certificates-page-config.service";

@Module({
  imports: [],
  controllers: [CertificatesPageConfigController],
  providers: [CertificatesPageConfigService, PrismaService],
  exports: [CertificatesPageConfigService],
})
export class CertificatesPageConfigModule {}
