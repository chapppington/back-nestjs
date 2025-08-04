import {
  Controller,
  Get,
  Patch,
  Body,
  Post,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { HomePageConfigService } from "./home-page-config.service";
import { Auth } from "@/auth/decorators/auth.decorator";
import { Role } from "@prisma/client";
import { UpdateHomePageConfigDto } from "./dto";

@Controller("home-page-config")
export class HomePageConfigController {
  constructor(private readonly homePageConfigService: HomePageConfigService) {}

  @Get()
  getConfig() {
    return this.homePageConfigService.getConfig();
  }

  @Patch()
  @Auth(Role.MANAGER)
  updateConfig(@Body() updateDto: UpdateHomePageConfigDto) {
    return this.homePageConfigService.updateConfig(updateDto);
  }

  @Post("upload")
  @Auth(Role.MANAGER)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "productImage", maxCount: 1 },
        { name: "reviewAvatar", maxCount: 1 },
        { name: "reviewContent", maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: "./uploads/home-page",
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + "-" + Math.round(Math.random() * 1e9);
            callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      }
    )
  )
  uploadFiles(
    @UploadedFiles()
    files?: {
      productImage?: Express.Multer.File[];
      reviewAvatar?: Express.Multer.File[];
      reviewContent?: Express.Multer.File[];
    }
  ) {
    const uploadedFiles: { [key: string]: string } = {};

    if (files?.productImage?.[0]) {
      uploadedFiles.productImage = files.productImage[0].filename;
    }
    if (files?.reviewAvatar?.[0]) {
      uploadedFiles.reviewAvatar = files.reviewAvatar[0].filename;
    }
    if (files?.reviewContent?.[0]) {
      uploadedFiles.reviewContent = files.reviewContent[0].filename;
    }

    return uploadedFiles;
  }
}
