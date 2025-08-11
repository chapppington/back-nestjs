import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { Auth } from "@/auth/decorators/auth.decorator";
import { Role } from "@prisma/client";
import { ProductionPageConfigService } from "./production-page-config.service";
import { UpdateProductionPageConfigDto } from "./dto";

@Controller("production-page-config")
export class ProductionPageConfigController {
  constructor(
    private readonly productionPageConfigService: ProductionPageConfigService
  ) {}

  @Get()
  getConfig() {
    return this.productionPageConfigService.getConfig();
  }

  @Patch()
  @Auth(Role.MANAGER)
  updateConfig(@Body() dto: UpdateProductionPageConfigDto) {
    return this.productionPageConfigService.updateConfig(dto);
  }

  // Generic upload endpoint returning uploaded filenames for fields used on the page
  @Post("upload")
  @Auth(Role.MANAGER)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: "./uploads/production-page",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    })
  )
  uploadFiles(@UploadedFiles() files?: Express.Multer.File[]) {
    const uploaded: Record<string, string | string[]> = {};
    if (!files?.length) return uploaded;
    for (const f of files) {
      const key = f.fieldname;
      if (uploaded[key]) {
        if (Array.isArray(uploaded[key])) {
          (uploaded[key] as string[]).push(f.filename);
        } else {
          uploaded[key] = [uploaded[key] as string, f.filename];
        }
      } else {
        uploaded[key] = f.filename;
      }
    }
    return uploaded;
  }
}
