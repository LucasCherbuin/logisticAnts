import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete-commande',
  templateUrl: './deleteConfirmationCommande.component.html',
  styleUrls: ['./main.scss']
})
export class ConfirmationDeleteCommandeComponent implements OnInit, OnDestroy {

  private timer: any;

  constructor(
    private dialogRef: MatDialogRef<ConfirmationDeleteCommandeComponent>
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
    this.dialogRef.close(true); // validation
  }

  cancel() {
    this.dialogRef.close(false); // annulation
  }
}