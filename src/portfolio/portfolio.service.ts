import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreatePortfolioItemDto } from "./dto/create-portfolio-item.dto";
import { UpdatePortfolioItemDto } from "./dto/update-portfolio-item.dto";
import { generateSlug } from "src/utils/transliteration";

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  private addImageUrls(item: any) {
    if (item.poster) {
      item.posterUrl = `/uploads/portfolio/${item.poster}`;
    }
    if (item.solutionImages && item.solutionImages.length > 0) {
      item.solutionImageUrls = item.solutionImages.map(
        (image: string) => `/uploads/portfolio/${image}`
      );
    }
    if (item.reviewImage) {
      item.reviewImageUrl = `/uploads/portfolio/${item.reviewImage}`;
    }
    if (item.previewVideoPath) {
      item.previewVideoUrl = `/uploads/portfolio/${item.previewVideoPath}`;
    }
    if (item.fullVideoPath) {
      item.fullVideoUrl = `/uploads/portfolio/${item.fullVideoPath}`;
    }
    return item;
  }

  create(createPortfolioItemDto: CreatePortfolioItemDto) {
    const data = {
      ...createPortfolioItemDto,
      year: parseInt(createPortfolioItemDto.year.toString()),
      slug: generateSlug(createPortfolioItemDto.name),
    };
    return this.prisma.portfolioItem
      .create({
        data,
      })
      .then(this.addImageUrls.bind(this));
  }

  async findAll() {
    const items = await this.prisma.portfolioItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return items.map(this.addImageUrls.bind(this));
  }

  findOne(id: string) {
    return this.prisma.portfolioItem
      .findUnique({
        where: { id },
      })
      .then(this.addImageUrls.bind(this));
  }

  findBySlug(slug: string) {
    return this.prisma.portfolioItem
      .findUnique({
        where: { slug },
      })
      .then(this.addImageUrls.bind(this));
  }

  update(id: string, updatePortfolioItemDto: UpdatePortfolioItemDto) {
    const data = {
      ...updatePortfolioItemDto,
      year: updatePortfolioItemDto.year
        ? parseInt(updatePortfolioItemDto.year.toString())
        : undefined,
    };

    if (updatePortfolioItemDto.name) {
      data.slug = generateSlug(updatePortfolioItemDto.name);
    }

    return this.prisma.portfolioItem
      .update({
        where: { id },
        data,
      })
      .then(this.addImageUrls.bind(this));
  }

  remove(id: string) {
    return this.prisma.portfolioItem.delete({
      where: { id },
    });
  }
}
