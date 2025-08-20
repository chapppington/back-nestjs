export type VacanciesFirstScreen = {
  bg_image: string;
  title: string;
  subtitle: string;
  stats: Array<{
    value: string;
    description: string;
    showOnMobile: boolean;
  }>;
};

export type VacanciesSecondScreen = {
  title: string;
  subtitle: string;
};

export type VacanciesThirdScreen = {
  title: string;
  subtitle: string;
  values: Array<{
    title: string;
    subtitle: string;
    icon_path: string;
  }>;
};

export type VacanciesFourthScreen = {
  title: string;
  subtitle: string;
  subtitle_icon: string;
  advantages: Array<{
    icon: string;
    text: string;
  }>;
};

export type VacanciesFifthScreen = {
  title: string;
  subtitle: string;
  reviews: Array<{
    name: string;
    position: string;
    image: string;
    text: string;
    shortText: string;
  }>;
};

export type VacanciesSixthScreen = {
  title: string;
  subtitle: string;
  answers: Array<{
    title: string;
    content: string;
    list?: string[];
  }>;
};
