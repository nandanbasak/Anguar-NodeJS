import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  UserLiggedIn: boolean=false;
  userDtls:any;
  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginservice.isUserLoggedinSubBe$.subscribe(isUserLogin=>{
        this.UserLiggedIn=isUserLogin;
      }
    );
    this.loginservice.dtlsUserLoginSubBe$.subscribe(user=>{
      this.userDtls=user;
    }
  );
  }

  logout(){
    this.UserLiggedIn=false;
    this.loginservice.setLoginUserDetails(null);
    this.loginservice.setUserLoggedin(this.UserLiggedIn);
    this.router.navigate(['login']);
  }
}
