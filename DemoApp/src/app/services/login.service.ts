import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, observable, pipe, Subject } from 'rxjs';
import { CommonService } from './common.service';
import { Users } from '../modules/users';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private AllUsers: Users[] = [];
  userList: Users[] = [];
  isLoggedIn: boolean = false;
  dtlsUserLoginSubBe = new BehaviorSubject<any>(null);
  dtlsUserLoginSubBe$ = this.dtlsUserLoginSubBe.asObservable();
  isUserLoggedinSubBe = new BehaviorSubject<boolean>(false);
  isUserLoggedinSubBe$ = this.isUserLoggedinSubBe.asObservable();
  // dataEmitor = new EventEmitter<string>();
  constructor(private http: HttpClient, private common: CommonService) { }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<{ [key: string]: Users }>('./assets/users.json')
      .pipe(map((res) => {
        const users: Users[] = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            // users.push({ ...res[key], id: key })
            users.push({ ...res[key] });
          }
        }
        console.log(`user list >> ${JSON.stringify(users)}`);
        return users;
      }))

  }
  allusers() {
    return this.common.getRequest("../assets/users.json");

  }
  loginUser(body): Observable<Users[]> {
    //return this.http.post('https://anguar-nodejs.onrender.com/api/users/login',body);
    return this.http.post<Users[]>(' http://localhost:8080/api/users/login',body);   
  }
  setUserLoggedin(data: boolean) {
    //console.log(`setUserLoggedin status >> ${data}`);
    this.isUserLoggedinSubBe.next(data);
  }
  isAuthenticate() {
    return this.isLoggedIn;
  }
  setLoginUserDetails(data: any) {
    this.dtlsUserLoginSubBe.next(data);
  }
  registerUser(body:any){
    const options = {
      method: 'POST',
      headers: {
          'Content-type': 'application/json'
      }
  }
    console.log(`Register Service(login): ${JSON.stringify(body)}`);
    //return this.http.post('https://anguar-nodejs.onrender.com/api/users/register',body,options);
    return this.http.post('http://localhost:8080/api/users/register',body);
  }
}
