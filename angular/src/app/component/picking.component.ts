import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { ProduitService } from '../services/produit.service';
import { Commande } from '../models/commande.model';
import { Produit } from '../models/produit.model';
import { ArticleCommande } from '../models/ArticleCommande.model';

@Component({
  selector: 'app-picking',
  templateUrl: './picking.component.html',
  styleUrls: ['./main.scss']
})
export class PickingComponent implements OnInit {

  commandes: Commande[] = [];
  produits: Produit[] = [];

  loading: boolean = false;

  constructor(
    private commandeService: CommandeService,
    private produitService: ProduitService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => this.produits = data,
      error: (err) => console.error(err)
    });

    this.commandeService.getCommandes().subscribe({
      next: (data) => this.commandes = data,
      error: (err) => console.error(err)
    });
  }


  onSubmit(): void {
    this.loading = true;

    this.commandes.forEach(commande => {

      const article: ArticleCommande = commande.articleCommande;

      if (!article) {
        console.error('ArticleCommande manquant');
        return;
      }


      const produit = this.produits.find(p => p.id === article.produitId);

      if (!produit) {
        console.error('Produit introuvable');
        return;
      }


      if (produit.quantitestock < article.quantite) {
        alert(`Stock insuffisant pour ${produit.nom}`);
        return;
      }


      produit.quantitestock -= article.quantite;


      this.produitService.updateProduit(produit).subscribe({
        next: () => console.log(`Produit ${produit.nom} mis à jour`),
        error: (err) => console.error(err)
      });


      this.deleteCommande(commande.id);

    });

    this.loading = false;
  }


  deleteCommande(id: number): void {
    this.commandeService.deleteCommande(id).subscribe({
      next: () => {
        console.log('Commande supprimée');


        this.commandes = this.commandes.filter(c => c.id !== id);
      },
      error: err => console.error(err)
    });
  }


  pickingSingleCommande(commande: Commande): void {

    const article = commande.articleCommande;

    if (!article) return;

    const produit = this.produits.find(p => p.id === article.produitId);

    if (!produit) return;

    if (produit.quantitestock < article.quantite) {
      alert(`Stock insuffisant pour ${produit.nom}`);
      return;
    }

    produit.quantitestock -= article.quantite;

    this.produitService.updateProduit(produit).subscribe(() => {
      this.deleteCommande(commande.id);
    });
  }
}