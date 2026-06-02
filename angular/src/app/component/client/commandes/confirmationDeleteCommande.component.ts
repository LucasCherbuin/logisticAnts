import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-confirmation-delete',
    standalone: true,
    imports: [CommonModule],
    template: `
                <div class="overlay" *ngIf="isVisible">
                    <div class="popup">
                        <p>Cette action est irréversible.</p>
                        <p>Voulez-vous vraiment supprimer cette commande ?</p>
                        <div class="actions">
                            <button (click)="confirm()">Confirmer</button>
                            <button (click)="cancel()">Annuler</button>
                        </div>
                    </div>
                </div>
            `,
    styleUrls: ['../../../../main.scss'],
    })

    export class ConfirmationDeleteCommandeComponent {
        isVisible: boolean = false;
        private confirmCallback!: () => void;

        open(onConfirm: () => void): void {
            this.isVisible = true;
            this.confirmCallback = onConfirm;
        }

        confirm(): void {
            this.isVisible = false;
            this.confirmCallback();
        }

        cancel(): void {
            this.isVisible = false;
        }
    }