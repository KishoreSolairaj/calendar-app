// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // optional if you use routing
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DayCellComponent } from './components/day-cell/day-cell.component';
import { EventModalComponent } from './components/event-modal/event-modal.component';

// Import your components here after generating them
// Example:

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayCellComponent,
    EventModalComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])  // empty routes if you have none yet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
