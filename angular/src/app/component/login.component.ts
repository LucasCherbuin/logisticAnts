import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  pseudo = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.pseudo, this.password)
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);

          console.log("Utilisateur connecté :", res.user);

          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert("Login incorrect");
        }
      });
  }
}