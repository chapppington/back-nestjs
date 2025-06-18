import { IsString, IsOptional, IsNumber } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateNewsDto } from "./create-news.dto";

export class UpdateNewsDto extends PartialType(CreateNewsDto) {
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

  slug?: string;
}
