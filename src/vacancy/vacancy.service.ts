import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateVacancyDto } from "./dto/create-vacancy.dto";
import { UpdateVacancyDto } from "./dto/update-vacancy.dto";

@Injectable()
export class VacancyService {
  constructor(private prisma: PrismaService) {}

  create(createVacancyDto: CreateVacancyDto) {
    return this.prisma.vacancy.create({
      data: createVacancyDto,
    });
  }

  findAll() {
    return this.prisma.vacancy.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  findOne(id: string) {
    return this.prisma.vacancy.findUnique({
      where: { id },
    });
  }

  update(id: string, updateVacancyDto: UpdateVacancyDto) {
    return this.prisma.vacancy.update({
      where: { id },
      data: updateVacancyDto,
    });
  }

  remove(id: string) {
    return this.prisma.vacancy.delete({
      where: { id },
    });
  }
}
