import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
  IsObject,
} from "class-validator";
import { Type } from "class-transformer";

export class ImportImportantCharacteristicDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  unit?: { text: string };

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class ImportAdvantageDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class ImportSimpleDescriptionItemDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class ImportDetailedDescriptionItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class ImportProductDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  previewImage?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportImportantCharacteristicDto)
  importantCharacteristics: ImportImportantCharacteristicDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportAdvantageDto)
  advantages: ImportAdvantageDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => ImportSimpleDescriptionItemDto)
  simpleDescription: { items: ImportSimpleDescriptionItemDto[] };

  @IsObject()
  @ValidateNested()
  @Type(() => ImportDetailedDescriptionItemDto)
  detailedDescription: { items: ImportDetailedDescriptionItemDto[] };

  @IsOptional()
  @IsString()
  model_3d_url?: string;
}

export class ImportProductsRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportProductDto)
  products: ImportProductDto[];
}
