import { IsString, MinLength } from "class-validator";

export class CreateSiteConfigDto {
  @IsString()
  @MinLength(1, { message: "Шрифт не может быть пустым" })
  fontFamily: string;
}
