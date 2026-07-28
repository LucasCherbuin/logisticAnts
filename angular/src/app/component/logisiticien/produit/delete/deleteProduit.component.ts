import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../../../services/produit.service';
import { Produit } from '../../../../models/produit.model';
import { ConfirmationDeleteProduitComponent } from './confirmationDeleteProduit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-produit',
  standalone: true,
  imports: [],
  templateUrl: '../../../../pages/logisticien/produit/deleteProduit/deleteProduit.component.html',
  styleUrls: ['../../../../../main.scss']
})
export class DeleteProduitComponent implements OnInit {
  produits: Produit[] = [];
  selectedProduit: Produit | null = null;

  constructor(private produitService: ProduitService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe(
      (data: Produit[]) => { this.produits = data; },
      (error: any) => { console.error('Error fetching produits:', error); }
    );
  }

  deleteProduit(produit: Produit): void {
    this.selectedProduit = produit;
    this.ouvrirConfirmation();
  }

  ouvrirConfirmation(): void {
    console.log('CLIC DETECTE');
    const dialogRef = this.dialog.open(ConfirmationDeleteProduitComponent);
    console.log('DIALOG OPEN APPELE', dialogRef);
    dialogRef.afterClosed().subscribe((result: boolean) => {
      console.log('DIALOG FERME, résultat:', result);
      if (result) {
        this.execDelete();
      }
    });
  }

  execDelete(): void {
    if (!this.selectedProduit) return;
    this.produitService.deleteProduit(this.selectedProduit.id).subscribe({
      next: () => {
        this.produits = this.produits.filter(p => p.id !== this.selectedProduit!.id);
        this.selectedProduit = null;
      },
      error: (err: any) => console.error('erreur suppression')
    });
  }
}