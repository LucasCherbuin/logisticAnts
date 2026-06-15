import { Component, OnInit, inject } from "@angular/core";
import { Produit } from "../../models/produit.model";
import { ProduitService } from "../../services/produit.service";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { RouterLink, RouterModule, Router } from "@angular/router";
import { ArticleCommandeService } from "../../services/articleCommande.service";

@Component({
    selector: "app-card",
    standalone: true,
    imports: [CommonModule, RouterModule, CurrencyPipe, RouterLink],
    templateUrl: "../../pages/client/card.component.html",
    styleUrls: ["../../../main.scss"],
})
export class CardComponent implements OnInit {
    produits: Produit[] = [];
    cartItems: Produit[] = [];
    private router = inject(Router);

    constructor(
        private produitService: ProduitService,
        private articleCommandeService: ArticleCommandeService
    ) {}

    get cartCount(): number {
        return this.articleCommandeService.cartItems$.value.length;
    }

    ngOnInit(): void {
        console.log('CardComponent initialisé');
        this.loadProduits();
    }

    loadProduits(): void {
        this.produitService.getProduits().subscribe({
            next: (data: Produit[]) => {
                console.log('PRODUITS:', data);
                this.produits = data;
            },
            error: (error: any) => {
                console.error('Error chargement produits:', error);
            }
        });
    }

    addToCart(produit: Produit): void {
        this.articleCommandeService.addToCart(produit);
    }

    
}