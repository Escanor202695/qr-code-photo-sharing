export interface MediaItem {
  id: string;
  eventId: string;
  url: string;
  type: 'image' | 'video';
  timestamp: number;
  caption?: string;
  aiDescription?: string;
  uploaderName?: string;
}

export interface EventData {
  id: string;
  name: string;
  date: string;
  hostName: string;
  coverImage?: string;
  welcomeMessage?: string;
  isActive?: boolean;
  createdAt?: number;
}

export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  EVENT_ADMIN = 'EVENT_ADMIN',
  PUBLIC_UPLOAD = 'PUBLIC_UPLOAD',
}
