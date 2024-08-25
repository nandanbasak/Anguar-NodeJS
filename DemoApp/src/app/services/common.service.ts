import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getMenuItems(){
    return this.http.get('http://localhost:8080/api/menuItems/');
  }
}
