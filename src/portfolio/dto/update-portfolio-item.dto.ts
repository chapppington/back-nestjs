import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsArray,
} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreatePortfolioItemDto } from "./create-portfolio-item.dto";

export class UpdatePortfolioItemDto extends PartialType(
  CreatePortfolioItemDto
) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  poster?: string;

  @IsInt()
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  taskTitle?: string;

  @IsString()
  @IsOptional()
  taskDescription?: string;

  @IsString()
  @IsOptional()
  solutionTitle?: string;

  @IsString()
  @IsOptional()
  solutionDescription?: string;

  @IsString()
  @IsOptional()
  solutionSubtitle?: string;

  @IsString()
  @IsOptional()
  solutionSubdescription?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  solutionImages?: string[];

  @IsString()
  @IsOptional()
  previewVideoPath?: string;

  @IsString()
  @IsOptional()
  fullVideoPath?: string;

  @IsBoolean()
  @IsOptional()
  hasReview?: boolean;

  @IsString()
  @IsOptional()
  reviewTitle?: string;

  @IsString()
  @IsOptional()
  reviewText?: string;

  @IsString()
  @IsOptional()
  reviewName?: string;

  @IsString()
  @IsOptional()
  reviewImage?: string;

  @IsString()
  @IsOptional()
  reviewRole?: string;

  @IsString()
  @IsOptional()
  description?: string;

  slug?: string;
}
