import { Component, OnInit } from '@angular/core';
import {countries} from 'country-list-json';

import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-countrylist',
  templateUrl: './countrylist.component.html',
  styleUrls: ['./countrylist.component.css']
})
export class CountrylistComponent implements OnInit {
  constructor() { }

     countryList:any;
     form = new FormGroup({
      CountryList: new FormControl('', Validators.required)
    });
  ngOnInit() {
    this.countryList=countries;
    console.log("Country List Json >>" + JSON.stringify(countries));
    console.log("Country List >>" +this.countryList);
    
  }
  changeCountryList(e) {
    console.log(e.target.value);
  }
}
