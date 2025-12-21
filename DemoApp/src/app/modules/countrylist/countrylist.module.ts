import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrylistComponent } from 'src/app/controllers/countrylist/countrylist.component';


@NgModule({
  declarations: [
    CountrylistComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CountrylistComponent
  ]
})
export class CountrylistModule { }
