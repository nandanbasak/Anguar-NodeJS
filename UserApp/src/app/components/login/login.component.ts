import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.getLocalUsers().subscribe(users => {
      const user = users.find(u => u.name === this.username && u['password'] === this.password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMsg = 'Invalid username or password';
      }
    });
  }
}
