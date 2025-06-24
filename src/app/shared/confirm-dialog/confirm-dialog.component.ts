import { Component } from '@angular/core';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div *ngIf="visible" class="modal-backdrop show"></div>
    <div *ngIf="visible" class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm</h5>
          </div>
          <div class="modal-body">
            <p>{{ message || 'Are you sure you want to proceed?' }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-danger" (click)="confirm()">OK</button>
            <button class="btn btn-secondary" (click)="cancel()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`.modal-backdrop { z-index: 1050; } .modal { z-index: 1060; }`]
})
export class ConfirmDialogComponent {
  message = '';
  visible = false;
  private resolveFn: ((result: boolean) => void) | null = null;

  constructor(private confirmService: ConfirmDialogService) {
    this.confirmService.dialogState$.subscribe(state => {
      this.message = state.message;
      this.visible = state.visible;
      this.resolveFn = state.resolveFn;
    });
  }

  confirm() {
    if (this.resolveFn) this.resolveFn(true);
    this.visible = false;
  }
  cancel() {
    if (this.resolveFn) this.resolveFn(false);
    this.visible = false;
  }
}
