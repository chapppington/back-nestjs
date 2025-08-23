import { IsArray, IsOptional, IsString } from "class-validator";
import { DepartmentItem } from "./types";

export class UpdateContactsPageConfigDto {
  @IsOptional()
  @IsArray()
  departments?: DepartmentItem[];

  @IsOptional()
  @IsString()
  address?: string;
}
