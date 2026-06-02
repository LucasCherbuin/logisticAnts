import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './userMenu.component';
import { RoleService } from '../../services/role.service';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-menu-secretaire',
    standalone: true,
    imports: [CommonModule, UserMenuComponent],
    templateUrl: '../../pages/userMenu/menu-secretaire.component.html',
    styleUrls: ['../../../main.scss'],
})
export class MenuSecretaireComponent {
    readonly SECRETAIRE = 'SECRETAIRE';
    Role: string = '';

    constructor(private roleService: RoleService, private registerService: RegisterService, private router: Router) {
        this.roleService.getRoles();
    }
    logout() {
        this.registerService.logout();
        this.router.navigate(['/']);
    }
}