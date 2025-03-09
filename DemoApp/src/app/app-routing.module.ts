import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Guard/auth.guard';
import { ContactComponent } from './controllers/contact/contact.component';
import { AboutComponent } from './controllers/about/about.component';
import { CanDeactivateGuard } from './Guard/can-deactivate.guard';
import { RegisterComponent } from './controllers/register/register.component';


const routes: Routes = [
  {path:'', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'contact', component:ContactComponent, canDeactivate:[CanDeactivateGuard]},
  {path:'about', component:AboutComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
