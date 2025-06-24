import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ConfirmDialogState {
  message: string;
  visible: boolean;
  resolveFn: ((result: boolean) => void) | null;
}

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private stateSubject = new BehaviorSubject<ConfirmDialogState>({
    message: '',
    visible: false,
    resolveFn: null
  });
  dialogState$ = this.stateSubject.asObservable();

  confirm(message: string): Promise<boolean> {
    return new Promise(resolve => {
      this.stateSubject.next({
        message,
        visible: true,
        resolveFn: (result: boolean) => {
          resolve(result);
          this.stateSubject.next({ message: '', visible: false, resolveFn: null });
        }
      });
    });
  }
}
