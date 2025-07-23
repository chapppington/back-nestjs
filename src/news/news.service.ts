import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { generateSlug } from "src/utils/transliteration";

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  private addImageUrl(news: any) {
    if (news.image) {
      news.imageUrl = `/uploads/news/${news.image}`;
    }
    return news;
  }

  private calculateReadingTime(content: string): number {
    // Average reading speed: 200-250 words per minute
    const wordsPerMinute = 225;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(1, readingTime); // Minimum reading time is 1 minute
  }

  create(createNewsDto: CreateNewsDto) {
    const readingTime = this.calculateReadingTime(createNewsDto.content);
    const slug = generateSlug(createNewsDto.title);

    // Parse date if provided
    let date: Date | undefined = undefined;
    if (createNewsDto.date) {
      date = new Date(createNewsDto.date);
    }

    return this.prisma.news
      .create({
        data: {
          ...createNewsDto,
          readingTime,
          slug,
          date,
        },
      })
      .then(this.addImageUrl.bind(this));
  }

  async findAll() {
    const news = await this.prisma.news.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return news.map(this.addImageUrl.bind(this));
  }

  findOne(id: string) {
    return this.prisma.news
      .findUnique({
        where: { id },
      })
      .then(this.addImageUrl.bind(this));
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    const data = { ...updateNewsDto };
    if (updateNewsDto.content) {
      data.readingTime = this.calculateReadingTime(updateNewsDto.content);
    }
    if (updateNewsDto.title) {
      data.slug = generateSlug(updateNewsDto.title);
    }
    // Parse date if provided
    if (updateNewsDto.date) {
      data.date = new Date(updateNewsDto.date).toISOString();
    }

    return this.prisma.news
      .update({
        where: { id },
        data,
      })
      .then(this.addImageUrl.bind(this));
  }

  remove(id: string) {
    return this.prisma.news.delete({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.news
      .findUnique({
        where: { slug },
      })
      .then(this.addImageUrl.bind(this));
  }
}
