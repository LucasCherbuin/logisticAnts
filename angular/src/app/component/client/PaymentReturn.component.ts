import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, switchMap } from 'rxjs';
import { CommandeService } from '../../services/commande.service';
import { ArticleCommandeService } from '../../services/articleCommande.service';
import { MailService, MailRequest } from '../../services/mailer.service';
import { FactureService } from '../../services/facture.service';
import { Commande } from '../../models/commande.model';
import { ArticleCommande } from '../../models/articleCommande.model';

@Component({
  selector: 'app-payment-return',
  standalone: true,
  template: `<p>Confirmation du paiement en cours...</p>`
})
export class PaymentReturnComponent implements OnInit {
  constructor(
    private commandeService: CommandeService,
    private articleCommandeService: ArticleCommandeService,
    private mailService: MailService,
    private factureService: FactureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pendingOrder = localStorage.getItem('pendingOrder');
    if (!pendingOrder) {
      this.router.navigate(['/']);
      return;
    }

    const order = JSON.parse(pendingOrder);

    const commande: Partial<Commande> = {
      user: { id: order.userId } as any,
      payement: order.payement
    };

    this.commandeService.createCommande(commande as Commande).subscribe({
      next: (created: Commande) => {
        const saves = order.items.map((item: any) => {
          const ac: Partial<ArticleCommande> = {
            produit: { id: item.produitId } as any,
            quantite: item.quantite
          };
          return this.articleCommandeService.createArticleCommande(ac as ArticleCommande).pipe(
            switchMap(savedAc => this.articleCommandeService.assignCommande(savedAc.id, created.id))
          );
        });

        forkJoin(saves).subscribe({
          next: () => {
            this.articleCommandeService.clearCart();
            localStorage.removeItem('pendingOrder');
            this.sendConfirmationMail(created, order.userEmail);
            this.factureService.generateBillPDF(
              created.id,
              order.facture,
              order.items.map((item: any) => ({
                nom: item.produitNom,
                quantite: item.quantite,
                prix: item.prix
              }))
            );
            this.router.navigate(['/purchase']);
          },
          error: (err: HttpErrorResponse) => console.error('Erreur enregistrement articles', err)
        });
      },
      error: (err: HttpErrorResponse) => console.error('Erreur création commande', err)
    });
  }

  sendConfirmationMail(commande: Commande, email: string): void {
    const mail: MailRequest = {
      to: email,
      subject: `Commande n° ${commande.id}`,
      body: `Votre commande a bien été réalisée.`
    };
    this.mailService.sendMail(mail).subscribe({
      next: () => console.log('Mail envoyé'),
      error: (err: HttpErrorResponse) => console.error('Erreur mail', err)
    });
  }
}