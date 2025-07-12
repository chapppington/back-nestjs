import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

export class ImportantCharacteristicDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsOptional()
  unit?: { text: string };

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class AdvantageDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  alt?: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class SimpleDescriptionItemDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class DetailedDescriptionItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateProductDto {
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

  @IsString()
  @IsOptional()
  previewImageAlt?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImportantCharacteristicDto)
  importantCharacteristics: ImportantCharacteristicDto[];

  @IsString()
  advantages: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SimpleDescriptionItemDto)
  simpleDescription: { items: SimpleDescriptionItemDto[] };

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailedDescriptionItemDto)
  detailedDescription: { items: DetailedDescriptionItemDto[] };

  @IsOptional()
  @IsString()
  model_3d_url?: string;
}
