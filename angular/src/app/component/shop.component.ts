import { Component, OnInit } from '@angular/core';
import  { ProduitService } from 'src/app/services/produit.service';
import { Produit } from 'src/app/models/produit.model';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./main.scss']
})
export class shopComponent implements OnInit {

    produits: Produit[] = [];
    searchTerm: string = '';

    constructor(private produitService: ProduitService) {}


    ngOnInit(): void {
        this.loadProduits();
    }

    loadProduits() {
            this.produitService.getProduits().subscribe(data => {
                this.produits = data;
            },
            (error: any) => {
            console.error('Error fetching produits', error);
            }
        );
    }

    onSearch() {
        if (this.searchTerm.trim() === '') {
            this.loadProduits();
        } else {
            this.produitService.searchProduits(this.searchTerm).subscribe(data => {
                this.produits = data;
            });
        }
    }
}