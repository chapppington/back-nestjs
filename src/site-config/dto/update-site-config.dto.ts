import { PartialType } from "@nestjs/mapped-types";
import { CreateSiteConfigDto } from "./create-site-config.dto";

export class UpdateSiteConfigDto extends PartialType(CreateSiteConfigDto) {}
