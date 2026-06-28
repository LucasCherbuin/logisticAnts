import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormControl } from "@angular/forms";
import { ProduitService } from "../../services/produit.service";
import { Produit } from "../../models/produit.model";
import { CardComponent } from "./card.component";
import { RouterModule } from "@angular/router";
import { startWith, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: "app-shop",
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, CardComponent, RouterModule],
    templateUrl: '../../pages/client/shop.component.html',
    styleUrls: ['../../../main.scss'],
})
export class ShopComponent implements OnInit {
    produits: Produit[] = [];
    filterfcvar = new FormControl('');

    constructor(private produitService: ProduitService) {}

    ngOnInit(): void {
        this.filterfcvar.valueChanges.pipe(
            startWith(''),
            switchMap(value => value
                ? this.produitService.searchProduits(value)
                : this.produitService.getProduits()
            )
        ).subscribe({
            next: (data: Produit[]) => { this.produits = data; },
            error: (error: any) => { console.error("Error:", error); }
        });
    }
}