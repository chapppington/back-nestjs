import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { Subject } from "rxjs";

@Injectable()
export class SiteConfigService {
  private fontFamilySubject = new Subject<{ fontFamily: string }>();
  public fontFamilyStream$ = this.fontFamilySubject.asObservable();

  constructor(private prisma: PrismaService) {}

  async getConfig() {
    // Предполагается, что конфиг всегда один (id = 'global' или первый найденный)
    let config = await this.prisma.siteConfig.findFirst();
    if (!config) {
      // Если нет — создаём дефолтный
      config = await this.prisma.siteConfig.create({
        data: { fontFamily: "Inter" },
      });
    }
    return config;
  }

  async updateFontFamily(fontFamily: string) {
    let config = await this.prisma.siteConfig.findFirst();
    if (!config) {
      config = await this.prisma.siteConfig.create({
        data: { fontFamily },
      });
    } else {
      config = await this.prisma.siteConfig.update({
        where: { id: config.id },
        data: { fontFamily },
      });
    }
    // Notify all SSE subscribers
    this.fontFamilySubject.next({ fontFamily });
    return config;
  }
}
