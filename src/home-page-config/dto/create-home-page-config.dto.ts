import { IsString, IsOptional, IsObject, IsArray } from "class-validator";

export class CreateHomePageConfigDto {
  @IsObject()
  firstScreen: {
    title: string;
    subtitle: string;
    main_button_text: string;
    stats: Array<{
      value: string;
      description: string;
      showOnMobile: boolean;
    }>;
  };

  @IsString()
  rotatingText: string;

  @IsObject()
  missionScreen: {
    mission_title: string;
    mission_text: string;
    button_text: string;
  };

  @IsObject()
  productsScreen: {
    button_text: string;
    products: Array<{
      title: string;
      image: string;
      description: string;
      slug: string;
    }>;
  };

  @IsObject()
  reviewsScreen: {
    title: string;
    subtitle: string;
    reviews: Array<{
      image: string;
      title: string;
      jobTitle: string;
      content_path: string;
    }>;
  };
}
