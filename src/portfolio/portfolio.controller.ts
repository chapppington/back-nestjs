import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Logger,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { PortfolioService } from "./portfolio.service";
import { CreatePortfolioItemDto } from "./dto/create-portfolio-item.dto";
import { UpdatePortfolioItemDto } from "./dto/update-portfolio-item.dto";
import { Role } from "@prisma/client";
import { Auth } from "@/auth/decorators/auth.decorator";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("portfolio")
export class PortfolioController {
  private readonly logger = new Logger(PortfolioController.name);

  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @Auth(Role.MANAGER)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "poster", maxCount: 1 },
        { name: "solutionImage", maxCount: 1 },
        { name: "reviewImage", maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: "./uploads/portfolio",
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + "-" + Math.round(Math.random() * 1e9);
            callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      }
    )
  )
  create(
    @Body() createPortfolioItemDto: CreatePortfolioItemDto,
    @UploadedFiles()
    files?: {
      poster?: Express.Multer.File[];
      solutionImage?: Express.Multer.File[];
      reviewImage?: Express.Multer.File[];
    }
  ) {
    // Convert hasReview from string to boolean if it exists
    if (typeof createPortfolioItemDto.hasReview === "string") {
      createPortfolioItemDto.hasReview =
        createPortfolioItemDto.hasReview === "true";
    }

    if (files) {
      if (files.poster?.[0]) {
        createPortfolioItemDto.poster = files.poster[0].filename;
      }
      if (files.solutionImage?.[0]) {
        createPortfolioItemDto.solutionImage = files.solutionImage[0].filename;
      }
      if (files.reviewImage?.[0]) {
        createPortfolioItemDto.reviewImage = files.reviewImage[0].filename;
      }
    }

    return this.portfolioService.create(createPortfolioItemDto);
  }

  @Get()
  findAll() {
    return this.portfolioService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.portfolioService.findOne(id);
  }

  @Patch(":id")
  @Auth(Role.MANAGER)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "poster", maxCount: 1 },
        { name: "solutionImage", maxCount: 1 },
        { name: "reviewImage", maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: "./uploads/portfolio",
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + "-" + Math.round(Math.random() * 1e9);
            callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      }
    )
  )
  update(
    @Param("id") id: string,
    @Body() updatePortfolioItemDto: UpdatePortfolioItemDto,
    @UploadedFiles()
    files?: {
      poster?: Express.Multer.File[];
      solutionImage?: Express.Multer.File[];
      reviewImage?: Express.Multer.File[];
    }
  ) {
    // Convert hasReview from string to boolean if it exists
    if (typeof updatePortfolioItemDto.hasReview === "string") {
      updatePortfolioItemDto.hasReview =
        updatePortfolioItemDto.hasReview === "true";
    }

    if (files) {
      if (files.poster?.[0]) {
        updatePortfolioItemDto.poster = files.poster[0].filename;
      }
      if (files.solutionImage?.[0]) {
        updatePortfolioItemDto.solutionImage = files.solutionImage[0].filename;
      }
      if (files.reviewImage?.[0]) {
        updatePortfolioItemDto.reviewImage = files.reviewImage[0].filename;
      }
    }
    return this.portfolioService.update(id, updatePortfolioItemDto);
  }

  @Delete(":id")
  @Auth(Role.MANAGER)
  remove(@Param("id") id: string) {
    return this.portfolioService.remove(id);
  }
}
