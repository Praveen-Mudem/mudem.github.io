import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from './notification.component';
import { NotificationAddEditComponent } from './notification-add-edit/notification-add-edit.component';
import { NotificationRoutingModule } from './notification-add-edit/notification-routing.module';

@NgModule({
  declarations: [
    NotificationComponent,
    NotificationAddEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NotificationRoutingModule
  ]
})
export class NotificationModule {}
