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
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
      //Logged in user can view the page 
     this.loginService.isUserLoggedinSubBe$.subscribe(isloging=>{
      this.IsLogin=isloging;
      if(!isloging)
      this.router.navigate(['login']);
      //console.log(`canActivate() inner ${isloging}`);
      });    
    return this.IsLogin;
  }
  
}
