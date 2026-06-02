import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProduitService } from "../../services/produit.service";
import { Produit } from "../../models/produit.model";
import { CardComponent } from "./card.component";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-shop",
    standalone: true,
    imports: [CommonModule, FormsModule, CardComponent, RouterModule],
    templateUrl: '../../pages/client/shop.component.html',
    styleUrls: ['../../../main.scss'],
})
export class ShopComponent implements OnInit {
    produits: Produit[] = [];
    searchTerm: string = "";

    constructor(private produitService: ProduitService) {}

    ngOnInit(): void {
        this.loadProduits();
    }

    loadProduits(): void {
        this.produitService.getProduits().subscribe({
            next: (data: Produit[]) => { this.produits = data; },
            error: (error: any) => { console.error("Error fetching produits:", error); }
        });
    }

    onSearch(): void {
        if (this.searchTerm.trim() === "") {
            this.loadProduits();
        } else {
            this.produitService.searchProduits(this.searchTerm).subscribe({
                next: (data: Produit[]) => { this.produits = data; },
                error: (error: any) => { console.error("Error searching produits:", error); }
            });
        }
    }
}