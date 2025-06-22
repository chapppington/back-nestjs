import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Role } from "@prisma/client";
import { Auth } from "@/auth/decorators/auth.decorator";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("products")
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth(Role.MANAGER)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "previewImage", maxCount: 1 },
        { name: "advantageImages", maxCount: 5 },
        { name: "model_3d", maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: "./uploads/products",
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
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles()
    files?: {
      previewImage?: Express.Multer.File[];
      advantageImages?: Express.Multer.File[];
      model_3d?: Express.Multer.File[];
    }
  ) {
    if (files?.previewImage?.length) {
      createProductDto.previewImage = files.previewImage[0].filename;
    }
    if (files?.advantageImages?.length) {
      createProductDto.advantageImages = files.advantageImages.map(
        (file) => file.filename
      );
    }
    if (files?.model_3d?.length) {
      createProductDto.model_3d_url = files.model_3d[0].filename;
    }

    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get("catalog")
  getCatalog(
    @Query("category") category?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string
  ) {
    const pageNumber = page ? parseInt(page) : 1;
    const limitNumber = limit ? parseInt(limit) : 10;

    return this.productService.getCatalog(category, pageNumber, limitNumber);
  }

  @Get("category/:category")
  findByCategory(@Param("category") category: string) {
    return this.productService.findByCategory(category);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }

  @Get("slug/:slug")
  findBySlug(@Param("slug") slug: string) {
    return this.productService.findBySlug(slug);
  }

  @Patch(":id")
  @Auth(Role.MANAGER)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "previewImage", maxCount: 1 },
        { name: "advantageImages", maxCount: 5 },
        { name: "model_3d", maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: "./uploads/products",
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
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles()
    files?: {
      previewImage?: Express.Multer.File[];
      advantageImages?: Express.Multer.File[];
      model_3d?: Express.Multer.File[];
    }
  ) {
    if (files?.previewImage?.length) {
      updateProductDto.previewImage = files.previewImage[0].filename;
    }
    if (files?.advantageImages?.length) {
      updateProductDto.advantageImages = files.advantageImages.map(
        (file) => file.filename
      );
    }
    if (files?.model_3d?.length) {
      updateProductDto.model_3d_url = files.model_3d[0].filename;
    }

    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  @Auth(Role.MANAGER)
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }

  @Post(":id/connect-portfolio/:portfolioId")
  @Auth(Role.MANAGER)
  connectPortfolioItem(
    @Param("id") id: string,
    @Param("portfolioId") portfolioId: string
  ) {
    return this.productService.connectPortfolioItem(id, portfolioId);
  }

  @Delete(":id/disconnect-portfolio/:portfolioId")
  @Auth(Role.MANAGER)
  disconnectPortfolioItem(
    @Param("id") id: string,
    @Param("portfolioId") portfolioId: string
  ) {
    return this.productService.disconnectPortfolioItem(id, portfolioId);
  }
}
