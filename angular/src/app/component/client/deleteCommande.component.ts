import { Component, Input, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../models/commande.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteCommandeComponent } from './commandes/confirmationDeleteCommande.component';
import { MailService } from '../../services/mailer.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-delete-commande',
    standalone: true,
    template: ``,
    styleUrls: ["../../../main.scss"]
})
export class DeleteCommandeComponent implements OnInit {
    @Input() commandeId!: number;
    commandes: Commande[] = [];
    user!: User;

    constructor(
        private commandeService: CommandeService,
        private userService: UserService,
        private dialog: MatDialog,
        private mailService: MailService
    ) {}

    ngOnInit(): void {
        this.loadCommandes();
        this.loadUser();
    }

    loadCommandes(): void {
        this.commandeService.getCommandes().subscribe({
            next: (data: Commande[]) => { this.commandes = data; },
            error: (error: any) => { console.error('Error fetching commandes:', error); }
        });
    }

    loadUser(): void {
        this.userService.getCurrentUser().subscribe({
            next: (data: User) => { this.user = data; },
            error: (error: any) => { console.error('Error fetching user:', error); }
        });
    }
    

    deleteCommande(): void {
        const dialogRef = this.dialog.open(ConfirmationDeleteCommandeComponent);
        dialogRef.afterClosed().pipe(
            switchMap((result) => {
                if (!result) return [];
                return this.commandeService.deleteCommande(this.commandeId).pipe(
                    switchMap(() => {
                        const mail = {
                            to: this.user.email,
                            subject: 'Commande supprimée',
                            body: `Votre commande ${this.commandeId} a été supprimée. Le remboursement arrivera dans quelques jours.`
                        };
                        return this.mailService.sendMail(mail);
                    })
                );
            })
        ).subscribe({
            next: () => {
                console.log('Commande supprimée + email envoyé');
                this.loadCommandes();
            },
            error: (err: any) => console.error('Erreur', err)
        });
    }

    confirmationDeleteCommande(commande: Commande): void {
        this.deleteCommande();
    }
}