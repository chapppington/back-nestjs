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
import { FooterConfigModule } from "./footer-config/footer-config.module";
import { HomePageConfigModule } from "./home-page-config/home-page-config.module";
import { ProductionPageConfigModule } from "./production-page-config/production-page-config.module";
import { VacanciesPageConfigModule } from "./vacancies-page-config/vacancies-page-config.module";
import { CertificatesPageConfigModule } from "./certificates-page-config/certificates-page-config.module";
import { ContactsPageConfigModule } from "./contacts-page-config/contacts-page-config.module";
import { SubmissionsModule } from "./submissions/submissions.module";

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
    FooterConfigModule,
    HomePageConfigModule,
    ProductionPageConfigModule,
    VacanciesPageConfigModule,
    CertificatesPageConfigModule,
    ContactsPageConfigModule,
    SubmissionsModule,
  ],
})
export class AppModule {}
