import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { countries } from 'country-list-json';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-countrylist',
  templateUrl: './countrylist.component.html',
  styleUrls: ['./countrylist.component.css']
})
export class CountrylistComponent implements OnInit {
  @Output() countryChanged = new EventEmitter<string>();
  countryList: any;
  form = new FormGroup({
    CountryList: new FormControl('', Validators.required)
  });
  constructor() { }
  ngOnInit() {
    this.countryList = countries;
  }
  onCountryChange(e) {
    this.countryChanged.emit(e.target.value);
  }
}
