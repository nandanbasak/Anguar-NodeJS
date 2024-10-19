import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DemoApp';
  isLoginUser:boolean=false;
  constructor(private loginservice:LoginService,private router:Router ){}
  ngOnInit(){
    this.loginservice.isUserLoggedinSub.subscribe(isLogin=>{
      this.isLoginUser=isLogin;
      console.log('App Component user Login ' +this.isLoginUser);
    });
  }
  logout(){
    this.isLoginUser=false;
    this.loginservice.isUserLoggedin(this.isLoginUser);
    this.router.navigate(['login']);
  }
}
