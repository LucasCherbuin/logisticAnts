import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {  timer } from 'rxjs';

@Component({
    selector: 'confirmation-produit-add-commande',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="overlay" *ngIf="isVisible">
            <div class="popup">
                <p>produit ajouté</p>
            </div>
        </div>
    `,
    styleUrls: ['../../../../../main.scss'],
})
export class ConfirmationAddProduitComponent {
    isVisible: boolean = false;

    open(callback: () => void): void {
        this.isVisible = true;
        callback();
        this.close();
    }

    close(): void {
        timer(5000).subscribe(() => {
            this.isVisible = false;
        });
    }
}