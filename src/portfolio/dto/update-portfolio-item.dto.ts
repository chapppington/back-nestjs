import { IsString, IsOptional, IsBoolean } from "class-validator";

export class UpdatePortfolioItemDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  poster?: string;

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

  @IsString()
  @IsOptional()
  solutionImage?: string;

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
