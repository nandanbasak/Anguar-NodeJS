import { Injectable ,EventEmitter} from '@angular/core';
import { observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
isUserLoggedinSub =new Subject<boolean>();
// dataEmitor = new EventEmitter<string>();
  constructor() { }

 isUserLoggedin(data:boolean ){
    this.isUserLoggedinSub.next(data);
  }
}
