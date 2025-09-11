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
import {
  UpdateProductDto,
  UpdateProductOrderDto,
} from "./dto/update-product.dto";
import { ImportProductsRequestDto } from "./dto/import-product.dto";
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
        { name: "advantageImages_0", maxCount: 1 },
        { name: "advantageImages_1", maxCount: 1 },
        { name: "advantageImages_2", maxCount: 1 },
        { name: "advantageImages_3", maxCount: 1 },
        { name: "advantageImages_4", maxCount: 1 },
        { name: "model_3d", maxCount: 1 },
        { name: "documentation", maxCount: 1 },
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
      advantageImages_0?: Express.Multer.File[];
      advantageImages_1?: Express.Multer.File[];
      advantageImages_2?: Express.Multer.File[];
      advantageImages_3?: Express.Multer.File[];
      advantageImages_4?: Express.Multer.File[];
      model_3d?: Express.Multer.File[];
      documentation?: Express.Multer.File[];
    }
  ) {
    if (files?.previewImage?.length) {
      createProductDto.previewImage = files.previewImage[0].filename;
    }
    if (files?.model_3d?.length) {
      createProductDto.model_3d_url = files.model_3d[0].filename;
    }
    if (files?.documentation?.length) {
      createProductDto.documentation = files.documentation[0].filename;
    }

    // Обрабатываем файлы изображений преимуществ по индексам
    const advantages = JSON.parse(createProductDto.advantages);

    for (let i = 0; i < 5; i++) {
      const fileKey = `advantageImages_${i}` as keyof typeof files;
      if (files?.[fileKey]?.length) {
        const file = files[fileKey]![0];
        if (advantages[i]) {
          advantages[i].image = file.filename;
        }
      }
    }

    createProductDto.advantages = JSON.stringify(advantages);

    // Обработка isShown - конвертируем строку в булево значение
    if (createProductDto.isShown !== undefined) {
      createProductDto.isShown = String(createProductDto.isShown) === "true";
    }
    // Обработка showAdvantages - конвертируем строку в булево значение
    if (createProductDto.showAdvantages !== undefined) {
      createProductDto.showAdvantages =
        String(createProductDto.showAdvantages) === "true";
    }

    return this.productService.create(createProductDto);
  }

  @Post("import")
  @Auth(Role.MANAGER)
  importFromExcel(@Body() body: ImportProductsRequestDto) {
    return this.productService.importFromExcel(body.products);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get("admin")
  @Auth(Role.MANAGER)
  findAllForAdmin() {
    return this.productService.findAllForAdmin();
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

  @Patch("order")
  @Auth(Role.MANAGER)
  async updateOrder(@Body() dto: UpdateProductOrderDto[]) {
    return this.productService.updateOrder(dto);
  }

  @Patch(":id")
  @Auth(Role.MANAGER)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: "previewImage", maxCount: 1 },
        { name: "advantageImages_0", maxCount: 1 },
        { name: "advantageImages_1", maxCount: 1 },
        { name: "advantageImages_2", maxCount: 1 },
        { name: "advantageImages_3", maxCount: 1 },
        { name: "advantageImages_4", maxCount: 1 },
        { name: "model_3d", maxCount: 1 },
        { name: "documentation", maxCount: 1 },
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
      advantageImages_0?: Express.Multer.File[];
      advantageImages_1?: Express.Multer.File[];
      advantageImages_2?: Express.Multer.File[];
      advantageImages_3?: Express.Multer.File[];
      advantageImages_4?: Express.Multer.File[];
      model_3d?: Express.Multer.File[];
      documentation?: Express.Multer.File[];
    }
  ) {
    // Convert clear flags from string to boolean if they exist
    if (typeof updateProductDto.clearPreviewImage === "string") {
      updateProductDto.clearPreviewImage =
        updateProductDto.clearPreviewImage === "true";
    }
    if (typeof updateProductDto.clearModel3d === "string") {
      updateProductDto.clearModel3d = updateProductDto.clearModel3d === "true";
    }
    // Обработка isShown - конвертируем строку в булево значение
    if (updateProductDto.isShown !== undefined) {
      updateProductDto.isShown = String(updateProductDto.isShown) === "true";
    }
    // Обработка showAdvantages - конвертируем строку в булево значение
    if (updateProductDto.showAdvantages !== undefined) {
      updateProductDto.showAdvantages =
        String(updateProductDto.showAdvantages) === "true";
    }
    // Parse clearAdvantageImageIndex from JSON string if it exists
    if (typeof updateProductDto.clearAdvantageImageIndex === "string") {
      try {
        updateProductDto.clearAdvantageImageIndex = JSON.parse(
          updateProductDto.clearAdvantageImageIndex
        );
      } catch (e) {
        updateProductDto.clearAdvantageImageIndex = [];
      }
    }

    if (files?.previewImage?.length) {
      updateProductDto.previewImage = files.previewImage[0].filename;
    }
    if (files?.model_3d?.length) {
      updateProductDto.model_3d_url = files.model_3d[0].filename;
    }
    if (files?.documentation?.length) {
      updateProductDto.documentation = files.documentation[0].filename;
    }

    if (updateProductDto.advantages !== undefined) {
      const advantages = JSON.parse(updateProductDto.advantages as any);
      for (let i = 0; i < 5; i++) {
        const fileKey = `advantageImages_${i}` as keyof typeof files;
        if (files?.[fileKey]?.length) {
          const file = files[fileKey]![0];
          if (advantages[i]) {
            advantages[i].image = file.filename;
          }
        }
      }
      updateProductDto.advantages = JSON.stringify(advantages);
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
