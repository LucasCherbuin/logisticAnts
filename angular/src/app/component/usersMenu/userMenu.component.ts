import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';


@Component({
    selector: 'app-user-menu',
    templateUrl: '../../pages/userMenu/userMenu.component.html',
    styleUrls: ['../../../main.scss'],
    standalone: true,
    imports: [RouterOutlet, CommonModule]
})
export class UserMenuComponent implements OnInit {
    roles: Role[] = [];

    constructor(private roleService: RoleService, private router: Router) {}

    ngOnInit(): void {
        this.loadRoles();
    }

    loadRoles(): void {
        this.roleService.getRoles().subscribe({
            next: (data: Role[]) => {
                this.roles = data;
                this.redirectByRole(data);
            },
            error: (error: any) => { console.error('Error fetching roles:', error); }
        });
    }

    redirectByRole(roles: Role[]): void {
        const role = roles[0]?.label ?? '';
        this.router.navigate([this.getMenuRoute(role)]);
    }

    getMenuRoute(role: string): string {
        switch (role) {
            case 'ADMIN':       return '/menu-admin';
            case 'CLIENT':      return '/menu-client';
            case 'LOGISTICIEN': return '/menu-logisticien';
            case 'SECRETAIRE':  return '/menu-secretaire';
            default:            return '/menu-visiteur';
        }
    }
}