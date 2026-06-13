import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../models/commande.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ConfirmationDeleteCommandeComponent } from './commandes/confirmationDeleteCommande.component';
import { MailService } from '../../services/mailer.service';

@Component({
    selector: 'app-delete-commande',
    standalone: true,
    imports: [ConfirmationDeleteCommandeComponent],
    template: `
        <button (click)="ouvrirConfirmation()"><i class="ph ph-trash"></i> Supprimer</button>
        <app-confirmation-delete #confirmDialog></app-confirmation-delete>
    `,
    styleUrls: ["../../../main.scss"]
})
export class DeleteCommandeComponent implements OnInit {
    @Input() commandeId!: number;
    @ViewChild('confirmDialog') confirmDialog!: ConfirmationDeleteCommandeComponent;
    user!: User;

    constructor(
        private commandeService: CommandeService,
        private userService: UserService,
        private mailService: MailService
    ) {}

    ngOnInit(): void {
        this.loadUser();
    }

    loadUser(): void {
        this.userService.getUsers().subscribe({
            next: (data: User[]) => { this.user = data[0]; },
            error: (error: any) => { console.error('Error fetching user:', error); }
        });
    }

    ouvrirConfirmation(): void {
        this.confirmDialog.open(() => this.execDelete());
    }

    execDelete(): void {
        this.commandeService.deleteCommande(this.commandeId).subscribe({
            next: () => {
                const mail = {
                    to: this.user.email,
                    subject: 'Commande supprimée',
                    body: `Votre commande ${this.commandeId} a été supprimée. Le remboursement arrivera dans quelques jours.`
                };
                this.mailService.sendMail(mail).subscribe({
                    next: () => console.log('Commande supprimée + email envoyé'),
                    error: (err: any) => console.error('Erreur mail:', err)
                });
            },
            error: (err: any) => console.error('Erreur suppression:', err)
        });
    }
}