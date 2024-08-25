import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
name ='Home Component';
totalTeachers:number=12;
totalStudents:number=1100;
totalClasses:number=9;
OtherInfo:number=0;
  constructor() { }

  ngOnInit() {
  }
}
