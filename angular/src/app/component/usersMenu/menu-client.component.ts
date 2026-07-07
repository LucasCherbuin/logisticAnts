import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './userMenu.component';
import { RoleService } from '../../services/role.service';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import { ArticleCommandeService } from '../../services/articleCommande.service';


@Component({
    selector: 'app-menu-client',
    standalone: true,
    imports: [CommonModule, UserMenuComponent],
    templateUrl: '../../pages/userMenu/menu-client.component.html',
    styleUrls: ["../../../main.scss"],
})
export class MenuClientComponent{

    readonly CLIENT = 'CLIENT';
    Role: string = '';

    constructor(private roleService: RoleService, 
                private registerService: RegisterService, 
                private router: Router,
                public articleCommandeService: ArticleCommandeService) {
        this.roleService.getRoles();
    }
    logout() {
        this.registerService.logout();
        this.router.navigate(['/']);
    }
    goToCart(): void {
        this.router.navigate(['/cart'], {
        });
    }
}