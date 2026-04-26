import { OnInit, Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-accueil',
    templateUrl: './pages/accueil.component.html',
    styleUrls: ['./main.scss'],
    standalone: true,
    imports: [CommonModule]  
})
export class AccueilComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe({
            next: (data: User[]) => {
                this.users = data;
                console.log('Users loaded:', data);
            },
            error: (error: any) => {
                console.error('Error fetching users:', error);
            }
        });
    }
}