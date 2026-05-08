import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/role.service';
import { Role } from '../models/role.model';


    export class RoleComponent implements OnInit {
    roles: Role[] = [];

        constructor(private roleService: RoleService) {}

        ngOnInit(): void {
            this.loadRoles();
        }

    loadRoles(): void {
    this.roleService.getRoles().subscribe(
        (data: Role[]) => {
        this.roles = data;
        },
        (error: any) => {
        console.error('Error fetching roles:', error);
        }
    );
    }   
}