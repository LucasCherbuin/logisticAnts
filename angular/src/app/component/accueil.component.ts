import {OnInit, Component} from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./main.scss']
})

export class AccueilComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe(
            (data: User[]) => { 
                this.users = data;
                console.log('Users loaded:', data);
            },
            (error: any) => {
                console.error('Error fetching users:', error);
            }
        );  
    }
}