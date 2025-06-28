import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  alt?: string;

  @IsNumber()
  @IsOptional()
  readingTime?: number;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  shortContent?: string;
}
