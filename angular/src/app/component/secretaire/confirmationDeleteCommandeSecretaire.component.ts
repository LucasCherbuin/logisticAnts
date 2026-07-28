import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-confirmation-delete-commande-secretaire',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  template: `
  <div class="overlay">
    <div class="popup">
      <p>Voulez-vous vraiment supprimer cette commande ?</p>
        <button class="button" (click)="confirm()">Confirmer</button>
        <button class="button" (click)="cancel()">Annuler</button>
    </div>
  </div> 
  `,
  styleUrls: ['../../../main.scss']
})
export class ConfirmationDeleteCommandeSecretaireComponent implements OnInit, OnDestroy {
  private timer: any

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDeleteCommandeSecretaireComponent>
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