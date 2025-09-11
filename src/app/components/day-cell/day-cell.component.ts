import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from '../../models/event.model';
import { EventStoreService } from '../../services/event-store.service';
import { Observable } from 'rxjs';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayCellComponent {
  @Input() day!: Date;
  @Input() currentMonth!: number;

  events$!: Observable<CalendarEvent[]>;

  constructor(private eventStore: EventStoreService, private modal: ModalService) {}

  ngOnInit() {
    const iso = this.formatISO(this.day);
    this.events$ = this.eventStore.eventsForDate(iso);
  }

  formatISO(d: Date) {
    return d.toISOString().split('T')[0];
  }

  dayLabel() {
    return this.day.getDate();
  }

  isOtherMonth() {
    return this.day.getMonth() !== this.currentMonth;
  }

  openCreate() {
    this.modal.open({ mode: 'create', date: this.formatISO(this.day) });
  }

  openEventEditor(evt: CalendarEvent, e: MouseEvent) {
    e.stopPropagation();
    this.modal.open({ mode: 'edit', eventId: evt.id });
  }

  categoryColor(cat: string) {
    const map: any = {
      work: '#2563eb',
      personal: '#16a34a',
      holiday: '#db2777',
      other: '#f59e0b'
    };
    return map[cat] || '#6b7280';
  }
}
