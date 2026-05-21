import { Component } from '@angular/core';
import { ContactData, ContactViewInfo } from 'src/app/model/common.model';
import { CommonService } from 'src/app/service/common.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {

  constructor(public commonSer:CommonService,public toastService: ToastService) {
    commonSer.ContactViewInfo.ContactInfo = new ContactData();   
  }

  sendMail() {
    //console.log(this.commonSer.ContactViewInfo);
    
    
    this.commonSer.savecontactinfo().subscribe({
      next: () => {
        this.toastService.show('Information sent successfully. I will contact you soon.', 'success');        
        this.commonSer.ContactViewInfo = new ContactViewInfo();
      },
      error: () => {
        this.toastService.show('Failed to send information, Please try after sometime.', 'error');
      }
      //console.log(res);
      
    })
  }
}
