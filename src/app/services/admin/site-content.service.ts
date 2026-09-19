import { Injectable } from '@angular/core';
import { ANNOUNCEMENTS, CALENDAR_EVENTS, NEWS } from '../../data';
import { CalendarEvent, NewsItem } from '../../models';

export interface SiteContentState {
  announcements: string[];
  news: NewsItem[];
  events: CalendarEvent[];
  live: {
    isLive: boolean;
    channelUrl: string;
  };
}

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  private readonly storageKey = 'ubs-site-content-v1';

  private readonly defaultState: SiteContentState = {
    announcements: ANNOUNCEMENTS,
    news: NEWS,
    events: CALENDAR_EVENTS,
    live: {
      isLive: false,
      channelUrl: 'https://youtube.com/@unionbsmedia?si=zYmglMFw-xPmCV4t',
    },
  };

  private readState(): SiteContentState {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return this.defaultState;

      return {
        ...this.defaultState,
        ...JSON.parse(raw),
        live: { ...this.defaultState.live, ...(JSON.parse(raw)?.live ?? {}) },
      };
    } catch {
      return this.defaultState;
    }
  }

  private saveState(state: SiteContentState): void {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  getAnnouncements(): string[] {
    return [...this.readState().announcements];
  }

  setAnnouncements(items: string[]): void {
    const state = this.readState();
    state.announcements = items;
    this.saveState(state);
  }

  addAnnouncement(item: string): void {
    const trimmed = item.trim();
    if (!trimmed) return;
    const state = this.readState();
    state.announcements = [trimmed, ...state.announcements];
    this.saveState(state);
  }

  removeAnnouncement(index: number): void {
    const state = this.readState();
    state.announcements = state.announcements.filter((_, i) => i !== index);
    this.saveState(state);
  }

  getNews(): NewsItem[] {
    return [...this.readState().news];
  }

  setNews(items: NewsItem[]): void {
    const state = this.readState();
    state.news = items;
    this.saveState(state);
  }

  addNews(item: NewsItem): void {
    const title = item.title.trim();
    const excerpt = item.excerpt.trim();
    if (!title || !excerpt) return;
    const state = this.readState();
    state.news = [{ title, excerpt }, ...state.news];
    this.saveState(state);
  }

  removeNews(index: number): void {
    const state = this.readState();
    state.news = state.news.filter((_, i) => i !== index);
    this.saveState(state);
  }

  getEvents(): CalendarEvent[] {
    return [...this.readState().events];
  }

  setEvents(items: CalendarEvent[]): void {
    const state = this.readState();
    state.events = items;
    this.saveState(state);
  }

  addEvent(item: CalendarEvent): void {
    const title = item.title.trim();
    const description = item.description.trim();
    const date = item.date.trim();
    if (!title || !description || !date) return;
    const state = this.readState();
    state.events = [{ date, title, description }, ...state.events];
    this.saveState(state);
  }

  removeEvent(index: number): void {
    const state = this.readState();
    state.events = state.events.filter((_, i) => i !== index);
    this.saveState(state);
  }

  getLiveStatus(): { isLive: boolean; channelUrl: string } {
    return { ...this.readState().live };
  }

  setLiveStatus(isLive: boolean, channelUrl: string): void {
    const state = this.readState();
    state.live = { isLive, channelUrl };
    this.saveState(state);
  }
}
