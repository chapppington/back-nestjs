import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ImportProductDto } from "./dto/import-product.dto";
import { generateSlug } from "src/utils/transliteration";
import { UpdateProductOrderDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  private addFullUrls(product: any) {
    if (product.previewImage) {
      product.previewImageUrl = `/uploads/products/${product.previewImage}`;
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
      orderBy: [
        {
          order: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
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
        orderBy: [
          {
            order: "asc",
          },
          {
            createdAt: "desc",
          },
        ],
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

    // Сохраняем индексы для удаления перед очисткой data
    const clearAdvantageImageIndexes =
      updateProductDto.clearAdvantageImageIndex;

    // Обработка флагов удаления
    if (updateProductDto.clearPreviewImage) {
      updateData.previewImage = null;
    }
    if (updateProductDto.clearModel3d) {
      updateData.model_3d_url = null;
    }

    // Удаляем флаги удаления из данных перед сохранением
    delete updateData.clearPreviewImage;
    delete updateData.clearAdvantageImageIndex;
    delete updateData.clearModel3d;

    // Обработка удаления изображений преимуществ
    if (clearAdvantageImageIndexes && clearAdvantageImageIndexes.length > 0) {
      // Получаем текущие преимущества и удаляем указанные изображения
      return this.prisma.product
        .findUnique({ where: { id } })
        .then((item) => {
          if (!item) return null;

          const currentAdvantages =
            typeof item.advantages === "string"
              ? JSON.parse(item.advantages)
              : item.advantages || [];

          const newAdvantages = currentAdvantages.map(
            (advantage: any, index: number) => {
              if (clearAdvantageImageIndexes.includes(index)) {
                return { ...advantage, image: null };
              }
              return advantage;
            }
          );

          updateData.advantages = newAdvantages;

          return this.prisma.product.update({
            where: { id },
            data: updateData,
            include: {
              portfolioItems: true,
            },
          });
        })
        .then((result) => (result ? this.addFullUrls(result) : null));
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

  async importFromExcel(products: ImportProductDto[]) {
    const createdProducts = [];
    const updatedProducts = [];
    const errors = [];

    for (const productDto of products) {
      try {
        // Исключаем portfolioItems из импорта, чтобы не сбрасывать привязанные проекты
        const { portfolioItems, ...restDto } = productDto as any;

        // Если есть id — ищем по id, иначе создаём новый
        let existingProduct = null;
        if (productDto.id) {
          existingProduct = await this.prisma.product.findUnique({
            where: { id: productDto.id },
          });
        }

        if (existingProduct) {
          // Обновляем существующий товар, НЕ трогая portfolioItems и иконки
          const { portfolioItems, ...updateData } = restDto;

          if (productDto.name) {
            updateData.slug = generateSlug(productDto.name);
          }

          // Явно исключаем portfolioItems из данных обновления
          const { portfolioItems: _, ...cleanUpdateData } = updateData;

          // Сохраняем существующие иконки из преимуществ
          let existingAdvantages: any[] = [];
          if (existingProduct.advantages) {
            if (typeof existingProduct.advantages === "string") {
              existingAdvantages = JSON.parse(existingProduct.advantages);
            } else if (Array.isArray(existingProduct.advantages)) {
              existingAdvantages = existingProduct.advantages;
            }
          }

          const updatedAdvantages = productDto.advantages.map(
            (newAdvantage, index) => {
              const existingAdvantage = existingAdvantages[index];
              const preservedIcon =
                newAdvantage.icon && newAdvantage.icon.trim() !== ""
                  ? newAdvantage.icon
                  : existingAdvantage?.icon || "";
              const preservedImage =
                newAdvantage.image && newAdvantage.image.trim() !== ""
                  ? newAdvantage.image
                  : existingAdvantage?.image || "";
              return {
                ...newAdvantage,
                icon: preservedIcon,
                image: preservedImage,
              };
            }
          );

          const updatedProduct = await this.prisma.product.update({
            where: { id: existingProduct.id },
            data: {
              ...cleanUpdateData,
              importantCharacteristics: productDto.importantCharacteristics,
              advantages: updatedAdvantages,
              simpleDescription: productDto.simpleDescription,
              detailedDescription: productDto.detailedDescription,
            },
            include: {
              portfolioItems: true,
            },
          });

          updatedProducts.push(this.addFullUrls(updatedProduct));
        } else {
          // Создаем новый товар БЕЗ привязки к проектам
          const product = await this.prisma.product.create({
            data: {
              ...restDto,
              slug: productDto.slug || generateSlug(productDto.name),
              importantCharacteristics: productDto.importantCharacteristics,
              advantages: productDto.advantages,
              simpleDescription: productDto.simpleDescription,
              detailedDescription: productDto.detailedDescription,
            },
            include: {
              portfolioItems: true,
            },
          });

          createdProducts.push(this.addFullUrls(product));
        }
      } catch (error) {
        console.error(`Error processing product ${productDto.name}:`, error);
        errors.push(
          `Ошибка при обработке товара "${productDto.name}": ${error.message}`
        );
      }
    }

    if (errors.length > 0) {
      throw new Error(`Ошибки при импорте:\n${errors.join("\n")}`);
    }

    return {
      message: `Успешно импортировано ${createdProducts.length} новых товаров и обновлено ${updatedProducts.length} существующих товаров`,
      products: [...createdProducts, ...updatedProducts],
      created: createdProducts.length,
      updated: updatedProducts.length,
    };
  }

  async updateOrder(dto: UpdateProductOrderDto[]) {
    // Обновляем порядок товаров в транзакции
    await this.prisma.$transaction(
      dto.map((item) =>
        this.prisma.product.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );
    return { success: true };
  }
}
