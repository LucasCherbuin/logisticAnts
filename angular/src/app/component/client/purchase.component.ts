import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ArticleCommande } from "../../models/articleCommande.model";
import { ArticleCommandeService } from "../../services/articleCommande.service";
import { Commande } from "../../models/commande.model";
import { CommandeService } from "../../services/commande.service";
import { PaymentService } from "../../services/payment.service";
import { FactureService } from "../../services/facture.service";
import { AdminDashboardService } from "../../services/adminDashboard.service";
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { ConfirmationCommandeComponent } from "./commandes/confirmationCommande.component";
import { DeleteCommandeComponent } from "./deleteCommande.component";
import { UserService } from "../../services/user.service";
import { jwtDecode } from "jwt-decode";
import { User } from "../../models/user.model";
import { RouterModule } from "@angular/router";
import { forkJoin, switchMap } from 'rxjs';

@Component({
    selector: 'app-purchase',
    templateUrl: '../../pages/client/purchase.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        ConfirmationCommandeComponent,
        DeleteCommandeComponent,
        RouterModule,
    ],
    styleUrls: ['../../../main.scss'],
})
export class PurchaseComponent implements OnInit, AfterViewInit {
    form: FormGroup;
    commandes: Commande[] = [];
    articleCommandes: ArticleCommande[] = [];
    paymentOptions: string[] = ['Facture', 'carte', 'paypal', 'twint'];
    selectedPayement: string = 'Facture';
    showCarteOptions: boolean = false;
    selectedCarte: string = '';
    carteOptions: string[] = ['Mastercard', 'Visa', 'American Express'];
    cartItems: { produit: any; quantite: number }[] = [];

    @ViewChild(ConfirmationCommandeComponent) confirmationPopup!: ConfirmationCommandeComponent;

    constructor(
        private fb: FormBuilder,
        private articleCommandeService: ArticleCommandeService,
        private commandeService: CommandeService,
        private paymentService: PaymentService,
        private factureService: FactureService,
        private userService: UserService,
        private adminDashboardService: AdminDashboardService,
    ) {
        this.form = this.fb.group({
            entreprise: ['', [Validators.required]],
            adresse: ['', [Validators.required]],
            ville: ['', [Validators.required]],
            NPA: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
        });
    }

    ngOnInit(): void {
        this.loadCommandes();
        this.cartItems = this.articleCommandeService.getItems();
    }

    ngAfterViewInit(): void {
        console.log('confirmationPopup:', this.confirmationPopup);
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

    getTotalByCommande(commande: Commande): number {
        if (!commande.articleCommandes) return 0;
        return commande.articleCommandes.reduce((total, ac) => total + (ac.produit.prix * ac.quantite), 0);
    }

    onSubmit(): void {
        if (this.form.valid) {
            const token = localStorage.getItem('token');
            if (!token) return;
            const payload: any = jwtDecode(token);
            const pseudo = payload.sub;

            this.userService.getUserByPseudo(pseudo).subscribe({
                next: (user: User) => {
                    const payement = this.selectedPayement === 'carte' ? this.selectedCarte : this.selectedPayement;

                    if (this.selectedPayement === 'Facture') {
                        this.createCommandeDirect(user, payement);
                        return;
                    }

                    localStorage.setItem('pendingOrder', JSON.stringify({
                        userId: user.id,
                        userEmail: user.email,
                        payement: payement,
                        items: this.cartItems.map(item => ({
                            produitId: item.produit.id,
                            produitNom: item.produit.nom,
                            quantite: item.quantite,
                            prix: item.produit.prix
                        })),
                        facture: {
                            entreprise: this.form.value.entreprise,
                            adresse: this.form.value.adresse,
                            ville: this.form.value.ville,
                            NPA: this.form.value.NPA
                        }
                    }));

                    this.redirectionPayement();
                },
                error: (err: HttpErrorResponse) => { console.error('Erreur user', err); }
            });
        }
    }

    createCommandeDirect(user: User, payement: string): void {
        const commande: Partial<Commande> = {
            user: user,
            payement: payement
        };

        this.commandeService.createCommande(commande as Commande).subscribe({
            next: (created: Commande) => {
                const saves = this.cartItems.map(item => {
                    const ac: Partial<ArticleCommande> = {
                        produit: item.produit,
                        quantite: item.quantite
                    };
                    return this.articleCommandeService.createArticleCommande(ac as ArticleCommande).pipe(
                        switchMap(savedAc => this.articleCommandeService.assignCommande(savedAc.id, created.id))
                    );
                });

                forkJoin(saves).subscribe({
                    next: () => {
                        this.articleCommandeService.clearCart();
                        this.factureService.generateBillPDF(
                            created.id,
                            {
                                entreprise: this.form.value.entreprise,
                                adresse: this.form.value.adresse,
                                ville: this.form.value.ville,
                                NPA: this.form.value.NPA
                            },
                            this.cartItems.map(item => ({
                                nom: item.produit.nom,
                                quantite: item.quantite,
                                prix: item.produit.prix
                            }))
                        );
                        this.loadCommandes();
                    },
                    error: (err: HttpErrorResponse) => { console.error('Erreur enregistrement articles', err); }
                });
            },
            error: (err: HttpErrorResponse) => { console.error('Erreur création commande', err); }
        });
    }

    redirectionPayement(): void {
        const total = this.cartItems.reduce((sum, item) => sum + (item.produit.prix * item.quantite), 0);
        const paymentMethod = this.selectedPayement === 'carte' ? this.selectedCarte : this.selectedPayement;

        setTimeout(() => {
            if (this.confirmationPopup) {
                this.confirmationPopup.open(total, () => {
                    this.paymentService.getPay(total, paymentMethod).subscribe({
                        next: (res: any) => {
                            console.log('réponse paiement', res);
                            try {
                                const parsed = typeof res === 'string' ? JSON.parse(res) : res;
                                if (parsed.redirectUrl) {
                                    window.location.href = parsed.redirectUrl;
                                }
                            } catch {
                                // pas de redirection
                            }
                        },
                        error: (err: any) => { console.error("Erreur paiement:", err); }
                    });
                });
            }
        }, 0);
    }
}