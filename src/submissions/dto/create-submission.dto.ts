import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsArray,
} from "class-validator";
import { Transform } from "class-transformer";
import { FormType } from "@prisma/client";

export class CreateSubmissionDto {
  @IsEnum(FormType)
  @IsNotEmpty()
  formType: FormType;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  files?: string[];

  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === "string") {
      return value === "true";
    }
    return value;
  })
  consent: boolean;

  @IsOptional()
  meta?: any;
}
