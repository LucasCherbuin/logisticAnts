import { Component, Input } from "@angular/core";
import { Produit } from "../../models/produit.model";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";
import { ArticleCommandeService } from "../../services/articleCommande.service";

@Component({
    selector: "app-card",
    standalone: true,
    imports: [CommonModule, RouterModule, CurrencyPipe, RouterLink],
    templateUrl: "../../pages/client/card.component.html",
    styleUrls: ["../../../main.scss"],
})
export class CardComponent {
    @Input() produits: Produit[] = [];

    constructor(private articleCommandeService: ArticleCommandeService) {}

    get cartCount(): number {
        return this.articleCommandeService.cartItems$.value.length;
    }

    addToCart(produit: Produit): void {
        this.articleCommandeService.addToCart(produit);
    }
}