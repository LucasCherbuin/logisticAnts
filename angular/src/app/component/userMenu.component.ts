import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Role } from '../models/role.model';
import { RoleService } from '../services/role.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './menus/*',
  styleUrls: ['./main.scss'],
  standalone: true,
  imports: [ RouterOutlet,]
})



export class UserMenuComponent implements OnInit {
    roles: Role[] = [];

  getMenuRoute(roles: string): string {
    switch (roles) {
      case 'ADMIN':
        return '/menu-admin';
      case 'CLIENT':
        return '/menu-client';
      case 'LOGISTICIEN':
        return '/menulogisticien';
      case 'SECRETAIRE':
        return '/menu-secretaire';
      default:
        return '/menu-visiteur';
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