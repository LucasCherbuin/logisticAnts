import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete-produit',
  templateUrl: './deleteConfirmationProduit.component.html',
})
export class ConfirmationDeleteProduitComponent implements OnInit, OnDestroy {

  private timer: any;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDeleteProduitComponent>
  ) {}

  ngOnInit() {
    this.timer = setTimeout(() => {
      this.dialogRef.close(false); // fermeture auto (annulation)
    }, 5000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  confirm() {
    this.dialogRef.close(true); // validation
  }

  cancel() {
    this.dialogRef.close(false); // annulation
  }
}