import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./main.scss']
})

export class UserComponent implements OnInit {

    users: User[] = [];
    searchTerm: string = '';

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
            this.userService.getUsers().subscribe(
                (data: User[]) => {
                this.users = data;
                },
                (error: any) => {
                console.error('Error fetching users:', error);
                }
            );
        }

    onSearch() {
        if (this.searchTerm.trim() === '') {
            this.loadUsers();
        } else {
            this.userService.searchUsers(this.searchTerm).subscribe(data => {
                this.users = data;
            }); 
        }
    }
}  
