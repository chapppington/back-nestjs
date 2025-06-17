import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Logger,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Role } from "@prisma/client";
import { Auth } from "@/auth/decorators/auth.decorator";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("news")
export class NewsController {
  private readonly logger = new Logger(NewsController.name);

  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Auth(Role.MANAGER)
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads/news",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    })
  )
  create(
    @Body() createNewsDto: CreateNewsDto,
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
      createNewsDto.image = file.filename;
    }
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(RolesGuard)
  @Auth(Role.MANAGER)
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads/news",
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
    @Body() updateNewsDto: UpdateNewsDto,
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
      updateNewsDto.image = file.filename;
    }
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(":id")
  @UseGuards(RolesGuard)
  @Auth(Role.MANAGER)
  remove(@Param("id") id: string) {
    return this.newsService.remove(id);
  }
}
