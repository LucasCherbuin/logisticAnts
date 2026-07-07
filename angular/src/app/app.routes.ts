import { Routes } from '@angular/router';
import { LoginComponent } from './component/login.component';
import { RegisterComponent } from './component/register.component';
import { AppComponent } from './component/app.component';
import { RoleGuardService } from './services/roleguard.service';
import { ShopComponent } from './component/client/shop.component';
import { CommandeComponent } from './component/client/commandes/commande.component';
import { PurchaseComponent } from './component/client/purchase.component';
import { CardComponent } from './component/client/card.component';
import { CartComponent } from './component/client/cart.component';
import { PrixComponent } from './component/dashboardAdmin/Prix.component';
import { ProduitPhareComponent } from './component/dashboardAdmin/ProduitPhare.component';
import { PickingComponent } from './component/logisiticien/picking/picking.component';
import { AddProduitComponent } from './component/logisiticien/produit/add-update/addProduit.component';
import { UpdateProduitComponent } from './component/logisiticien/produit/add-update/updateProduit.component';
import { DeleteProduitComponent } from './component/logisiticien/produit/delete/deleteProduit.component';
import { ProduitComponent } from './component/logisiticien/produit/produit.component';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./component/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./component/register.component').then(m => m.RegisterComponent) },
    { path: 'menu', loadComponent: () => import('./component/usersMenu/userMenu.component').then(m => m.UserMenuComponent) },
    // CLIENT
    { path: 'shop', component: ShopComponent, canActivate: [RoleGuardService], data: { role: ['client'] } },
    { path: 'commandes', component: CommandeComponent, canActivate: [RoleGuardService], data: { role: ['client'] } },
    { path: 'purchase', component: PurchaseComponent, canActivate: [RoleGuardService], data: { role: ['client'] } },
    { path: 'card', component: CardComponent, canActivate: [RoleGuardService], data: { role: ['client'] } },
    { path: 'cart', component: CartComponent, canActivate: [RoleGuardService], data: { role: ['client'] } },
    // Admin
    { path: 'prix', component: PrixComponent, canActivate: [RoleGuardService], data: { role: ['admin'] } },
    { path: 'produit-phare', component: ProduitPhareComponent, canActivate: [RoleGuardService], data: { role: ['admin']} },
    // LOGISTICIEN
    { path: 'picking', component: PickingComponent, canActivate: [RoleGuardService], data: { role: ['logisticien']} },
    { path: 'produit', component: ProduitComponent, canActivate: [RoleGuardService], data: { role: ['logisticien']} },
    { path: 'add-produit', component: AddProduitComponent, canActivate: [RoleGuardService], data: { role: ['logisticien']} },
    { path: 'update-produit', component: UpdateProduitComponent, canActivate: [RoleGuardService], data: { role: ['logisticien']} },
    { path: 'delete-produit', component: DeleteProduitComponent, canActivate: [RoleGuardService], data: { role: ['logisticien']} },
    // menus par role
    { path: 'menu-admin', loadComponent: () => import('./component/usersMenu/menu-admin.component').then(m => m.MenuAdminComponent) },
    { path: 'menu-client', loadComponent: () => import('./component/usersMenu/menu-client.component').then(m => m.MenuClientComponent) },
    { path: 'menu-logisticien', loadComponent: () => import('./component/usersMenu/menu-logisticien.component').then(m => m.MenuLogisticienComponent) },
    { path: 'menu-secretaire', loadComponent: () => import('./component/usersMenu/menu-secretaire.component').then(m => m.MenuSecretaireComponent) },
    { path: '**', redirectTo: '' }
];

 
