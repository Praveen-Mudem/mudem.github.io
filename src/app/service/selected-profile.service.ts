import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectedProfileService {
  private selectedProfileNameSubject = new BehaviorSubject<string | null>(null);
  selectedProfileName$ = this.selectedProfileNameSubject.asObservable();

  setSelectedProfileName(name: string) {
    this.selectedProfileNameSubject.next(name);
  }
}
