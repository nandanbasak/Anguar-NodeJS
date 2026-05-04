import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getMenuItems(){
    return this.http.get('http://localhost:8080/api/menuItems/');  
  }
  CreateMenuItems(menuItems:MenuItems){
    return this.http.post('https://angularapp-95b07-default-rtdb.firebaseio.com/MenuItems.json',menuItems);
  }
  postRequest( data:any):Observable<any>{
    console.log(`CommonService Contact() : ${JSON.stringify(data)}`)
    return this.http.post(' https://anguar-nodejs.onrender.com/api/feedback/add',data);   
    //return this.http.post('https://angularapp-95b07-default-rtdb.firebaseio.com/contact.json',data);
  }  
  getRequest(url:string):Observable<any>{
    return this.http.get(url);
  }
}

export class MenuItems{
    menu_code!: number;
    menu_name!: string;
    created_on!: Date;
    created_by!: string;
    updated_on!: Date;
    owner_code!: number;
    status!: string;
    description!: string;
}