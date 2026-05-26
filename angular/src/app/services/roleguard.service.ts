import { Injectable } from "@angular/core";
import { RoleService } from "./role.service";
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

    private roles: string[] = [];

    constructor(private roleService: RoleService, private router: Router) {
        this.roleService.getRoles().subscribe({
            next: (r) => { this.roles = r.map(role => role.label); },
            error: (err: any) => { console.error('Error fetching roles:', err); }
        });
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const allowed = route.data['role'].some((r: string) => this.roles.includes(r));
        if (!allowed) {
            this.router.navigate(['/']);
        }
        return allowed;
    }
}