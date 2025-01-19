import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService:LoginService,private router:Router){}
  IsLogin:boolean=false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //Logged in user can view the page 
     this.loginService.isUserLoggedinSubBe$.subscribe(isloging=>{
      this.IsLogin=isloging;
      //console.log(`canActivate() inner ${isloging}`);
      });    
    return this.IsLogin;
  }
  
}
