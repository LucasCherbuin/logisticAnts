import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './userMenu.component';
import { RoleService } from '../../services/role.service';
import { RegisterService } from '../../services/register.service';
import { Router, RouterLink, RouterModule } from '@angular/router';


@Component({
    selector: 'app-menu-logisticien',
    standalone: true,
    imports: [CommonModule, UserMenuComponent, RouterModule, RouterLink],
    templateUrl: '../../pages/userMenu/menu-logisticien.component.html',
    styleUrls: ["../../../main.scss"],
})
export class MenuLogisticienComponent {
    readonly LOGISTICIEN = 'LOGISTICIEN';
    Role: String = '';

    constructor(private roleService: RoleService, private registerService: RegisterService, private router: Router) {
        this.roleService.getRoles();
    }
    logout() {
        this.registerService.logout();
        this.router.navigate(['/']);
    }
}