import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { MailService, MailRequest } from '../services/mailer.service';
import { User } from '../models/user';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./main.scss']
})
export class RegisterComponent {

  pseudo = '';
  email = '';
  password = '';
  roleId = '';

  constructor(
    private authService: AuthService,
    private mailService: MailService
  ) {} 

register() {
  this.authService.register(this.pseudo, this.email, this.password, 'CLIENT')
      .pipe(
        switchMap(() => {
          const mail: MailRequest = {
            to: this.email,
            subject: 'Inscription réussie',
            body: `Cher ${this.pseudo}, votre compte a bien été créé.`
          };
          return this.mailService.sendMail(mail);
        })
      )
      .subscribe({
        next: () => console.log('User + email OK'),
        error: (err) => console.error('Erreur ', err)
      });
  }
  
}