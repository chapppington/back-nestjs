import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Logger,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
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
    FileInterceptor("poster", {
      storage: diskStorage({
        destination: "./uploads/portfolio",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    })
  )
  create(
    @Body() createPortfolioItemDto: CreatePortfolioItemDto,
    @UploadedFile()
    file?: Express.Multer.File
  ) {
    if (file) {
      this.logger.debug(
        `File received: ${JSON.stringify({
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
        })}`
      );
      createPortfolioItemDto.poster = file.filename;
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
    FileInterceptor("poster", {
      storage: diskStorage({
        destination: "./uploads/portfolio",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    })
  )
  update(
    @Param("id") id: string,
    @Body() updatePortfolioItemDto: UpdatePortfolioItemDto,
    @UploadedFile()
    file?: Express.Multer.File
  ) {
    if (file) {
      this.logger.debug(
        `File received: ${JSON.stringify({
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
        })}`
      );
      updatePortfolioItemDto.poster = file.filename;
    }
    return this.portfolioService.update(id, updatePortfolioItemDto);
  }

  @Delete(":id")
  @Auth(Role.MANAGER)
  remove(@Param("id") id: string) {
    return this.portfolioService.remove(id);
  }
}
