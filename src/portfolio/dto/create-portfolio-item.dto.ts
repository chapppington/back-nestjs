import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsArray,
} from "class-validator";

export class CreatePortfolioItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  poster?: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  taskTitle: string;

  @IsString()
  @IsNotEmpty()
  taskDescription: string;

  @IsString()
  @IsNotEmpty()
  solutionTitle: string;

  @IsString()
  @IsNotEmpty()
  solutionDescription: string;

  @IsString()
  @IsNotEmpty()
  solutionSubtitle: string;

  @IsString()
  @IsNotEmpty()
  solutionSubdescription: string;

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
}
