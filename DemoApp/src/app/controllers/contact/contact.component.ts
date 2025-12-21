import { Component, OnInit } from '@angular/core';
import { IDeactivateComponent } from 'src/app/Guard/can-deactivate.guard';
import { CommonService } from 'src/app/services/common.service';
import { map } from 'rxjs/operators';
import { Contacts } from 'src/app/modules/contacts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, IDeactivateComponent {

  constructor(private commonService: CommonService) { }
  user_id;
  first_name;
  last_name;
  email;
  phone;
  coments;
  comments_on;
  Allcontacts: Contacts[] = [];
  ngOnInit(): void {
    this.getRequest();
  }
  canExit() {
    if (this.first_name || this.last_name || this.email || this.phone || this.coments) {
      return confirm(`You have unsaved changes. Do you really want to discard these change?`);
    } else {
      return true;
    }
  }
  //onSubmit(contact:{firstname:string,lastName: string,email: string,phoneno: number,message: string;}) {
  onSubmit(contact: Contacts[]) {
    console.log(contact);
    
    this.Allcontacts=Object.values(contact);
    // this.Allcontacts=contact;
    console.log("1 >> " + JSON.stringify(this.Allcontacts));
    // this.Allcontacts.map(c=>{
    //   c.first_name=this.first_name,
    //   c.last_name==this.last_name,
    //   c.email=this.email,
    //   c.phone=this.phone,
    //   c.coments=this.coments,
    //   c.user_id=localStorage.getItem('userid')==null?'':localStorage.getItem('userid');
    //   c.comments_on= new Date();
    // });
    this.postRequest(this.Allcontacts);
  }
  postRequest(contact: any) {
    debugger;

    console.log("PostRequest() > " + JSON.stringify(contact));
    this.commonService.postRequest(contact).subscribe((result) => {
      console.log(`postRequest() ${JSON.stringify(result)}`);
    });
  }
  getRequest() {
    this.commonService.getRequest('https://anguar-nodejs.onrender.com/api/feedback')
      // .pipe(map((res: { [key: string]: Contacts }) => {
      //   const contacts = [];
      //   for (const key in res) {
      //     if (res.hasOwnProperty(key)) {
      //       contacts.push({ ...res[key], id: key })
      //     }
      //   }
      //   return contacts;
      // }))
      .subscribe((contacts) => {
        console.log(`getRequest() ${JSON.parse(contacts)}`);
        this.Allcontacts = contacts;
      });
  }
}
