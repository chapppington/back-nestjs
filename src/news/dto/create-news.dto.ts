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

  @IsNumber()
  @IsOptional()
  readingTime?: number;
}
