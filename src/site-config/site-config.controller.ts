import {
  Controller,
  Get,
  Patch,
  Body,
  Sse,
  MessageEvent,
} from "@nestjs/common";
import { SiteConfigService } from "./site-config.service";
import { Auth } from "@/auth/decorators/auth.decorator";
import { Role } from "@prisma/client";
import { Observable, map } from "rxjs";

@Controller("site-config")
export class SiteConfigController {
  constructor(private readonly siteConfigService: SiteConfigService) {}

  @Get()
  getConfig() {
    return this.siteConfigService.getConfig();
  }

  @Patch("font-family")
  @Auth(Role.MANAGER)
  updateFontFamily(@Body("fontFamily") fontFamily: string) {
    return this.siteConfigService.updateFontFamily(fontFamily);
  }

  @Sse("stream")
  fontFamilyStream(): Observable<MessageEvent> {
    return this.siteConfigService.fontFamilyStream$.pipe(
      map((data) => ({ data }))
    );
  }
}
