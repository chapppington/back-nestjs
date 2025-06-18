import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreatePortfolioItemDto } from "./dto/create-portfolio-item.dto";
import { UpdatePortfolioItemDto } from "./dto/update-portfolio-item.dto";

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  private addImageUrls(item: any) {
    if (item.poster) {
      item.posterUrl = `/uploads/portfolio/${item.poster}`;
    }
    if (item.solutionImage) {
      item.solutionImageUrl = `/uploads/portfolio/${item.solutionImage}`;
    }
    if (item.reviewImage) {
      item.reviewImageUrl = `/uploads/portfolio/${item.reviewImage}`;
    }
    return item;
  }

  create(createPortfolioItemDto: CreatePortfolioItemDto) {
    return this.prisma.portfolioItem
      .create({
        data: createPortfolioItemDto,
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

  update(id: string, updatePortfolioItemDto: UpdatePortfolioItemDto) {
    return this.prisma.portfolioItem
      .update({
        where: { id },
        data: updatePortfolioItemDto,
      })
      .then(this.addImageUrls.bind(this));
  }

  remove(id: string) {
    return this.prisma.portfolioItem.delete({
      where: { id },
    });
  }
}
