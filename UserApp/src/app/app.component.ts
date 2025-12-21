// filepath: src/app/components/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'UserApp';
  currentUser: any = null;

  constructor(private router: Router) {
    this.loadUser();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadUser();
      }
    });
  }

  loadUser() {
    const user = localStorage.getItem('user');
    this.currentUser = user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}