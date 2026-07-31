export interface CalendarEvent {
  date: string; // yyyy-mm-dd
  title: string;
  description: string;
}

export interface CalendarCell {
  date: number | null;
  iso: string;
  hasEvent: boolean;
}
