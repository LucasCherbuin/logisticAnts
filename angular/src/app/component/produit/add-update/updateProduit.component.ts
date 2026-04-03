import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../models/produit.model';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./main.scss']
})
export class UpdateProduitComponent implements OnInit {

  produit: Produit = {
    id: 0,
    nom: '',
    prix: 0,
    quantitestock: 0,
    dernierajout: new Date(),
    perissable: false,
    dateperemption: new Date(),
    fournisseurId: 0,
    imageId: 0
  };

  constructor(private produitService: ProduitService) {}

  onSubmit(): void {
    this.produitService.updateProduit(this.produit.id, this.produit).subscribe({
      next: (response) => {
        console.log('Produit mis à jour', response);
      },
      error: (error) => {
        console.error('Erreur update', error);
      }
    });
  }
}