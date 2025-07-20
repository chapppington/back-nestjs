import { IsString, IsOptional, IsObject } from "class-validator";

export class CreateNavbarConfigDto {
  @IsObject()
  desktopNavbarConfig: {
    links_shown: string[];
    links_in_hidden_menu: string[];
  };

  @IsOptional()
  @IsString()
  navbarEmail?: string;

  @IsOptional()
  @IsString()
  navbarPhone?: string;

  @IsOptional()
  @IsString()
  navbarCtaButtonText?: string;
}
