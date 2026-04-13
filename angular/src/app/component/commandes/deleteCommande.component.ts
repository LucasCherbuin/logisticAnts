import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';
import { Commande } from 'src/app/models/commande.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteCommandeComponent } from './confirmationCommandeDeleteProduit.component';
import { MailService } from 'src/app/services/mailer.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-delete-commande',
  templateUrl: './deleteCommande.component.html',
  styleUrls: ['./main.scss']
})
export class DeleteCommandeComponent implements OnInit {

  commandes: Commande[] = [];

  constructor(
    private commandeService: CommandeService,
    private dialog: MatDialog,
    private mailService: MailService
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getCommandes().subscribe({
      next: (data: Commande[]) => {
        this.commandes = data;
      },
      error: (error: any) => {
        console.error('Error fetching commandes:', error);
      }
    });
  }

  deleteCommande(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDeleteCommandeComponent);

    dialogRef.afterClosed().pipe(
      switchMap((result) => {
        if (!result) return [];

        return this.commandeService.deleteCommande(id).pipe(
          switchMap(() => {
            const mail = {
              to: this.email,
              subject: 'Commande supprimée',
              body: `Votre commande ${id} a été supprimée. Le remboursement arrivera dans quelques jours.`
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
      error: (err) => console.error('Erreur', err)
    });
  }
}