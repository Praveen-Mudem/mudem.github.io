import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-notification-add-edit',
  templateUrl: './notification-add-edit.component.html',
  styleUrls: ['./notification-add-edit.component.scss']
})
export class NotificationAddEditComponent implements OnInit {
  @Input() note: any = {};
  @Input() isEdit: boolean = false;
  @Input() RemainderTypeList: any[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadRemainderTypes();
  }

  loadRemainderTypes() {
    this.notificationService.getNoteInfo(0).subscribe({
      next: (result) => {
        if (result && result.RemainderTypeList) {
          this.RemainderTypeList = result.RemainderTypeList;
        }
      }
    });
  }

  onSubmit() {
    this.save.emit(this.note);
  }

  onCancel() {
    this.cancel.emit();
  }
}
