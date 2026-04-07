import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


interface LoginResponse {
  token: string;
  username: string;
}

interface RegisterResponse {
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./styles.scss']
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    pseudo: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  // LOGIN
  login() {

    if (this.loginForm.invalid) {
      return;
    }

    const { pseudo, password } = this.loginForm.value;

    this.authService.login(pseudo!, password!)
      .subscribe({
        next: (res: LoginResponse) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Login incorrect');
        }
      });
  }

  register() {

    if (this.loginForm.invalid) {
      return;
    }

    const { pseudo, email, password } = this.loginForm.value;

    this.authService.register(pseudo!, email!, password!)
      .subscribe({
        next: (res: RegisterResponse) => {
          alert('Registration successful, you can now log in');
        },
        error: () => {
          alert('Registration failed');
        }
      });
  }
}