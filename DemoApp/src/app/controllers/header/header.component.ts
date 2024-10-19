import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  isLoginUser: boolean=false;
  @Input() UserLiggedIn=this.isLoginUser;
  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit(): void {

  }
  ngOnChanges() {
    console.log('ngOnChanges called ' + this.isLoginUser);
    this.login();
    this.UserLiggedIn=this.isLoginUser;
  }
  login() {
    this.loginservice.isUserLoggedinSub.subscribe(isLogin => {
      this.isLoginUser = isLogin;
      console.log('Header Component Login() ' + this.isLoginUser);
    });
  }
  logout() {
    this.isLoginUser = false;
    this.loginservice.isUserLoggedin(this.isLoginUser);
    this.router.navigate(['login']);
  }
}
