import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastr: ToastrService) {}

  show(message: string, type: 'success' | 'error' = 'success') {
    if (type === 'success') {
      this.toastr.success(message);
    } else {
      this.toastr.error(message);
    }
  }
}
