export type Category = 'work' | 'personal' | 'holiday' | 'other';

export interface CalendarEvent {
  id: string; // unique ID
  title: string;
  description?: string;
  date: string; // ISO date YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string; // HH:mm
  category: Category;
  color?: string;
  createdAt: string;
  updatedAt?: string;
}
