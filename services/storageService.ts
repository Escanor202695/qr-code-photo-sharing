/**
 * LocalStorage-based persistence service for demo purposes.
 * All data is stored in the browser - perfect for Vercel demo deployment.
 */

import { EventData, MediaItem } from '../types';

const STORAGE_KEYS = {
  EVENTS: 'moments_events',
  MEDIA: 'moments_media',
};

// Default demo events
const DEFAULT_EVENTS: EventData[] = [
  {
    id: 'demo-wedding',
    name: "Sarah & Tom's Wedding",
    date: '2024-06-15',
    hostName: 'Sarah',
    welcomeMessage: 'Welcome to our special day! Please snap and share every magical moment with us. 💕',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  },
  {
    id: 'demo-birthday',
    name: "Emma's 30th Birthday Bash",
    date: '2024-07-20',
    hostName: 'Emma',
    welcomeMessage: "It's my dirty thirty! Help me capture all the fun moments! 🎂🎉",
    coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
  },
];

// Demo media items
const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: 'demo-media-1',
    eventId: 'demo-wedding',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    type: 'image',
    timestamp: Date.now() - 3600000,
    caption: 'The first dance',
    aiDescription: 'Pure romance! ✨',
  },
  {
    id: 'demo-media-2',
    eventId: 'demo-wedding',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    type: 'image',
    timestamp: Date.now() - 7200000,
    caption: 'Cutting the cake',
    aiDescription: 'Sweet celebration!',
  },
  {
    id: 'demo-media-3',
    eventId: 'demo-wedding',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    type: 'image',
    timestamp: Date.now() - 10800000,
    aiDescription: 'Joyful moments!',
  },
  {
    id: 'demo-media-4',
    eventId: 'demo-birthday',
    url: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=80',
    type: 'image',
    timestamp: Date.now() - 1800000,
    aiDescription: 'Party vibes! 🎉',
  },
];

/**
 * Initialize storage with demo data if empty
 */
export const initializeStorage = (): void => {
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(DEFAULT_EVENTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MEDIA)) {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(DEFAULT_MEDIA));
  }
};

/**
 * Get all events from storage
 */
export const getEvents = (): EventData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

/**
 * Get a single event by ID
 */
export const getEventById = (id: string): EventData | null => {
  const events = getEvents();
  return events.find(e => e.id === id) || null;
};

/**
 * Create a new event
 */
export const createEvent = (event: EventData): EventData => {
  const events = getEvents();
  events.push(event);
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  return event;
};

/**
 * Update an existing event
 */
export const updateEvent = (updatedEvent: EventData): EventData => {
  const events = getEvents();
  const index = events.findIndex(e => e.id === updatedEvent.id);
  if (index !== -1) {
    events[index] = updatedEvent;
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }
  return updatedEvent;
};

/**
 * Delete an event and its media
 */
export const deleteEvent = (eventId: string): void => {
  const events = getEvents().filter(e => e.id !== eventId);
  localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  
  // Also delete associated media
  const media = getMedia().filter(m => m.eventId !== eventId);
  localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
};

/**
 * Get all media items
 */
export const getMedia = (): MediaItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MEDIA);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

/**
 * Get media for a specific event
 */
export const getMediaByEventId = (eventId: string): MediaItem[] => {
  return getMedia().filter(m => m.eventId === eventId);
};

/**
 * Add a new media item
 */
export const addMedia = (media: MediaItem): MediaItem => {
  const allMedia = getMedia();
  allMedia.unshift(media); // Add to beginning
  localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(allMedia));
  return media;
};

/**
 * Update a media item (e.g., add AI description)
 */
export const updateMedia = (updatedMedia: MediaItem): MediaItem => {
  const allMedia = getMedia();
  const index = allMedia.findIndex(m => m.id === updatedMedia.id);
  if (index !== -1) {
    allMedia[index] = updatedMedia;
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(allMedia));
  }
  return updatedMedia;
};

/**
 * Delete a media item
 */
export const deleteMedia = (mediaId: string): void => {
  const media = getMedia().filter(m => m.id !== mediaId);
  localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
};

/**
 * Convert file to base64 for storage
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Generate unique event ID
 */
export const generateEventId = (name: string): string => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 20);
  const random = Math.random().toString(36).substring(2, 8);
  return `${slug}-${random}`;
};

/**
 * Get storage usage info (for demo stats)
 */
export const getStorageStats = () => {
  const events = getEvents();
  const media = getMedia();
  const totalSize = new Blob([
    localStorage.getItem(STORAGE_KEYS.EVENTS) || '',
    localStorage.getItem(STORAGE_KEYS.MEDIA) || ''
  ]).size;
  
  return {
    totalEvents: events.length,
    totalMedia: media.length,
    storageUsedMB: (totalSize / 1024 / 1024).toFixed(2),
  };
};

/**
 * Clear all data (reset demo)
 */
export const resetDemo = (): void => {
  localStorage.removeItem(STORAGE_KEYS.EVENTS);
  localStorage.removeItem(STORAGE_KEYS.MEDIA);
  initializeStorage();
};
