import { IsObject, IsOptional } from "class-validator";
import {
  VacanciesFirstScreen,
  VacanciesSecondScreen,
  VacanciesThirdScreen,
  VacanciesFourthScreen,
  VacanciesFifthScreen,
  VacanciesSixthScreen,
} from "./types";

export class UpdateVacanciesPageConfigDto {
  @IsOptional()
  @IsObject()
  firstScreen?: VacanciesFirstScreen;

  @IsOptional()
  @IsObject()
  secondScreen?: VacanciesSecondScreen;

  @IsOptional()
  @IsObject()
  thirdScreen?: VacanciesThirdScreen;

  @IsOptional()
  @IsObject()
  fourthScreen?: VacanciesFourthScreen;

  @IsOptional()
  @IsObject()
  fifthScreen?: VacanciesFifthScreen;

  @IsOptional()
  @IsObject()
  sixthScreen?: VacanciesSixthScreen;
}
