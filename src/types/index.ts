export interface SocialLink {
  platform: 'instagram' | 'youtube' | 'twitter' | 'github' | 'email';
  url: string;
}

export interface Profile {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  socialLinks: SocialLink[];
}

export type LinkType = 'link' | 'youtube' | 'music';

export interface LinkItem {
  id: string;
  type: LinkType;
  title: string;
  url: string;
  embedUrl?: string;
  icon?: string;
  isActive: boolean;
  order: number;
  clickCount: number;
}

export interface ThemeConfig {
  themeId: 'toss-light' | 'toss-dark' | 'toss-blue' | 'custom';
  backgroundColor: string;
  textColor: string;
  buttonStyle: 'rounded-full' | 'rounded-xl' | 'rounded-lg' | 'outline';
  buttonColor: string;
  buttonTextColor: string;
  fontFamily: string;
}

export interface DailyStat {
  date: string; // YYYY-MM-DD
  views: number;
  clicks: number;
}

export interface AnalyticsData {
  totalViews: number;
  dailyStats: DailyStat[];
}
