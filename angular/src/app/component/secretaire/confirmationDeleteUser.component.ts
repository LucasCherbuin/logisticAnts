import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-delete-user',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  template: `
    <div class="overlay">
      <p>Attention l'utilisateur sera supprimé</p>
        <button class="button" (click)="confirm()">Confirmer</button>
        <button class="button" (click)="cancel()">Annuler</button>
      </div>
  `,
  styleUrls: ['../../../main.scss']
})
export class ConfirmationDeleteUserComponent implements OnInit, OnDestroy {
  private timer: any;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDeleteUserComponent>
  ) {}

  ngOnInit() {
    this.timer = setTimeout(() => {
      this.dialogRef.close(false);
    }, 5000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  confirm() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}