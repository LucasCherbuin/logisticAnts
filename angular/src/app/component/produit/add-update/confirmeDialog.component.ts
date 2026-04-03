import { matDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

export class confirmeDialogComponent {
    constructor(public dialogRef: matDialogRef<confirmeDialogComponent>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
