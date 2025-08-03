import { IsString, IsOptional, IsObject, IsArray } from "class-validator";

export class CreateFooterConfigDto {
  @IsObject()
  footerLinksConfig: {
    links_in_tablet_menu: string[];
    all_links: string[];
  };

  @IsArray()
  departmentItems: {
    name: string;
    phone?: string;
    email: string;
  }[];

  @IsString()
  @IsOptional()
  footerAddress: string;
} 