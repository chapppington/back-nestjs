import { AuthDto } from "@/auth/dto/auth.dto";
import { Injectable } from "@nestjs/common";
import type { User } from "@prisma/client";
import { hash } from "argon2";

import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        name: true,
        email: true,
        id: true,
        password: false,
      },
    });
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(dto: AuthDto) {
    return this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password),
      },
    });
  }

  async update(id: string, data: Partial<User>) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }
}
