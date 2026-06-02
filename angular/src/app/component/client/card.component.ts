import { Component, OnInit } from "@angular/core";
import { Produit } from "../../models/produit.model";
import { ProduitService } from "../../services/produit.service";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";


@Component({
    selector: "app-card",
    standalone: true,
    imports: [CommonModule, RouterModule, CurrencyPipe, RouterLink],
    templateUrl: "../../pages/client/card.component.html",
    styleUrls: ["../../../main.scss"],
})

export class CardComponent implements OnInit {
    produits: Produit[] = [];

    constructor(private produitService: ProduitService) {}

    ngOnInit(): void {
        this.loadProduits();
    }

    loadProduits(): void {
        this.produitService.getProduits().subscribe({
            next: (data: Produit[]) => { this.produits = data; },
            error: (error: any) => { console.error('Error chargement produits:', error); }
        });
    }
}