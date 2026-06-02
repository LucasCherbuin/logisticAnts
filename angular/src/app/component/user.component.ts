import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [CommonModule],
    template: ``
})
export class UserComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe({
            next: (data: User[]) => { this.users = data; },
            error: (error: any) => { console.error('Error fetching users:', error); }
        });
    }
}