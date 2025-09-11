import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, delay, catchError } from 'rxjs/operators';
import { CalendarEvent } from '../models/event.model';

const STORAGE_KEY = 'calendar_app_events_v1';

@Injectable({ providedIn: 'root' })
export class EventStoreService {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _events$ = new BehaviorSubject<CalendarEvent[]>(this.loadFromStorage());

  readonly events$ = this._events$.asObservable();
  readonly loading$ = this._loading$.asObservable();

  private loadFromStorage(): CalendarEvent[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CalendarEvent[]) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(events: CalendarEvent[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (err) {
      console.error('Save failed', err);
    }
  }

  private withLoading<T>(obs: Observable<T>): Observable<T> {
    this._loading$.next(true);
    return obs.pipe(
      delay(150),
      tap(() => this._loading$.next(false)),
      catchError(err => {
        this._loading$.next(false);
        console.error(err);
        return of(null as unknown as T);
      })
    );
  }

  addEvent(event: CalendarEvent): Observable<CalendarEvent> {
    const events = [...this._events$.value, event];
    this._events$.next(events);
    this.saveToStorage(events);
    return this.withLoading(of(event));
  }

  updateEvent(updated: CalendarEvent): Observable<CalendarEvent | null> {
    const idx = this._events$.value.findIndex(e => e.id === updated.id);
    if (idx === -1) return this.withLoading(of(null));
    const events = [...this._events$.value];
    events[idx] = { ...updated, updatedAt: new Date().toISOString() };
    this._events$.next(events);
    this.saveToStorage(events);
    return this.withLoading(of(events[idx]));
  }

  deleteEvent(id: string): Observable<boolean> {
    const events = this._events$.value.filter(e => e.id !== id);
    this._events$.next(events);
    this.saveToStorage(events);
    return this.withLoading(of(true));
  }

  eventsForDate(dateISO: string): Observable<CalendarEvent[]> {
    return this.events$.pipe(map(list => list.filter(e => e.date === dateISO)));
  }

  getById(id: string) {
    return this._events$.value.find(e => e.id === id);
  }
}
