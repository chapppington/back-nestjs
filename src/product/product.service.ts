import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { generateSlug } from "src/utils/transliteration";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  private addFullUrls(product: any) {
    if (product.previewImage) {
      product.previewImageUrl = `/uploads/products/${product.previewImage}`;
    }
    if (product.advantageImages && product.advantageImages.length > 0) {
      product.advantageImageUrls = product.advantageImages.map(
        (image: string) => `/uploads/products/${image}`
      );
    }
    if (product.model_3d_url) {
      product.model_3d_url = `/uploads/products/${product.model_3d_url}`;
    }
    return product;
  }

  create(createProductDto: CreateProductDto) {
    const { portfolioItems, ...restDto } = createProductDto as any;

    return this.prisma.product
      .create({
        data: {
          ...restDto,
          slug: createProductDto.slug || generateSlug(createProductDto.name),
          importantCharacteristics: JSON.parse(
            createProductDto.importantCharacteristics as any
          ),
          advantages: JSON.parse(createProductDto.advantages as any),
          simpleDescription: JSON.parse(
            createProductDto.simpleDescription as any
          ),
          detailedDescription: JSON.parse(
            createProductDto.detailedDescription as any
          ),
          advantageImages: createProductDto.advantageImages || [],
          portfolioItems: {
            connect: JSON.parse(portfolioItems || "[]").map((id: string) => ({
              id,
            })),
          },
        },
        include: {
          portfolioItems: true,
        },
      })
      .then(this.addFullUrls.bind(this));
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
    return products.map(this.addFullUrls.bind(this));
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
      products: products.map(this.addFullUrls.bind(this)),
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
      .then(this.addFullUrls.bind(this));
  }

  findBySlug(slug: string) {
    return this.prisma.product
      .findUnique({
        where: { slug },
        include: {
          portfolioItems: true,
        },
      })
      .then(this.addFullUrls.bind(this));
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
      .then((products) => products.map(this.addFullUrls.bind(this)));
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const { portfolioItems, ...restDto } = updateProductDto as any;
    const updateData: any = { ...restDto };

    if (updateProductDto.name) {
      updateData.slug = generateSlug(updateProductDto.name);
    }

    if (updateProductDto.importantCharacteristics)
      updateData.importantCharacteristics = JSON.parse(
        updateProductDto.importantCharacteristics as any
      );
    if (updateProductDto.advantages)
      updateData.advantages = JSON.parse(updateProductDto.advantages as any);
    if (updateProductDto.simpleDescription)
      updateData.simpleDescription = JSON.parse(
        updateProductDto.simpleDescription as any
      );
    if (updateProductDto.detailedDescription)
      updateData.detailedDescription = JSON.parse(
        updateProductDto.detailedDescription as any
      );

    if (portfolioItems) {
      updateData.portfolioItems = {
        set: JSON.parse(portfolioItems as any).map((id: string) => ({ id })),
      };
    }

    return this.prisma.product
      .update({
        where: { id },
        data: updateData,
        include: {
          portfolioItems: true,
        },
      })
      .then(this.addFullUrls.bind(this));
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
      .then(this.addFullUrls.bind(this));
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
      .then(this.addFullUrls.bind(this));
  }
}
