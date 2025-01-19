import { Component, OnInit } from '@angular/core';
import { IDeactivateComponent } from 'src/app/Guard/can-deactivate.guard';
import { CommonService } from 'src/app/services/common.service';
import { map } from 'rxjs/operators';
import { Contacts } from 'src/app/modules/contacts';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, IDeactivateComponent {

  constructor(private commonService: CommonService) { }
  firstname;
  lastname;
  email;
  phoneno;
  message;
  contactDtls;
  Allcontacts: Contacts[] = [];
  ngOnInit(): void {
    this.getRequest();
  }
  canExit() {
    if (this.firstname || this.lastname || this.email || this.phoneno || this.message) {
      return confirm(`You have unsaved changes. Do you really want to discard these change?`);
    } else {
      return true;
    }
  }
  onSubmit(contact:{firstname:string,firstName: string,lastName: string,email: string,phoneno: number,message: string;}) {
    console.log(contact);
    this.Allcontacts=Object.assign(contact);
    console.log("1 >> " + JSON.stringify(this.Allcontacts));
    this.postRequest(contact);
  }
postRequest(contact:any){  
  this.commonService.postRequest( contact).subscribe((result)=>{
    console.log(`postRequest() ${JSON.stringify(result)}`);
  });
}
getRequest(){
  this.commonService.getRequest('https://angularapp-95b07-default-rtdb.firebaseio.com/contact.json')
  .pipe(map((res:{[key:string]:Contacts})=>{
    const contacts=[];
    for(const key in res){
      if(res.hasOwnProperty(key)){
        contacts.push({...res[key], id:key})
      }
    }
    return contacts;
  }))
  .subscribe((contacts)=>{   
    console.log(`getRequest() ${JSON.stringify(contacts)}`);
    this.Allcontacts=contacts;
  });
}
}
