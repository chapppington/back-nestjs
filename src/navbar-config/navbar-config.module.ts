import { PrismaService } from "@/prisma.service";
import { Module } from "@nestjs/common";
import { NavbarConfigController } from "./navbar-config.controller";
import { NavbarConfigService } from "./navbar-config.service";

@Module({
  imports: [],
  controllers: [NavbarConfigController],
  providers: [NavbarConfigService, PrismaService],
  exports: [NavbarConfigService],
})
export class NavbarConfigModule {} 