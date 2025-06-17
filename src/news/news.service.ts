import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  create(createNewsDto: CreateNewsDto) {
    return this.prisma.news.create({
      data: createNewsDto,
    });
  }

  findAll() {
    return this.prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findOne(id: string) {
    return this.prisma.news.findUnique({
      where: { id },
    });
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    return this.prisma.news.update({
      where: { id },
      data: updateNewsDto,
    });
  }

  remove(id: string) {
    return this.prisma.news.delete({
      where: { id },
    });
  }
}
