import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Role } from '../models/role.model';
import { RoleService } from '../services/role.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './userMenu.component.html',
  styleUrls: ['./main.scss'],
  standalone: true,
  imports: [ RouterOutlet,]
})



export class UserMenuComponent implements OnInit {
    roles: Role[] = [];

  getDashboardRoute(roles: string): string {
    switch (roles) {
      case 'ADMIN':
        return '/dashboard-admin';
      case 'CLIENT':
        return '/dashboard-client';
      case 'LOGISTICIEN':
        return '/dashboard-logisticien';
      case 'SECRETAIRE':
        return '/dashboard-secretaire';
      default:
        return '/dashboard-visiteur';
    }
  }

  
constructor(private roleService: RoleService) {}

        ngOnInit(): void {
            this.loadRoles();
        }

        loadRoles(): void {
        this.roleService.getRoles().subscribe(
            (data: Role[]) => {
            console.log('Roles loaded:', data);
            },
            (error: any) => {
            console.error('Error fetching roles:', error);
            }
        );
    }
}