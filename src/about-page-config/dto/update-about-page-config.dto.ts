import { IsOptional } from "class-validator";
import { AboutFirstScreen, AboutHistoryScreen, AboutTeamScreen } from "./types";

export class UpdateAboutPageConfigDto {
  @IsOptional()
  firstScreen?: AboutFirstScreen;

  @IsOptional()
  historyScreen?: AboutHistoryScreen;

  @IsOptional()
  teamScreen?: AboutTeamScreen;
}
