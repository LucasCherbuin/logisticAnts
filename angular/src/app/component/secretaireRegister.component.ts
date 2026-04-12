import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MailRequest, MailService } from '../services/mailer.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-secretaire-register',
  templateUrl: './secretaireRegister.component.html',
  styleUrls: ['./main.scss']
})
export class SecretaireRegisterComponent {

  pseudo: string = '';
  email: string = '';
  password: string = '';
  roleId: string = '';

  constructor(
    private authService: AuthService,
    private mailService: MailService
  ) {}

  secretaireRegister() {
    this.authService
      .secretaireRegister(
        this.pseudo,
        this.email,
        this.password,
        this.roleId,
      )
      .pipe(
        switchMap(() => {
          const mail: MailRequest = {
            to: this.email,
            subject: 'Bienvenue chez Logisitants',
            body: `Cher ${this.pseudo}, 
            
Bienvenue dans votre boîte mail professionnelle.
Nous vous souhaitons le meilleur pour votre expérience dans l'entreprise.`
          };
          return this.mailService.sendMail(mail);
        })
      )
      .subscribe({
        next: () => console.log('User + email OK'),
        error: (err) => console.error('Erreur', err)
      });
  }
}