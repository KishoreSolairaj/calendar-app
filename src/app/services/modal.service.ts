import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ModalPayload = { mode: 'create' | 'edit'; date?: string; eventId?: string } | null;

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _modal$ = new BehaviorSubject<ModalPayload>(null);
  readonly modal$ = this._modal$.asObservable();

  open(payload: ModalPayload) {
    this._modal$.next(payload);
  }

  close() {
    this._modal$.next(null);
  }
}
