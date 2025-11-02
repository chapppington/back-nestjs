export type AboutFirstScreen = {
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

export type AboutHistoryScreen = {
  brackets_text: string;
  title: string;
  description: string;
  history_events: Array<{
    id: number;
    number: string; // period label, e.g. "2007–2009"
    title: string; // short caption
    employees: number; // headcount for the period
    employeesHasPlus: boolean; // show plus sign after number
    areaM2: number; // production area in square meters
    order: number;
  }>;
};

export type AboutTeamScreen = {
  brackets_text: string;
  title: string;
  description: string;
  cta_text: string;
  cta_button_text: string;
  cta_button_href: string;
  team_members: Array<{
    id: number;
    name: string;
    position: string;
    email?: string;
    image: string;
    order: number;
  }>;
};
