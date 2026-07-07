import { Component, OnInit, ViewChild } from '@angular/core';
import { ProduitService } from '../../../../services/produit.service';
import { Produit } from '../../../../models/produit.model';
import { ConfirmationDeleteProduitComponent } from './confirmationDeleteProduit.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-produit',
  standalone: true,
  templateUrl: '../../../../pages/logisticien/produit/deleteProduit/deleteProduit.component.html',
  imports: [CommonModule, ConfirmationDeleteProduitComponent],
  styleUrls: ['../../../../../main.scss']
})
export class DeleteProduitComponent implements OnInit {
  @ViewChild('confirmationDelete') confirmationDelete!: ConfirmationDeleteProduitComponent;

  produits: Produit[] = [];
  selectedProduit: Produit | null = null;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe(
      (data: Produit[]) => { this.produits = data; },
      (error: any) => { console.error('Error fetching produits:', error); }
    );
  }

  selectProduit(produit: Produit): void {
    this.selectedProduit = { ...produit };
  }

  deleteProduit(produit: Produit): void {
    this.confirmationDelete.open(() => {
      this.produitService.deleteProduit(produit.id).subscribe({
        next: () => this.loadProduits(),
        error: (err) => console.error('Erreur suppression', err)
      });
    });
  }
}