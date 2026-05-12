import { Injectable } from "@angular/core";
import { RoleService } from "./role.service";  
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router'; 
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {  
  
  private roles: string[] = [];

  constructor(private roleService: RoleService) {
    this.roleService.getRoles().subscribe(r => {
      this.roles = r.map(role => role.label);
    });
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return route.data['Role'].some((r: string) => this.roles.includes(r)); 
  }
}