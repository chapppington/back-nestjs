import {
  Controller,
  Get,
  Patch,
  Body,
} from "@nestjs/common";
import { NavbarConfigService } from "./navbar-config.service";
import { Auth } from "@/auth/decorators/auth.decorator";
import { Role } from "@prisma/client";
import { UpdateNavbarConfigDto } from "./dto";

@Controller("navbar-config")
export class NavbarConfigController {
  constructor(private readonly navbarConfigService: NavbarConfigService) {}

  @Get()
  getConfig() {
    return this.navbarConfigService.getConfig();
  }

  @Patch()
  @Auth(Role.MANAGER)
  updateConfig(@Body() updateDto: UpdateNavbarConfigDto) {
    return this.navbarConfigService.updateConfig(updateDto);
  }
} 