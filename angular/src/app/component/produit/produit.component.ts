import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../models/produit.model';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./main.scss']
})


    export class ProduitComponent implements OnInit {
    produits: Produit[] = [];

        constructor(private produitService: ProduitService) {}

        ngOnInit(): void {
            this.produitService.getProduits().subscribe(
                (data: Produit[]) => {
                    this.produits = data;
                }
            );
        }

    loadProduits(): void {
        this.produitService.getProduits().subscribe(
            (data: Produit[]) => {
                this.produits = data;
            },
            (error: any) => {
                console.error('Error fetching produits:', error);
            }
        );
    }   
}