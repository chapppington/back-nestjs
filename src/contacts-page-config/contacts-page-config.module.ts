import { Module } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { ContactsPageConfigController } from "./contacts-page-config.controller";
import { ContactsPageConfigService } from "./contacts-page-config.service";

@Module({
  controllers: [ContactsPageConfigController],
  providers: [ContactsPageConfigService, PrismaService],
  exports: [ContactsPageConfigService],
})
export class ContactsPageConfigModule {}



