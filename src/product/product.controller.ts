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
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Role } from "@prisma/client";
import { Auth } from "@/auth/decorators/auth.decorator";

@Controller("products")
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth(Role.MANAGER)
  create(@Body() createProductDto: CreateProductDto) {
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

  @Patch(":id")
  @Auth(Role.MANAGER)
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
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
