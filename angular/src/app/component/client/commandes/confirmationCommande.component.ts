import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {  timer } from 'rxjs';

@Component({
    selector: 'app-confirmation-commande',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="overlay" *ngIf="isVisible">
            <div class="popup">
                <p>Redirection sur votre moyen de payment</p>
            </div>
        </div>
    `,
    styleUrls: ['../../../../main.scss'],
})
export class ConfirmationCommandeComponent {
    isVisible: boolean = false;

    open(commandeId: number, total: number, callback: () => void): void {
        this.isVisible = true;
    }

    close(): void {
        timer(5000).subscribe(() => {
            this.isVisible = false;
        });
    }
}