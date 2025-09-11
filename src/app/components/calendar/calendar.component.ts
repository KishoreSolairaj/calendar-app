import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventStoreService } from '../../services/event-store.service';
import { CalendarEvent } from '../../models/event.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  currentDate$ = new BehaviorSubject<Date>(new Date());
  weeks: Date[][] = [];
  events$ = this.eventStore.events$;
  loading$ = this.eventStore.loading$;

  constructor(private eventStore: EventStoreService) {
    this.currentDate$.subscribe(d => this.buildCalendar(d));
  }

  private buildCalendar(date: Date) {
    this.weeks = [];
    const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Monday start
    const startDate = new Date(monthStart);
    while (startDate.getDay() !== 1) startDate.setDate(startDate.getDate() - 1);

    // Sunday end
    const endDate = new Date(monthEnd);
    while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);

    let curr = new Date(startDate);
    while (curr <= endDate) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(curr));
        curr.setDate(curr.getDate() + 1);
      }
      this.weeks.push(week);
    }
  }

  prevMonth() {
    const d = this.currentDate$.value;
    this.currentDate$.next(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth() {
    const d = this.currentDate$.value;
    this.currentDate$.next(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  trackByWeek(_: number, week: Date[]) {
    return week[0].toISOString();
  }

  formatMonth(date: Date) {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}
