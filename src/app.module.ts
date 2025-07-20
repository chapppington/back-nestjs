import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { NewsModule } from "./news/news.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { VacancyModule } from "./vacancy/vacancy.module";
import { SiteSeoSettingsModule } from "./site-seo-settings/site-seo-settings.module";
import { ProductModule } from "./product/product.module";
import { SiteConfigModule } from "./site-config/site-config.module";
import { NavbarConfigModule } from "./navbar-config/navbar-config.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    NewsModule,
    PortfolioModule,
    VacancyModule,
    SiteSeoSettingsModule,
    ProductModule,
    SiteConfigModule,
    NavbarConfigModule,
  ],
})
export class AppModule {}
