import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../services/register.service';
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
  templateUrl: '../pages/login/login.component.html',
  styleUrls: ['../../main.scss'],
  imports: [FormsModule],
})
export class LoginComponent {

  pseudo: string = '';
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    pseudo: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  login() {

    if (this.loginForm.invalid) {
      return;
    }

    const { pseudo, password } = this.loginForm.value;

    this.registerService.login(pseudo!, password!)
      .subscribe({
        next: (res: LoginResponse) => {
          this.registerService.saveToken(res.token);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Login incorrect');
        }
      });
  }

}
