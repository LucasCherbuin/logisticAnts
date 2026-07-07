import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginResponse {
  token: string;
  username: string;
}

@Component({
  selector: 'app-login',
  templateUrl: '../pages/login/login.component.html',
  standalone: true,
  styleUrls: ["../../main.scss"],
  imports: [ReactiveFormsModule, CommonModule], 
})
export class LoginComponent {
  loginForm = this.fb.group({
    pseudo: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  login() {
    if (this.loginForm.invalid) return;

    const { pseudo, password } = this.loginForm.value;

    this.registerService.login(pseudo!, password!).subscribe({
      next: (res: string) => {
        try {
          const parsed: LoginResponse = JSON.parse(res);
          this.registerService.saveToken(parsed.token);
        } catch {
          this.registerService.saveToken(res);
        }
        this.router.navigate(['/app']);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Login ou mot de passe incorrect.';
        console.error('Erreur login', err);
      }
    });
  }

    logout() {
    this.registerService.logout();
    this.router.navigate(['/']);
  }



  
}