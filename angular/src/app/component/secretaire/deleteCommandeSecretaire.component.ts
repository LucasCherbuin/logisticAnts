import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../models/commande.model';
import { Prix } from '../../models/nosql/prix.model';
import { AdminDashboardService } from '../../services/adminDashboard.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ConfirmationDeleteCommandeSecretaireComponent } from './confirmationDeleteCommandeSecretaire.component';
import { MailService } from '../../services/mailer.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-commande-secretaire',
    standalone: true,
    imports: [],
    template: `<button class="deleteCommandeSecretaire " (click)="ouvrirConfirmation()"><i class="ph ph-x-circle"></i></button>`,
    styleUrls: ["../../../main.scss"]
})
export class DeleteCommandeComponentSecretaire implements OnInit {
    @Input() commandeId!: number;
    @Output() commandeSupprimee = new EventEmitter<number>();
    user!: User;

    constructor(
        private commandeService: CommandeService,
        private userService: UserService,
        private mailService: MailService,
        private adminDashboardService: AdminDashboardService,
        private dialog: MatDialog
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
        const dialogRef = this.dialog.open(ConfirmationDeleteCommandeSecretaireComponent);
        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.execDelete();
            }
        });
    }

    execDelete(): void {
        this.commandeService.deleteCommande(this.commandeId).subscribe({
            next: () => {
                this.commandeSupprimee.emit(this.commandeId);
                const mail = {
                    to: this.user.email,
                    subject: 'Commande supprimée',
                    body: `Votre commande ${this.commandeId} a été supprimée par un de nos collaborateurs. Le remboursement arrivera dans quelques jours. Si il s'agit d'une erreur, veuillez contacter le service client.`
                };
                this.mailService.sendMail(mail).subscribe({
                    next: () => console.log('Email envoyé'),
                    error: (err: any) => console.error('Erreur mail:', err)
                });
                const prixEntry: Omit<Prix, 'id'> = {
                    prixTotal: 0,
                    remboursement: 1,
                    achat: 0,
                    date: new Date()
                };
                this.adminDashboardService.createPrix(prixEntry).subscribe({
                    next: () => console.log('Remboursement enregistré'),
                    error: (err: any) => console.error('Erreur remboursement:', err)
                });
            },
            error: (err: any) => console.error('Erreur suppression:', err)
        });
    }
}