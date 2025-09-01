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
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      try {
        // Пытаемся распарсить JSON
        const parsed = JSON.parse(value);
        return Boolean(parsed);
      } catch {
        // Если не JSON, проверяем как строку
        return value.toLowerCase() === "true";
      }
    }
    return false;
  })
  consent: boolean;

  @IsOptional()
  meta?: any;
}
