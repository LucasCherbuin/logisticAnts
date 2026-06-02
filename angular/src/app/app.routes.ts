import { Routes } from '@angular/router';
import { LoginComponent } from './component/login.component';
import { RegisterComponent } from './component/register.component';
import { ShopComponent } from './component/client/shop.component';
import { PurchaseComponent } from './component/client/purchase.component';
import { CommandeComponent } from './component/client/commandes/commande.component';
import { UserMenuComponent } from './component/usersMenu/userMenu.component';
import { RoleGuardService } from './services/roleguard.service';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'menu', component: UserMenuComponent },

    // CLIENT
    { path: 'shop', component: ShopComponent, canActivate: [RoleGuardService], data: { role: ['client'] } },
    { path: 'commandes', component: CommandeComponent, canActivate: [RoleGuardService], data: { role: ['client'] } },
    { path: 'purchase', component: PurchaseComponent, canActivate: [RoleGuardService], data: { role: ['client'] } },
    { path: 'card', loadComponent: () => import('./component/client/card.component').then(m => m.CardComponent), canActivate: [RoleGuardService], data: { role: ['client'] } },

    // menus par role
    { path: 'menu-admin', loadComponent: () => import('./component/usersMenu/menu-admin.component').then(m => m.MenuAdminComponent) },
    { path: 'menu-client', loadComponent: () => import('./component/usersMenu/menu-client.component').then(m => m.MenuClientComponent) },
    { path: 'menu-logisticien', loadComponent: () => import('./component/usersMenu/menu-logisticien.component').then(m => m.MenuLogisticienComponent) },
    { path: 'menu-secretaire', loadComponent: () => import('./component/usersMenu/menu-secretaire.component').then(m => m.MenuSecretaireComponent) },

    { path: '**', redirectTo: '' }
];