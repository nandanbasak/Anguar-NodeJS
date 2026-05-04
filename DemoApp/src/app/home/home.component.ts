import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name = 'Home Component';
  totalTeachers: number = 12;
  totalStudents: number = 1100;
  totalClasses: number = 9;
  OtherInfo: number = 0;

  stats = [
    { label: 'Services', icon: 'apps', value: 50, color: '#667eea' },
    { label: 'Users', icon: 'people', value: 5000, color: '#764ba2' },
    { label: 'Verified', icon: 'verified_user', value: 98, color: '#f093fb', unit: '%' },
    { label: 'Locations', icon: 'location_on', value: 25, color: '#4dd0e1' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  navigateToCategories(): void {
    this.router.navigate(['/categories']);
  }

  hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `${r}, ${g}, ${b}`;
    }
    return '102, 126, 234';
  }
}


