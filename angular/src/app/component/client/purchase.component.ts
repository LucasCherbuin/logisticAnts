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
import { UserService } from "../../services/user.service";
import { jwtDecode } from "jwt-decode";
import { forkJoin, switchMap } from 'rxjs';
import { User } from "../../models/user.model";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-purchase',
    templateUrl: '../../pages/client/purchase.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ConfirmationCommandeComponent,
        RouterModule
    ],
    styleUrls: ['../../../main.scss'],
})
export class PurchaseComponent implements OnInit {
    form: FormGroup;
    commandes: Commande[] = [];
    articleCommandes: ArticleCommande[] = [];
    paymentOptions: string[] = ['Facture', 'carte', 'paypal', 'visa'];
    selectedPayement: string = 'Facture';
    cartItems: { produit: any; quantite: number}[] = [];

    @ViewChild(ConfirmationCommandeComponent) confirmationPopup!: ConfirmationCommandeComponent;

    constructor(
        private fb: FormBuilder,
        private articleCommandeService: ArticleCommandeService,
        private commandeService: CommandeService,
        private mailService: MailService,
        private paymentService: PaymentService,
        private userService: UserService
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
        this.cartItems = this.articleCommandeService.getItems();
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
        const token = localStorage.getItem('token');
        if (!token) return;
        const payload: any = jwtDecode(token);
        const pseudo = payload.sub;

        this.userService.getUserByPseudo(pseudo).subscribe({
            next: (user: User) => {
                const commande: Partial<Commande> = {
                    user: user,
                    payement: this.selectedPayement
                };
                this.commandeService.createCommande(commande as Commande).subscribe({
                    next: (created: Commande) => {
                        const saves = this.cartItems.map(item => {
                            const ac: Partial<ArticleCommande> = {
                                produit: item.produit,
                                quantite: item.quantite
                            };
                            return this.articleCommandeService.createArticleCommande(ac as ArticleCommande).pipe(
                                switchMap(savedAc =>
                                    this.articleCommandeService.assignCommande(savedAc.id, created.id)
                                )
                            );
                        });
                        forkJoin(saves).subscribe({
                            next: () => {
                                this.articleCommandeService.clearCart();
                                this.sendConfirmationMail(created, user.email);
                                this.loadCommandes();
                            }
                        });
                    },
                    error: (err: HttpErrorResponse) => { console.error('Erreur', err); }
                });
            },
            error: (err: HttpErrorResponse) => { console.error('Erreur user', err); }
        });
    }
}

    redirectionPayement(commande: Commande): void {
        const total = this.getTotalByCommande(commande.id);
        this.confirmationPopup.open(commande.id, total, () => {
            this.paymentService.getPay(total).subscribe({
                next: () => { this.loadCommandes(); },
                error: (err: any) => { console.error("Erreur paiement:", err); }
            });
        });
    }

    sendConfirmationMail(commande: Commande, email: string): void {
        const mail: MailRequest = {
            to: email,
            subject: `Commande n° ${commande.id}`,
            body: `Votre commande a bien été réalisée.`
        };
        this.mailService.sendMail(mail).subscribe({
            next: () => { console.log('Mail envoyé'); },
            error: (err: HttpErrorResponse) => { console.error('Erreur mail', err); }
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