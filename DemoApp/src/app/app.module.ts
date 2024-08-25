import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GeolocationComponent } from './controllers/geolocation/geolocation.component';
import { ProductcategoryComponent } from './controllers/productcategory/productcategory.component';
import { MenuitemsComponent } from './controllers/menuitems/menuitems.component';
import { CountrylistComponent } from './controllers/countrylist/countrylist.component';

@NgModule({
  declarations: [
    AppComponent,HomeComponent,LoginComponent,
    GeolocationComponent,
    ProductcategoryComponent,
    MenuitemsComponent,
    CountrylistComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
