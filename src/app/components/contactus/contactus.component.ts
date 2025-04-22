import { Component } from '@angular/core';
import { ContactData } from 'src/app/model/common.model';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {

  constructor(public commonSer:CommonService) {
    commonSer.ContactViewInfo.ContactInfo = new ContactData();   
  }

  sendMail() {
    console.log(this.commonSer.ContactViewInfo);
    
    
    this.commonSer.savecontactinfo().subscribe((res:any)=>{
      console.log(res);
      
    })
  }
}
