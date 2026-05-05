<<<<<<< HEAD
import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent }
];
=======
import { Routes } from '@angular/router';
import { LoginComponent } from './component/login.component';
import { RegisterComponent } from './component/register.component';
import { AppComponent } from './component/app.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', component: AppComponent},
  { path: 'register', component: RegisterComponent }
];
>>>>>>> login
