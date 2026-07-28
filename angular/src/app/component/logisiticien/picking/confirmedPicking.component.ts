import { Component, ChangeDetectorRef, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Commande } from "../../../models/commande.model";

@Component({
    selector: 'app-confirmation-picking',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="overlay" *ngIf="isVisible">
            <div class="popup">
                <p>Avez vous bien selectionné le produit</p>
                <div class="actions">
                    <button class="buttonPopup" (click)="confirm()">Confirmer</button>
                    <button class="buttonPopup" (click)="cancel()">Annuler</button>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['../../../../main.scss'],
})


export class ConfirmationPickingComponent {
    @Input() commande: Commande | null = null;
    isVisible: boolean = false;
    private confirmCallback!: () => void;

    constructor(private cdr: ChangeDetectorRef) {}

    open(onConfirm: () => void): void {
        this.isVisible = true;
        this.confirmCallback = onConfirm;
        this.cdr.detectChanges();
    }

    confirm(): void {
        this.isVisible = false;
        this.cdr.detectChanges();
        this.confirmCallback();
    }

    cancel(): void {
        this.isVisible = false;
        this.cdr.detectChanges();
    }
}