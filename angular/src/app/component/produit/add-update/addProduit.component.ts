import { Component } from '@angular/core';
import { ProduitService } from '../../../services/produit.service';
import { Produit } from '../../../models/produit.model';
import { MatDialog } from '@angular/material/dialog';
import { confirmeDialogComponent } from './confirmeDialog.component';



@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./main.scss']
})

export class AddProduitComponent {

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
    const produit = {
      nom: this.produit.nom,
      prix: this.produit.prix,
      quantitestock: this.produit.quantitestock,
      dernierajout: this.produit.dernierajout,
      perissable: this.produit.perissable,
      dateperemption: this.produit.dateperemption,
      fournisseurId: this.produit.fournisseurId,
      imageId: this.produit.imageId
    };
    
    this.produitService.createProduit(produit).subscribe({
      next: (response) => {
        console.log('Produit créé avec succès', response);
        this.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de la création', error);
      }
    });

    confrimAdd(): void {
    const dialogRef = this.dialog.open(confirmeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produitService.createProduit(id).subscribe({
          console.log('Produit créé avec succès');
          this.loadProduits();
        });
      }
    });


  }

  resetForm(): void {
    this.produit = {
      id: 0,
      nom: '',
      prix: 0,
      quantitestock: 0,
      dernierajout: new Date(),
      perissable: Boolean(),
      dateperemption: new Date(),
      fournisseurId: 0,
      imageId: 0,
    };
  }
}

export class addExistingProduitComponent {
  
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

  confrimUpdate(): void {
    const dialogRef = this.dialog.open(confirmeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.produitService.updateProduit().subscribe({
          console.log('Produit mis à jour');
          this.loadProduits();
        });
      }
    });
  }
}