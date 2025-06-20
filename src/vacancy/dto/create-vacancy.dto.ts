import { IsNotEmpty, IsString, IsInt, IsArray } from "class-validator";

export class CreateVacancyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({ each: true })
  requirements: string[];

  @IsArray()
  @IsString({ each: true })
  experience: string[];

  @IsInt()
  @IsNotEmpty()
  salary: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}
