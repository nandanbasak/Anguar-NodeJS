import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  visible: boolean = false;
  changetype: boolean = true;
  resData: any;
  loginForm: FormGroup;
  isUserLoggedIn: boolean = false;
  constructor(private loginservice: LoginService, private router: Router) { }

  ProccedLogin() {
    if (this.loginForm.valid) {
      this.isUserLoggedIn = true;
      this.loginservice.isUserLoggedin(this.isUserLoggedIn);
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
      console.log(`Not a valid user '${this.loginForm.controls['email'].value}'`)
    }
    console.log(this.loginForm);
    // this.loginservice.isUserLoggedinSub.subscribe((data)=>{
    //   this.isUserLoggedIn=data;
    // })

    //console.log(`Login user ${this.changetype}`)
  }
  ngOnInit() {
    this.CreateForm();
    console.log(this.loginForm);
  }
  CreateForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      rememberMe: new FormControl(null)
    });
  }
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
