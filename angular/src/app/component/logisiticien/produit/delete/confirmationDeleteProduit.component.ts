import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-delete-produit',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  template: `
  <div class="overlay">
     <div class="popup">
      <p>Voulez vous supprimer ce produit</p>
        <button class="buttonPopup" (click)="confirm()">Confirmer</button>
        <button class="buttonPopup" (click)="cancel()">Annuler</button>
    </div>
  </div>
  `,
  styleUrls: ['../../../../../main.scss']
})
export class ConfirmationDeleteProduitComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationDeleteProduitComponent>) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}