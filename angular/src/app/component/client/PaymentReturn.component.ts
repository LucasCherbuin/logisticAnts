import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin, switchMap } from 'rxjs';
import { CommandeService } from '../../services/commande.service';
import { ArticleCommandeService } from '../../services/articleCommande.service';
import { MailService, MailRequest } from '../../services/mailer.service';
import { Commande } from '../../models/commande.model';
import { ArticleCommande } from '../../models/articleCommande.model';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
            this.generateBillPDF(created.id, order);
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

  generateBillPDF(commandeId: number, order: any): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Facture", 14, 15);

    doc.setFontSize(12);
    doc.text(`Entreprise : ${order.facture.entreprise}`, 14, 25);
    doc.text(`Adresse : ${order.facture.adresse}`, 14, 32);
    doc.text(`Ville : ${order.facture.ville}`, 14, 39);
    doc.text(`NPA : ${order.facture.NPA}`, 14, 46);

    const headers = [['Article', 'Quantité', 'Prix']];
    const data = order.items.map((item: any) => [
      item.produitNom,
      item.quantite,
      item.prix + '.-'
    ]);

    autoTable(doc, { head: headers, body: data, startY: 55 });

    doc.save('facture.pdf');

    const pdfBytes = doc.output('arraybuffer');
    this.commandeService.updatedFacture(commandeId, pdfBytes).subscribe({
      error: err => console.error('Erreur upload facture', err)
    });
  }
}