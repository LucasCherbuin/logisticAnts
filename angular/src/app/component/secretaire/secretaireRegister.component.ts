import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { MailRequest, MailService } from '../../services/mailer.service';
import { switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-secretaire-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: '../../pages/secretaire/user/secretaireRegister.html',
  styleUrls: ['../../../main.scss']
})
export class SecretaireRegisterComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private mailService: MailService
  ) {
    this.loginForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['LOGISTICIEN', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { pseudo, email, password, role } = this.loginForm.value;
    this.registerService
      .register(pseudo, email, password, role)
      .pipe(
        switchMap(() => {
          const mail: MailRequest = {
            to: email,
            subject: 'Bienvenue chez Logisitants',
            body: `Cher ${pseudo},

            Bienvenue dans votre boîte mail professionnelle.
            Nous vous souhaitons le meilleur pour votre expérience dans l'entreprise.`
          };
          return this.mailService.sendMail(mail);
        })
      )
      .subscribe({
        next: () => console.log('User + email OK'),
        error: (err: HttpErrorResponse) => console.error('Erreur', err)
      });
  }
}