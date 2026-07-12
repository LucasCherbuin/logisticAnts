import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-secretaire-update-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: '../../pages/secretaire/user/updateUser.component.html',
  styleUrls: ['../../../main.scss']
})
export class SecretaireUpdateUserComponent implements OnInit {
  loginForm: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      role: ['LOGISTICIEN', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.userService.getUserById(this.userId).subscribe({
      next: (data: User) => { this.loginForm.patchValue(data); },
      error: (err: HttpErrorResponse) => { console.error('Erreur chargement user', err); }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const user: User = { id: this.userId, ...this.loginForm.value };
    this.userService.updateUser(this.userId, user).subscribe({
      next: () => { console.log('User mis à jour'); },
      error: (err: HttpErrorResponse) => { console.error('Erreur update', err); }
    });
  }
}