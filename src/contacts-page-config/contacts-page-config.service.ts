import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { UpdateContactsPageConfigDto } from "./dto";

@Injectable()
export class ContactsPageConfigService {
  constructor(private prisma: PrismaService) {}

  async getConfig() {
    let config = await this.prisma.contactsPageConfig.findFirst();
    if (!config) {
      config = await this.prisma.contactsPageConfig.create({
        data: {
          departments: [],
          address: "",
        },
      });
    }
    return config;
  }

  async updateConfig(dto: UpdateContactsPageConfigDto) {
    let config = await this.prisma.contactsPageConfig.findFirst();
    if (!config) {
      config = await this.prisma.contactsPageConfig.create({
        data: {
          departments: [],
          address: "",
        },
      });
    }
    const updated = await this.prisma.contactsPageConfig.update({
      where: { id: config.id },
      data: dto as any,
    });
    return updated;
  }
}
