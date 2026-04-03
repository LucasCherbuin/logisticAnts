import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../../services/produit.service';
import { Produit } from '../../../models/produit.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDeleteProduitComponent } from './confirmationDeleteProduit.component';

@Component({
  selector: 'app-delete-produit',
  templateUrl: './deleteConfirmation.component.html',
  styleUrls: ['./main.scss']
})
export class DeleteProduitComponent implements OnInit {

  produits: Produit[] = [];

  constructor(
    private produitService: ProduitService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProduits();
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

  deleteProduit(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDeleteProduitComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produitService.delete(id).subscribe(() => {
          console.log('Produit supprimé');
          this.loadProduits(); // refresh liste
        });
      }
    });
  }
}