import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Guard/auth.guard';
import { ContactComponent } from './controllers/contact/contact.component';
import { AboutComponent } from './controllers/about/about.component';
import { CanDeactivateGuard } from './Guard/can-deactivate.guard';


const routes: Routes = [
  {path:'/', component:HomeComponent},
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'contact', component:ContactComponent, canDeactivate:[CanDeactivateGuard]},
  {path:'about', component:AboutComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
