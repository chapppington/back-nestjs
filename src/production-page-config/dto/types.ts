export type ProductionFirstScreen = {
  bg_image: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_href: string;
  stats: Array<{
    value: string;
    description: string;
    showOnMobile: boolean;
  }>;
};

export type ProductionSecondScreen = {
  title: string;
  subtitle: string;
  stages: Array<{
    id: number;
    number: string;
    title: string;
    description: string;
    image: string;
  }>;
};

export type ProductionThirdScreen = {
  title: string;
  subtitle: string;
  equipment: Array<{
    id: number;
    title: string;
    subtitle: string;
    image: string;
    order: number;
  }>;
};

export type ProductionFourthScreen = {
  items: Array<{
    title: string;
    content: string;
    documents: Array<{
      title: string;
      link: string; // stored filename
    }>;
  }>;
};





