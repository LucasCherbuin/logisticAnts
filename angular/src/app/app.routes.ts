import { Routes } from '@angular/router';
import { LoginComponent } from './component/login.component';
import { RegisterComponent } from './component/register.component';
import { AppComponent } from './component/app.component';
import { shopComponent } from './component/shop.component';
import { RoleGuardService } from './services/roleguard.service';

export const routes: Routes = [
  //register
  { path: '', component: LoginComponent },
  { path: '', component: AppComponent},
  { path: 'register', component: RegisterComponent },
  //client
  { path: "shop", component: shopComponent, canActivate: [RoleGuardService], data: { role: ['CLIENT']} },
  { path: "shop", component: shopComponent, canActivate: [RoleGuardService], data: { role: ['CLIENT']} },
];
