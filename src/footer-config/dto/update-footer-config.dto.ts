import { PartialType } from "@nestjs/mapped-types";
import { CreateFooterConfigDto } from "./create-footer-config.dto";

export class UpdateFooterConfigDto extends PartialType(CreateFooterConfigDto) {}
