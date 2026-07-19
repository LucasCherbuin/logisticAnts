import { Component, OnInit, ViewChildren, QueryList, ElementRef } from "@angular/core";
import { CurrencyPipe, CommonModule, AsyncPipe } from "@angular/common";
import { ArticleCommandeService } from "../../services/articleCommande.service";
import { RegisterService } from "../../services/register.service";
import { Commande } from "../../models/commande.model";
import { User } from "../../models/user.model";
import { Produit } from "../../models/produit.model";
import { UserService } from "../../services/user.service";
import { Observable } from 'rxjs';
import { ConfirmationCommandeComponent } from "./commandes/confirmationCommande.component";
import { RouterModule, Router } from "@angular/router";
import { inject } from '@angular/core';

@Component({
    selector: "app-cart",
    templateUrl: "../../pages/client/cart.component.html",
    standalone: true,
    imports: [CommonModule, CurrencyPipe, ConfirmationCommandeComponent, RouterModule, AsyncPipe],
    providers: [CurrencyPipe],
    styleUrls: ["../../../main.scss"]
})

export class CartComponent implements OnInit {

    @ViewChildren("subTotalWrap") subTotalItems!: QueryList<ElementRef>;
    items$!: Observable<{ produit: Produit; quantite: number }[]>;


    currentUser: User | null = null;
    private router = inject(Router);

    quantiteOptions = Array.from({ length: 20 }, (_, i) => i + 1);

    constructor(
        private articleCommandeService: ArticleCommandeService,
        private registerService: RegisterService,
        private userService: UserService,
        private currencyPipe: CurrencyPipe
    ) {}

    get items(): { produit: Produit; quantite: number }[] {
        return [...this.articleCommandeService.getItems()];
    }

    get total(): number {
        return this.articleCommandeService.cartItems$.value.reduce(
            (sum, x) => sum + x.produit.prix * x.quantite, 0
        );
    }
    
     changeSubtotal(item: { produit: Produit; quantite: number }, event: Event | undefined): void {
        if (!event) return;
        const nouvelleQuantite = Number((event.target as HTMLSelectElement).value);
        this.articleCommandeService.updateQuantite(item.produit, nouvelleQuantite);
    }

    deleteFromCart(produit: Produit): void {
        this.articleCommandeService.removeItem(produit);
    }

    getPseudoFromToken(): string | null {
        const token = this.registerService.getToken();
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.id ?? payload.userId ?? payload.sub ?? null;
        } catch {
            return null;
        }
    }

    validerCommande(): void {
        if (!this.currentUser) {
            console.error('Utilisateur non chargé');
            return;
        }
        const articleCommandes = this.items.map(i => ({
            id: null,
            produit: i.produit,
            quantite: i.quantite,
            commande: null
        }));
        const commande: Commande = {
            id: null as any,
            articleCommandes: articleCommandes as any,
            user: this.currentUser,
            payement: 'en attente',
            facture: null as any
        };
        this.articleCommandeService.validerCommande(commande).subscribe({
            next: () => {
                this.articleCommandeService.clearCart();
                this.router.navigate(['/purchase'], { state: { commandeId: commande.id } });
            },
            error: (err) => console.error('Erreur validation commande:', err)
        });
    }

    ngOnInit(): void {
        this.items$ = this.articleCommandeService.cartItems$;
        console.log('Items au chargement:', this.articleCommandeService.cartItems$.value);
        
        const pseudo = this.getPseudoFromToken();
        if (pseudo) {
            this.userService.getUserByPseudo(pseudo).subscribe({
                next: (user) => this.currentUser = user,
                error: (err) => console.error('Erreur chargement utilisateur:', err)
            });
        }
    }
}