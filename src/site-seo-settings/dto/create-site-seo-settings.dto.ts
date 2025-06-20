import {
  IsString,
  IsOptional,
  IsBoolean,
  MaxLength,
  IsUrl,
} from "class-validator";

export class CreateSiteSeoSettingsDto {
  @IsString()
  @MaxLength(100, { message: "Путь страницы не должен превышать 100 символов" })
  pagePath: string;

  @IsString()
  @MaxLength(100, {
    message: "Название страницы не должно превышать 100 символов",
  })
  pageName: string;

  @IsString()
  @MaxLength(70, {
    message:
      "Title не должен превышать 70 символов для оптимального отображения в поисковых системах",
  })
  title: string;

  @IsString()
  @MaxLength(180, {
    message:
      "Description не должен превышать 180 символов для оптимального отображения в поисковых системах",
  })
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: "Keywords не должны превышать 500 символов" })
  keywords?: string;

  @IsOptional()
  @IsString()
  @MaxLength(70, { message: "OG Title не должен превышать 70 символов" })
  ogTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180, {
    message: "OG Description не должен превышать 180 символов",
  })
  ogDescription?: string;

  @IsOptional()
  @IsUrl({}, { message: "OG Image должен быть валидным URL" })
  ogImage?: string;

  @IsOptional()
  @IsUrl({}, { message: "Canonical URL должен быть валидным URL" })
  canonicalUrl?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
