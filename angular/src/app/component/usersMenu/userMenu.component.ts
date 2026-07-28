import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { RegisterService } from '../../services/register.service';
import { ArticleCommandeService } from '../../services/articleCommande.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
    selector: 'app-user-menu',
    templateUrl: '../../pages/userMenu/userMenu.component.html',
    styleUrls: ['../../../main.scss'],
    standalone: true,
    imports: [RouterOutlet, RouterLink, CommonModule]
})
export class UserMenuComponent implements OnInit {
    roles: Role[] = [];
    role: string = '';
    pseudo: string | null = '';
    @Input() isSidebarCollapsed = false;
    @Output() sidebarToggle = new EventEmitter<void>();

    menuItems: MenuItem[] = [];

    constructor(
        private roleService: RoleService,
        private router: Router,
        private registerService: RegisterService,
        public articleCommandeService: ArticleCommandeService
    ) {}

    ngOnInit(): void {
        this.pseudo = this.registerService.getPseudo();
        this.loadRoles();
    }

    loadRoles(): void {
        this.roleService.getRoles().subscribe({
            next: (data: Role[]) => {
                this.roles = data;
                this.role = data[0]?.label ?? '';
                this.menuItems = this.getMenuItems(this.role);
                this.router.navigate([this.getMenuRoute(this.role)]);
            },
            error: (error: any) => { console.error('Error fetching roles:', error); }
        });
    }

    getMenuRoute(role: string): string {
        switch (role) {
            case 'ADMIN':       return '/admin';
            case 'CLIENT':      return '/client';
            case 'LOGISTICIEN': return '/logisticien';
            case 'SECRETAIRE':  return '/secretaire';
            default:            return '/menu/visiteur';
        }
    }

    getMenuItems(role: string): MenuItem[] {
        switch (role) {
            case 'ADMIN':
                return [
                    { icon: 'ph ph-house', label: 'Accueil', route: '/accueil' },
                    { icon: 'ph ph-calculator', label: 'Évolution des prix', route: '/prix' },
                    { icon: 'ph ph-package', label: 'Produits phares', route: '/produit-phare' }
                ];
            case 'CLIENT':
                return [
                    { icon: 'ph ph-house', label: 'Accueil', route: '/accueil' },
                    { icon: 'ph ph-shopping-cart-simple', label: 'Consulter les articles', route: '/shop' },
                    { icon: 'ph ph-notebook', label: 'Mes commandes', route: '/commandes' }
                ];
            case 'LOGISTICIEN':
                return [
                    { icon: 'ph ph-house', label: 'Accueil', route: '/accueil' },
                    { icon: 'ph ph-package', label: 'reception marchandises', route: '/add-produit' },
                    { icon: 'ph ph-magnifying-glass', label: 'consulter un produit', route: '/produit' },
                    { icon: 'ph ph-package', label: 'mettre à jour un Produit', route: '/update-produit' },
                    { icon: 'ph ph-x', label: 'supprimer un Produit', route: '/delete-produit' },
                    { icon: 'ph ph-clipboard-text', label: 'Picking', route: '/picking' }
                ];
            case 'SECRETAIRE':
                return [
                    { icon: 'ph ph-house', label: 'Accueil', route: '/accueil' },
                    { icon: 'ph ph-clipboard-text', label: 'Gestion commandes', route: '/gestion-commande' },
                    { icon: 'ph ph-user', label: 'Gestion utilisateurs', route: '/gestion-user' }
                ];
            default:
                return [
                    { icon: 'ph ph-house', label: 'Accueil', route: '/accueil' },
                    { icon: 'ph ph-users', label: 'Register', route: '/register' },
                    { icon: 'ph ph-users', label: 'Login', route: '/login' },
                ];
        }
    }

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
        this.sidebarToggle.emit();
    }

    toggleMenuItem(item: MenuItem) {
        if (!this.isSidebarCollapsed && item.children) {
            item.isOpen = !item.isOpen;
        }
    }

    goToCart(): void {
        this.router.navigate(['/cart']);
    }

    logout() {
        this.registerService.logout();
        this.router.navigate(['/']);
    }
}