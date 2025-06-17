import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class UpdateNewsDto {
  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsOptional()
  readingTime?: number;
}
