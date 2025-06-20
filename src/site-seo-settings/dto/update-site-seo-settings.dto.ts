import { PartialType } from "@nestjs/mapped-types";
import { CreateSiteSeoSettingsDto } from "./create-site-seo-settings.dto";

export class UpdateSiteSeoSettingsDto extends PartialType(
  CreateSiteSeoSettingsDto
) {}
