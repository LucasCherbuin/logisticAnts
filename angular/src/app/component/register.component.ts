import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MailService, MailRequest } from '../services/mailer.service';
import { switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: '../pages/login/register.component.html',
  standalone: true,
  styleUrls: ["../../main.scss"],
  imports: [FormsModule, CommonModule],
})
export class RegisterComponent {
  pseudo = '';
  email = '';
  password = '';
  role = 'CLIENT';
  errorMessage = '';

  constructor(
    private registerService: RegisterService,
    private mailService: MailService
  ) {}

  register() {
    this.registerService.register(this.pseudo, this.email, this.password, this.role)
      .pipe(
        tap(() => console.log(' 1. Register OK')),
        switchMap(() => this.registerService.login(this.pseudo, this.password)),
        tap((token: string) => console.log(' 2. Login token brut :', token)),
        switchMap((token: string) => {
          let finalToken: string;
          try {
            const parsed = JSON.parse(token);
            finalToken = parsed.token ?? token;
          } catch {
            finalToken = token;
          }

          console.log(' 3. Final token :', finalToken);
          this.registerService.saveToken(finalToken);

          const mail: MailRequest = {
            to: this.email,
            subject: 'Inscription réussie',
            body: `Cher ${this.pseudo}, votre compte a bien été créé.`
          };

          return this.mailService.sendMailWithToken(mail, finalToken);
        })
      )
      .subscribe({
        next: () => console.log('✅ 4. Email envoyé'),
        error: (err: HttpErrorResponse) => console.error('Erreur', err)
      });
  }
  
}