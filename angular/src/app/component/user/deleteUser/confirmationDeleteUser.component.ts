import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete-user',
  templateUrl: './deleteConfirmationuser.component.html',
  styleUrls: ['./main.scss']
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
    this.dialogRef.close(true); // validation
  }

  cancel() {
    this.dialogRef.close(false); // annulation
  }
}