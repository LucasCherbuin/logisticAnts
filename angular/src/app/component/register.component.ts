import { Component, ViewChild } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MailService, MailRequest } from '../services/mailer.service';
import { switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterConfirmedComponent } from './RegisterConfirmed.component';

@Component({
  selector: 'app-register',
  templateUrl: '../pages/login/register.component.html',
  standalone: true,
  styleUrls: ["../../main.scss"],
  imports: [FormsModule, CommonModule, RegisterConfirmedComponent],
})
export class RegisterComponent {
  @ViewChild('confirmationRegistered') confirmationRegistered!: RegisterConfirmedComponent;
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
      switchMap(() => this.registerService.login(this.pseudo, this.password))
    )
    .subscribe({
      next: (token: string) => {
        let finalToken: string;
        try {
          const parsed = JSON.parse(token);
          finalToken = parsed.token ?? token;
        } catch {
          finalToken = token;
        }

        this.registerService.saveToken(finalToken);

        this.confirmationRegistered.open(() => {
          const mail: MailRequest = {
            to: this.email,
            subject: 'Inscription réussie',
            body: `Cher ${this.pseudo}, votre compte a bien été créé.`
          };

          this.mailService.sendMailWithToken(mail, finalToken).subscribe({
            next: () => console.log('Email envoyé'),
            error: (err: HttpErrorResponse) => console.error('Erreur envoi mail', err)
          });
        });
      },
      error: (err: HttpErrorResponse) => console.error('Erreur', err)
    });
}
}