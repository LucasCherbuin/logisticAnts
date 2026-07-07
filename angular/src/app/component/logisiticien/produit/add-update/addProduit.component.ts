import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../../../../services/produit.service';
import { Produit } from '../../../../models/produit.model';
import { Fournisseur } from '../../../../models/fournisseur.model';
import { FournisseurService } from '../../../../services/fournisseur.service';
import { ConfirmationAddProduitComponent } from './confirmationAddProduit.component';
import { ConfirmationupdateProduitComponent } from './confirmationUpdateProduit.component';

@Component({
  selector: 'app-add-produit',
  standalone: true,
  templateUrl: '../../../../pages/logisticien/produit/addProduit/addProduit.component.html',
  imports: [CommonModule, FormsModule, ConfirmationAddProduitComponent, ConfirmationupdateProduitComponent],
  styleUrls: ['../../../../../main.scss']
})
export class AddProduitComponent implements OnInit {
  @ViewChild('confirmationAdd') confirmationAdd!: ConfirmationAddProduitComponent;
  @ViewChild('confirmationUpdate') confirmationUpdate!: ConfirmationupdateProduitComponent;

  produits: Produit[] = [];
  fournisseurs: Fournisseur[] = [];
  selectedProduit: Produit | null = null;
  newProduit: Produit = this.emptyProduit();
  newFournisseur: Fournisseur = this.emptyFournisseur();
  selectedFournisseurId: number | null = null;
  showNewFournisseurForm: boolean = false;
  selectedFile: File | null = null;

   get selectedFournisseurNom(): string {
    const found = this.fournisseurs.find(f => f.id === this.selectedFournisseurId);
    return found ? found.nom : '';
  }

  constructor(
    private produitService: ProduitService,
    private fournisseurService: FournisseurService
  ) {}

  ngOnInit(): void {
    this.loadProduits();
    this.loadFournisseurs();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe(
      (data: Produit[]) => { this.produits = data; },
      (error: any) => { console.error('Error fetching produits:', error); }
    );
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseurs().subscribe(
      (data: Fournisseur[]) => { this.fournisseurs = data; },
      (error: any) => { console.error('Error fetching fournisseurs:', error); }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onFournisseurSelectionChange(value: string): void {
    this.showNewFournisseurForm = value === 'addFournisseur';
  }

  onSubmitNew(form: NgForm): void {
    if (form.invalid) return;

    if (this.showNewFournisseurForm) {
      this.fournisseurService.createFournisseur(this.newFournisseur).subscribe({
        next: (createdFournisseur) => {
          this.newProduit.fournisseur = createdFournisseur;
          this.saveProduit(form);
          this.loadFournisseurs();
          this.newFournisseur = this.emptyFournisseur();
        },
        error: (err) => console.error('Erreur création fournisseur', err)
      });
    } else {
      this.saveProduit(form);
    }
  }

  private saveProduit(form: NgForm): void {
    this.produitService.createProduit(this.newProduit).subscribe({
      next: () => {
        this.confirmationAdd.open(() => {
          this.loadProduits();
          this.newProduit = this.emptyProduit();
          form.resetForm();
        });
      },
      error: (err) => console.error('Erreur création produit', err)
    });
  }

  onSubmitUpdate(form: NgForm): void {
    if (form.invalid || !this.selectedProduit) return;
    this.produitService.updateProduit(this.selectedProduit.id, this.selectedProduit).subscribe({
      next: () => {
        this.confirmationUpdate.open(() => {
          this.loadProduits();
          this.selectedProduit = null;
        });
      },
      error: (err) => console.error('Erreur update', err)
    });
  }

  selectProduit(produit: Produit): void {
    this.selectedProduit = { ...produit };
  }

  private emptyProduit(): Produit {
  return {
    id: 0,
    nom: '',
    prix: 0,
    quantiteStock: 0,
    dernierAjout: new Date(),
    perissable: false,
    datePeremption: new Date(),
    fournisseur: undefined,
    image: undefined
  };
}

  private emptyFournisseur(): Fournisseur {
    return {
      id: 0,
      nom: '',
      email: '',
      adresse: ''
    };
  }
}