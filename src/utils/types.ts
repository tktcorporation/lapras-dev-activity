export interface TimelineItem {
  type: 'article' | 'reply' | 'slide' | 'event' | 'github';
  title: string;
  url: string;
  date: Date;
  source?: string;
  tags?: string[];
  isBestAnswer?: boolean;
  repository?: {
    name: string;
    url: string;
  };
}

export interface Repository {
  name: string;
  url: string;
  activities: TimelineItem[];
}

export interface TimeGroup {
  date: Date;
  items: TimelineItem[];
}