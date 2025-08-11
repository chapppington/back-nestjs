import { IsObject, IsOptional } from "class-validator";
import {
  ProductionFirstScreen,
  ProductionSecondScreen,
  ProductionThirdScreen,
  ProductionFourthScreen,
} from "./types";

export class UpdateProductionPageConfigDto {
  @IsOptional()
  @IsObject()
  firstScreen?: ProductionFirstScreen;

  @IsOptional()
  @IsObject()
  secondScreen?: ProductionSecondScreen;

  @IsOptional()
  @IsObject()
  thirdScreen?: ProductionThirdScreen;

  @IsOptional()
  @IsObject()
  fourthScreen?: ProductionFourthScreen;
}





