import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ArticleCommande } from "../../models/articleCommande.model";
import { ArticleCommandeService } from "../../services/articleCommande.service";
import { Commande } from "../../models/commande.model";
import { CommandeService } from "../../services/commande.service";
import { PaymentService } from "../../services/payment.service";
import { MailService, MailRequest } from '../../services/mailer.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { ConfirmationCommandeComponent } from "./commandes/confirmationCommande.component";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
    selector: 'app-purchase',
    templateUrl: '../../pages/client/purchase.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ConfirmationCommandeComponent
    ],
    styleUrls: ['../../../main.scss'],
})
export class PurchaseComponent implements OnInit {
    form: FormGroup;
    commandes: Commande[] = [];
    articleCommandes: ArticleCommande[] = [];
    selectedPayement: string = 'Facture';

    @ViewChild(ConfirmationCommandeComponent) confirmationPopup!: ConfirmationCommandeComponent;

    constructor(
        private fb: FormBuilder,
        private articleCommandeService: ArticleCommandeService,
        private commandeService: CommandeService,
        private mailService: MailService,
        private paymentService: PaymentService
    ) {
        this.form = this.fb.group({
            entreprise: ['', [Validators.required]],
            adresse:    ['', [Validators.required]],
            ville:      ['', [Validators.required]],
            NPA:        ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
        });
    }

    ngOnInit(): void {
        this.loadCommandes();
        this.loadArticleCommandes();
    }

    loadCommandes(): void {
        this.commandeService.getCommandes().subscribe({
            next: (data: Commande[]) => { this.commandes = data; },
            error: (error: any) => { console.error('Error fetching commandes:', error); }
        });
    }

    loadArticleCommandes(): void {
        this.articleCommandeService.getArticleCommandes().subscribe({
            next: (data: ArticleCommande[]) => { this.articleCommandes = data; },
            error: (error: any) => { console.error('Error fetching articleCommandes:', error); }
        });
    }

    getTotalByCommande(commandeId: number): number {
        return this.articleCommandes
            .filter(ac => ac.id === commandeId)
            .reduce((total, ac) => total + ac.quantite, 0);
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.commandeService.createCommande(this.form.value).subscribe({
                next: (commande: Commande) => {
                    this.sendConfirmationMail(commande);
                },
                error: (err: HttpErrorResponse) => { console.error('Erreur', err); }
            });
        }
    }

    sendConfirmationMail(commande: Commande): void {
        const mail: MailRequest = {
            to: this.form.value.entreprise,
            subject: `Commande n° ${commande.id}`,
            body: `Votre commande a bien été réalisée.`
        };
        this.mailService.sendMail(mail).subscribe({
            next: () => { console.log('Mail envoyé'); },
            error: (err: HttpErrorResponse) => { console.error('Erreur mail', err); }
        });
    }

    redirectionPayment(commande: Commande): void {
        const total = this.getTotalByCommande(commande.id);
        this.confirmationPopup.open(commande.id, total, () => {
            this.paymentService.getPay(total).subscribe({
                next: () => { this.loadCommandes(); },
                error: (err: any) => { console.error("Erreur paiement:", err); }
            });
        });
    }

    generateBillPDF(): void {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Facture", 14, 15);

        doc.setFontSize(12);
        doc.text(`Entreprise : ${this.form.value.entreprise}`, 14, 25);
        doc.text(`Adresse : ${this.form.value.adresse}`, 14, 32);
        doc.text(`Ville : ${this.form.value.ville}`, 14, 39);
        doc.text(`NPA : ${this.form.value.NPA}`, 14, 46);

        const headers = [['ID', 'Produit ID', 'Quantité']];
        const data = this.articleCommandes.map(ac => [
            ac.id,
            ac.produit.id,
            ac.quantite
        ]);

        autoTable(doc, {
            head: headers,
            body: data,
            startY: 55,
        });

        doc.save('facture.pdf');
    }
}