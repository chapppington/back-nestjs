import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { IsOptional, IsBoolean, IsArray } from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  // Флаги для удаления файлов
  @IsOptional()
  @IsBoolean()
  clearPreviewImage?: boolean;

  @IsOptional()
  @IsArray()
  clearAdvantageImageIndex?: number[];

  @IsOptional()
  @IsBoolean()
  clearModel3d?: boolean;
}

export class UpdateProductOrderDto {
  id: string;
  order: number;
}
