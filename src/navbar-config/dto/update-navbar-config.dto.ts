import { PartialType } from "@nestjs/mapped-types";
import { CreateNavbarConfigDto } from "./create-navbar-config.dto";

export class UpdateNavbarConfigDto extends PartialType(CreateNavbarConfigDto) {}
