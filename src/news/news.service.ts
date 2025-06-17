import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  private addImageUrl(news: any) {
    if (news.image) {
      news.imageUrl = `/uploads/news/${news.image}`;
    }
    return news;
  }

  create(createNewsDto: CreateNewsDto) {
    return this.prisma.news
      .create({
        data: createNewsDto,
      })
      .then(this.addImageUrl.bind(this));
  }

  findAll() {
    return this.prisma.news
      .findMany({
        orderBy: {
          createdAt: "desc",
        },
      })
      .then((news) => news.map(this.addImageUrl.bind(this)));
  }

  findOne(id: string) {
    return this.prisma.news
      .findUnique({
        where: { id },
      })
      .then(this.addImageUrl.bind(this));
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    return this.prisma.news
      .update({
        where: { id },
        data: updateNewsDto,
      })
      .then(this.addImageUrl.bind(this));
  }

  remove(id: string) {
    return this.prisma.news.delete({
      where: { id },
    });
  }
}
