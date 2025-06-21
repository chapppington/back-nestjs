import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  private addImageUrls(product: any) {
    if (product.advantageImages && product.advantageImages.length > 0) {
      product.advantageImageUrls = product.advantageImages.map(
        (image: string) => `/uploads/products/${image}`
      );
    }
    return product;
  }

  create(createProductDto: CreateProductDto) {
    return this.prisma.product
      .create({
        data: {
          category: createProductDto.category,
          name: createProductDto.name,
          description: createProductDto.description,
          importantCharacteristics: JSON.parse(
            JSON.stringify(createProductDto.importantCharacteristics)
          ),
          advantages: JSON.parse(JSON.stringify(createProductDto.advantages)),
          simpleDescription: JSON.parse(
            JSON.stringify(createProductDto.simpleDescription)
          ),
          detailedDescription: JSON.parse(
            JSON.stringify(createProductDto.detailedDescription)
          ),
          advantageImages: createProductDto.advantageImages || [],
        },
        include: {
          portfolioItems: true,
        },
      })
      .then(this.addImageUrls.bind(this));
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      include: {
        portfolioItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return products.map(this.addImageUrls.bind(this));
  }

  async getCatalog(category?: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const where = category ? { category } : {};

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          portfolioItems: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      products: products.map(this.addImageUrls.bind(this)),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  findOne(id: string) {
    return this.prisma.product
      .findUnique({
        where: { id },
        include: {
          portfolioItems: true,
        },
      })
      .then(this.addImageUrls.bind(this));
  }

  findByCategory(category: string) {
    return this.prisma.product
      .findMany({
        where: { category },
        include: {
          portfolioItems: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      .then((products) => products.map(this.addImageUrls.bind(this)));
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const updateData: any = {};

    if (updateProductDto.category !== undefined)
      updateData.category = updateProductDto.category;
    if (updateProductDto.name !== undefined)
      updateData.name = updateProductDto.name;
    if (updateProductDto.description !== undefined)
      updateData.description = updateProductDto.description;
    if (updateProductDto.importantCharacteristics !== undefined)
      updateData.importantCharacteristics = JSON.parse(
        JSON.stringify(updateProductDto.importantCharacteristics)
      );
    if (updateProductDto.advantages !== undefined)
      updateData.advantages = JSON.parse(
        JSON.stringify(updateProductDto.advantages)
      );
    if (updateProductDto.simpleDescription !== undefined)
      updateData.simpleDescription = JSON.parse(
        JSON.stringify(updateProductDto.simpleDescription)
      );
    if (updateProductDto.detailedDescription !== undefined)
      updateData.detailedDescription = JSON.parse(
        JSON.stringify(updateProductDto.detailedDescription)
      );
    if (updateProductDto.advantageImages !== undefined)
      updateData.advantageImages = updateProductDto.advantageImages;

    return this.prisma.product
      .update({
        where: { id },
        data: updateData,
        include: {
          portfolioItems: true,
        },
      })
      .then(this.addImageUrls.bind(this));
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async connectPortfolioItem(productId: string, portfolioItemId: string) {
    return this.prisma.product
      .update({
        where: { id: productId },
        data: {
          portfolioItems: {
            connect: { id: portfolioItemId },
          },
        },
        include: {
          portfolioItems: true,
        },
      })
      .then(this.addImageUrls.bind(this));
  }

  async disconnectPortfolioItem(productId: string, portfolioItemId: string) {
    return this.prisma.product
      .update({
        where: { id: productId },
        data: {
          portfolioItems: {
            disconnect: { id: portfolioItemId },
          },
        },
        include: {
          portfolioItems: true,
        },
      })
      .then(this.addImageUrls.bind(this));
  }
}
