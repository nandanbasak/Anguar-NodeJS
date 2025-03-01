import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userid: any;
  regiterForm: FormGroup;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.CreateForm();
  }
  CreateForm() {
    this.regiterForm = new FormGroup({
      // id: new FormControl(null, Validators.required),
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      dateofbirth: new FormControl(null, Validators.required),
      mobileno: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      re_password: new FormControl(null, [Validators.required]),
      role: new FormControl('PLEASE SELECT ROLE', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      gender: new FormControl('male')
    }, { validators: this.passwordMatchValidator }
    );
  }
  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('re_password')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    } else if (password === confirmPassword) {
      return { passwordMatch: true };
    }
    return null;
  }
  onRegister() {
    console.log(`Register Form: ${JSON.stringify(this.regiterForm.value)}`);
    // this.loginService.registerUser(this.regiterForm.value).subscribe((response) => {
    //   this.userid = response;
    //   console.log(`Register Form: ${JSON.stringify(response)}`);
    // });
  }
  changeRole(e) {
    this.regiterForm.controls['role'].setValue(e.target.value);
    console.log(`Register Form changeRole: ${this.regiterForm.controls['role'].value}`);

  }
}
