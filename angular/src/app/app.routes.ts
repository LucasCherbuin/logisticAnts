import { Routes } from '@angular/router';
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
import { GestionCommandeComponent } from './component/secretaire/gestionCommande.component';
import { GestionUserComponent } from './component/secretaire/gestionUser.component';
import { SecretaireRegisterComponent } from './component/secretaire/secretaireRegister.component';
import { SecretaireUpdateUserComponent } from './component/secretaire/secretaireUpdateUser.component';
import { PaymentReturnComponent } from './component/client/PaymentReturn.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', loadComponent: () => import('./component/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./component/register.component').then(m => m.RegisterComponent) },
    {
        path: '',
        loadComponent: () => import('./component/usersMenu/userMenu.component').then(m => m.UserMenuComponent),
        children: [
            { path: 'accueil', loadComponent: () => import('./component/accueil.component').then(m => m.AccueilComponent) },
            { path: 'admin', loadComponent: () => import('./component/usersMenu/menu-admin.component').then(m => m.MenuAdminComponent), canActivate: [RoleGuardService], data: { role: ['ADMIN'] } },
            { path: 'client', loadComponent: () => import('./component/usersMenu/menu-client.component').then(m => m.MenuClientComponent), canActivate: [RoleGuardService], data: { role: ['CLIENT'] } },
            { path: 'logisticien', loadComponent: () => import('./component/usersMenu/menu-logisticien.component').then(m => m.MenuLogisticienComponent), canActivate: [RoleGuardService], data: { role: ['LOGISTICIEN'] } },
            { path: 'secretaire', loadComponent: () => import('./component/usersMenu/menu-secretaire.component').then(m => m.MenuSecretaireComponent), canActivate: [RoleGuardService], data: { role: ['SECRETAIRE'] } },
            { path: 'visiteur', loadComponent: () => import('./component/usersMenu/menu-visiteur.component').then(m => m.MenuVisiteurComponent) },
            // CLIENT
            { path: 'shop', component: ShopComponent, canActivate: [RoleGuardService], data: { role: ['CLIENT'] } },
            { path: 'commandes', component: CommandeComponent, canActivate: [RoleGuardService], data: { role: ['CLIENT'] } },
            { path: 'purchase', component: PurchaseComponent, canActivate: [RoleGuardService], data: { role: ['CLIENT'] } },
            { path: 'payment-return', component: PaymentReturnComponent, canActivate: [RoleGuardService], data: { role: ['CLIENT'] } },
            { path: 'card', component: CardComponent, canActivate: [RoleGuardService], data: { role: ['CLIENT'] } },
            { path: 'cart', component: CartComponent, canActivate: [RoleGuardService], data: { role: ['CLIENT'] } },
            // ADMIN
            { path: 'prix', component: PrixComponent, canActivate: [RoleGuardService], data: { role: ['ADMIN'] } },
            { path: 'produit-phare', component: ProduitPhareComponent, canActivate: [RoleGuardService], data: { role: ['ADMIN'] } },
            // LOGISTICIEN
            { path: 'picking', component: PickingComponent, canActivate: [RoleGuardService], data: { role: ['LOGISTICIEN'] } },
            { path: 'produit', component: ProduitComponent, canActivate: [RoleGuardService], data: { role: ['LOGISTICIEN'] } },
            { path: 'add-produit', component: AddProduitComponent, canActivate: [RoleGuardService], data: { role: ['LOGISTICIEN'] } },
            { path: 'update-produit', component: UpdateProduitComponent, canActivate: [RoleGuardService], data: { role: ['LOGISTICIEN'] } },
            { path: 'delete-produit', component: DeleteProduitComponent, canActivate: [RoleGuardService], data: { role: ['LOGISTICIEN'] } },
            // SECRETAIRE
            { path: 'gestion-commande', component: GestionCommandeComponent, canActivate: [RoleGuardService], data: { role: ['SECRETAIRE'] } },
            { path: 'secretaire-update-user/:id', component: SecretaireUpdateUserComponent, canActivate: [RoleGuardService], data: { role: ['SECRETAIRE'] } },
            { path: 'secretaire-register', component: SecretaireRegisterComponent, canActivate: [RoleGuardService], data: { role: ['SECRETAIRE'] } },
            { path: 'gestion-user', component: GestionUserComponent, canActivate: [RoleGuardService], data: { role: ['SECRETAIRE'] } },
        ]
    },
    { path: '**', redirectTo: '' }
];