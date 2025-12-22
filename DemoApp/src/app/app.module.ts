import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GeolocationComponent } from './controllers/geolocation/geolocation.component';
import { ProductcategoryComponent } from './controllers/productcategory/productcategory.component';
import { MenuitemsComponent } from './controllers/menuitems/menuitems.component';
import { CountrylistComponent } from './controllers/countrylist/countrylist.component';
import { LoginService } from './services/login.service';
import { AuthGuard } from './Guard/auth.guard';
import { FooterComponent } from './controllers/footer/footer.component';
import { HeaderComponent } from './controllers/header/header.component';
import { ContactComponent } from './controllers/contact/contact.component';
import { AboutComponent } from './controllers/about/about.component';
import { CanDeactivateGuard } from './Guard/can-deactivate.guard';
import { CommonService } from './services/common.service';
import { RegisterComponent } from './controllers/register/register.component';
import { StatelistComponent } from './controllers/statelist/statelist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent,
    GeolocationComponent,
    ProductcategoryComponent,
    MenuitemsComponent,
    CountrylistComponent,
    FooterComponent,
    HeaderComponent,
    ContactComponent,
    AboutComponent,
    RegisterComponent,
    StatelistComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCommonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [CommonService, LoginService, AuthGuard, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
