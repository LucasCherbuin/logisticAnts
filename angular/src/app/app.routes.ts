import { Routes } from '@angular/router';
import { AppComponent } from './component/app.component';
import { LoginComponent } from './component/login.component';
import { RegisterComponent } from './component/register.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];