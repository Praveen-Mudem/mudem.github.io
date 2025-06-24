import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-info-add-edit',
  templateUrl: './profile-info-add-edit.component.html',
  styleUrls: ['./profile-info-add-edit.component.scss']
})
export class ProfileInfoAddEditComponent {
  @Input() profile: any = {};
  @Input() isEdit: boolean = false;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() { this.save.emit(this.profile); }
  onCancel() { this.cancel.emit(); }
}
