import { PartialType } from "@nestjs/mapped-types";
import { CreateHomePageConfigDto } from "./create-home-page-config.dto";

export class UpdateHomePageConfigDto extends PartialType(
  CreateHomePageConfigDto
) {}
