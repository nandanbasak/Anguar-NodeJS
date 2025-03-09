import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Users } from '../modules/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string; password: string; userList: Users[] = [];
  visible: boolean = false;
  changetype: boolean = true;
  resData: any;
  loginForm: FormGroup;
  isUserLoggedIn: boolean = false;
  constructor(private loginservice: LoginService, private router: Router) { }
  ProccedLogin() {
    debugger;
    if (this.loginForm.valid) {
      this.email = this.loginForm.controls['email'].value;
      this.password = this.loginForm.controls['password'].value;

      const body = {
        email: this.email,
        password: this.password
      }

      this.loginservice.loginUser(body).subscribe((users) => {
        this.userList = users;
        console.log(`Component user list >> ${JSON.stringify(users)}`);
        this.userList = this.userList.filter(u =>
          u.email === this.email && u.password === this.password
        );
        ///from local json file
        // this.loginservice.allusers().subscribe((users) => {
        //   this.userList = users;
        //   console.log(`Component user list >> ${JSON.stringify(this.userList)}`);
        //   this.userList = this.userList.filter(u => 
        //     u.email === this.userid && u.password === this.password 
        //   );
        console.log(`Component user list filtered >> ${JSON.stringify(this.userList)}`);

        if (this.userList.length > 0) {
          this.isUserLoggedIn = true;
          this.loginservice.setUserLoggedin(this.isUserLoggedIn);
          this.loginservice.setLoginUserDetails(this.userList);
          this.router.navigate(['home']);
          console.log(`User Login Success!`);
        } else {
          this.isUserLoggedIn = false;
          this.router.navigate(['login']);
          console.log(`Not a valid user '${this.loginForm.controls['email'].value}'`)
        }
      });

    }

  }
  ngOnInit() {
    this.CreateForm();
    // this.loginservice.getUser().subscribe(data => {
    //   //console.log(`Component user list >> ${JSON.stringify(data)}`);
    // }
    // );
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
