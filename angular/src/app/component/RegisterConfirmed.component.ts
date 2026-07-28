import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {  timer } from 'rxjs';

@Component({
    selector: 'confirmation-registered',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="overlay" *ngIf="isVisible">
            <div class="popup">
                <p>Merci pour votre inscription, vous allez recevoir un mail de confirmation</p>
            </div>
        </div>
    `,
    styleUrls: ['../../main.scss'],
})
export class RegisterConfirmedComponent {
    isVisible: boolean = false;

    open(callback: () => void): void {
        this.isVisible = true;
        callback;
        this.close();
    }

    close(): void {
        timer(5000).subscribe(() => {
            this.isVisible = false;
        });
    }
}