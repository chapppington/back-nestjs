import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { NewsModule } from "./news/news.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { VacancyModule } from "./vacancy/vacancy.module";

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
  ],
})
export class AppModule {}
