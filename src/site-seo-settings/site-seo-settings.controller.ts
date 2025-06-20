import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from "@nestjs/common";
import { SiteSeoSettingsService } from "./site-seo-settings.service";
import { CreateSiteSeoSettingsDto } from "./dto/create-site-seo-settings.dto";
import { UpdateSiteSeoSettingsDto } from "./dto/update-site-seo-settings.dto";
import { Role } from "@prisma/client";
import { Auth } from "@/auth/decorators/auth.decorator";

@Controller("site-seo-settings")
export class SiteSeoSettingsController {
  private readonly logger = new Logger(SiteSeoSettingsController.name);

  constructor(
    private readonly siteSeoSettingsService: SiteSeoSettingsService
  ) {}

  @Post()
  @Auth(Role.MANAGER)
  create(@Body() createSiteSeoSettingsDto: CreateSiteSeoSettingsDto) {
    return this.siteSeoSettingsService.create(createSiteSeoSettingsDto);
  }

  @Get()
  findAll() {
    return this.siteSeoSettingsService.findAll();
  }

  @Get("by-path")
  findByPagePathQuery(@Query("path") path: string) {
    return this.siteSeoSettingsService.findByPagePath(path);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.siteSeoSettingsService.findOne(id);
  }

  @Get("page/:pagePath")
  findByPagePath(@Param("pagePath") pagePath: string) {
    return this.siteSeoSettingsService.findByPagePath(pagePath);
  }

  @Get(":id/preview")
  @Auth(Role.MANAGER)
  getSeoPreview(@Param("id") id: string) {
    return this.siteSeoSettingsService.findOne(id).then((seoSettings) => {
      return this.siteSeoSettingsService.getSeoPreview(seoSettings);
    });
  }

  @Patch(":id")
  @Auth(Role.MANAGER)
  update(
    @Param("id") id: string,
    @Body() updateSiteSeoSettingsDto: UpdateSiteSeoSettingsDto
  ) {
    return this.siteSeoSettingsService.update(id, updateSiteSeoSettingsDto);
  }

  @Delete(":id")
  @Auth(Role.MANAGER)
  remove(@Param("id") id: string) {
    return this.siteSeoSettingsService.remove(id);
  }
}
