import { Injectable } from "@angular/core";
import { RegisterService } from "./register.service";
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
  constructor(private authService: RegisterService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.authService.getToken();
    console.log('TOKEN:', token);

    if (!token) {
      console.log('PAS DE TOKEN → redirection');
      this.router.navigate(['/']);
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('PAYLOAD JWT:', payload);
      const userRole = payload.role ?? payload.Role ?? payload.roles ?? payload.sub;
      console.log('ROLE DÉTECTÉ:', userRole);
      console.log('ROLES REQUIS:', route.data['role']);

      const allowed: string[] = route.data['role'];
      const hasAccess = allowed.some(r =>
        Array.isArray(userRole) ? userRole.includes(r) : userRole === r
      );

      console.log('ACCÈS:', hasAccess);
      if (!hasAccess) this.router.navigate(['/']);
      return hasAccess;

    } catch(e) {
      console.log('ERREUR DÉCODAGE JWT:', e);
      this.router.navigate(['/']);
      return false;
    }
  }
}