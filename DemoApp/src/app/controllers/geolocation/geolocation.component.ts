import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements OnInit {
  selectedCountry: string = '';

  constructor() { }

  ngOnInit() {}

  onCountryChange(event: any) {
    this.selectedCountry = event.target ? event.target.value : event;
  }
}
