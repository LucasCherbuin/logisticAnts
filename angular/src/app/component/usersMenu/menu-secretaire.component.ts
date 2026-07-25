import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { RegisterService } from '../../services/register.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-menu-secretaire',
    standalone: true,
    imports: [],
    templateUrl: '../../pages/userMenu/menu-secretaire.component.html',
    styleUrls: ['../../../main.scss'],
})
export class MenuSecretaireComponent {}