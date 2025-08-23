import { Body, Controller, Get, Patch } from "@nestjs/common";
import { Auth } from "@/auth/decorators/auth.decorator";
import { Role } from "@prisma/client";
import { ContactsPageConfigService } from "./contacts-page-config.service";
import { UpdateContactsPageConfigDto } from "./dto";

@Controller("contacts-page-config")
export class ContactsPageConfigController {
  constructor(private readonly service: ContactsPageConfigService) {}

  @Get()
  getConfig() {
    return this.service.getConfig();
  }

  @Patch()
  @Auth(Role.MANAGER)
  updateConfig(@Body() dto: UpdateContactsPageConfigDto) {
    return this.service.updateConfig(dto);
  }
}



