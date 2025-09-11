import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { EventStoreService } from '../../services/event-store.service';
import { Subscription } from 'rxjs';
import { CalendarEvent, Category } from '../../models/event.model';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent implements OnDestroy {
  form: FormGroup;
  opened = false;
  mode: 'create' | 'edit' = 'create';
  editingId?: string;
  sub = new Subscription();

  categories: { value: Category; label: string; color: string }[] = [
    { value: 'work', label: 'Work', color: '#2563eb' },
    { value: 'personal', label: 'Personal', color: '#16a34a' },
    { value: 'holiday', label: 'Holiday', color: '#db2777' },
    { value: 'other', label: 'Other', color: '#f59e0b' }
  ];

  constructor(private fb: FormBuilder, private modal: ModalService, private store: EventStoreService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      startTime: [''],
      endTime: [''],
      category: ['other', Validators.required]
    });

    this.sub.add(
      this.modal.modal$.subscribe(payload => {
        if (!payload) {
          this.opened = false;
          this.form.reset();
          return;
        }
        this.opened = true;
        this.mode = payload.mode;
        if (payload.mode === 'create') {
          this.form.patchValue({ date: payload.date });
          this.editingId = undefined;
        } else if (payload.mode === 'edit' && payload.eventId) {
          const ev = this.store.getById(payload.eventId);
          if (ev) {
            this.editingId = ev.id;
            this.form.patchValue(ev);
          }
        }
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save() {
    if (this.form.invalid) return;
    const val = this.form.value;
    if (this.mode === 'create') {
      const ev: CalendarEvent = {
        id: String(Date.now()),
        title: val.title,
        description: val.description,
        date: val.date,
        startTime: val.startTime,
        endTime: val.endTime,
        category: val.category,
        color: this.categories.find(c => c.value === val.category)?.color,
        createdAt: new Date().toISOString()
      };
      this.store.addEvent(ev).subscribe(() => this.modal.close());
    } else if (this.mode === 'edit' && this.editingId) {
      const existing = this.store.getById(this.editingId);
      if (!existing) return;
      const updated: CalendarEvent = { ...existing, ...val, updatedAt: new Date().toISOString() };
      this.store.updateEvent(updated).subscribe(() => this.modal.close());
    }
  }

  delete() {
    if (!this.editingId) return;
    if (confirm('Delete this event?')) {
      this.store.deleteEvent(this.editingId).subscribe(() => this.modal.close());
    }
  }

  close() {
    this.modal.close();
  }
}
