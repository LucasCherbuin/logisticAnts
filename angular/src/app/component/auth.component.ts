import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MailService, MailRequest } from '../services/mailer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./styles.scss']
})
export class RegisterComponent {

  pseudo = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private mailService: MailService
  ) {}

  register() {
    this.authService.register(this.pseudo, this.email, this.password)
      .subscribe({
        next: (res) => {
          console.log('User créé ', res);

          const mail: MailRequest = {
            to: this.email,
            subject: 'Inscription réussie - Logisticiants',
            body: `Cher ${this.pseudo}, votre compte a bien été créé.`
          };

          this.mailService.sendMail(mail).subscribe({
            next: () => console.log('Email envoyé '),
            error: (err) => console.error('Mail error ', err)
          });
        },
        error: (err) => {
          console.error('Register error ', err);
        }
      });
  }
}