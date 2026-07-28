import { Component, OnInit, ViewChild } from '@angular/core';
import { ProduitService } from '../../../../services/produit.service';
import { Produit } from '../../../../models/produit.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationupdateProduitComponent } from './confirmationUpdateProduit.component';
import { Fournisseur } from '../../../../models/fournisseur.model';

@Component({
  selector: 'app-update-produit',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationupdateProduitComponent],
  templateUrl: '../../../../pages/logisticien/produit/updateProduit/updateProduit.component.html',
  styleUrls: ['../../../../../main.scss']
})
export class UpdateProduitComponent implements OnInit {
  @ViewChild('confirmationUpdate') confirmationUpdate!: ConfirmationupdateProduitComponent;

  produits: Produit[] = [];
  fournisseurs: Fournisseur[] = [];
  selectedProduit: Produit | null = null;
  selectedFile: File | null = null;

  constructor(
    private produitService: ProduitService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProduits();
  }

  loadProduits(): void {
  this.produitService.getProduits().subscribe(
    (data: Produit[]) => {
      console.log('DONNÉES REÇUES:', data);
      this.produits = data;
      console.log('PRODUITS APRÈS AFFECTATION:', this.produits);
    },
    (error: any) => { console.error('Error fetching produits:', error); }
  );
}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  selectProduit(produit: Produit): void {
    this.selectedProduit = { ...produit };
  }

  onSubmitUpdate(form: NgForm): void {
    if (form.invalid || !this.selectedProduit) return;
    this.produitService.updateProduit(this.selectedProduit.id, this.selectedProduit).subscribe({
      next: () => {
        console.log('CLIC DETECTE');
        this.confirmationUpdate.open(() => {
          console.log('DIALOG OPEN APPELE');
          this.loadProduits();
          this.selectedProduit = null;
        });
      },
      error: (err) => console.error('Erreur update', err)
    });
  }
}