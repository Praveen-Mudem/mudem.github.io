import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-add-edit',
  templateUrl: './notification-add-edit.component.html',
  styleUrls: ['./notification-add-edit.component.scss']
})
export class NotificationAddEditComponent {
  @Input() note: any = {};
  @Input() isEdit: boolean = false;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  RemainderTypeList = [
    { Id: 1, Name: 'Day' },
    { Id: 2, Name: 'Week' },
    { Id: 3, Name: 'Month' },
    { Id: 4, Name: 'Year' }
  ];

  onSubmit() {
    this.save.emit(this.note);
  }

  onCancel() {
    this.cancel.emit();
  }
}
