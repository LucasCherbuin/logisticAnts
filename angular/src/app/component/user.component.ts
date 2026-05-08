import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


    export class UserComponent implements OnInit {
    users: User[] = [];

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
}