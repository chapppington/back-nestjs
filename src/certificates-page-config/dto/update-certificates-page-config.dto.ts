import { IsArray, IsObject, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CertificatesTab } from "./types";

export class UpdateCertificatesPageConfigDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  tabs?: CertificatesTab[];
}

