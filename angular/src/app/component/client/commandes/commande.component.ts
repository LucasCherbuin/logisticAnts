import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommandeService } from "../../../services/commande.service";
import { Commande } from "../../../models/commande.model";
import { ArticleCommandeService } from "../../../services/articleCommande.service";
import { ArticleCommande } from "../../../models/articleCommande.model";
import { Produit } from "../../../models/produit.model";
import { ProduitService } from "../../../services/produit.service";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteCommandeComponent } from "../deleteCommande.component";

@Component({
    selector: 'app-commande',
    standalone: true,
    imports: [CommonModule, MatDialogModule, DeleteCommandeComponent],
    templateUrl: '../../../pages/client/commande.component.html',
    styleUrls: ['../../../../main.scss'],
})
export class CommandeComponent implements OnInit {
    commandes: Commande[] = [];
    articleCommandes: ArticleCommande[] = [];
    produits: Produit[] = [];

    constructor(
        private commandeService: CommandeService,
        private articleCommandeService: ArticleCommandeService,
        private produitService: ProduitService
    ) {}

    ngOnInit(): void {
        this.loadCommandes();
        this.loadArticleCommandes();
        this.loadProduits();
    }

    loadCommandes(): void {
        this.commandeService.getCommandes().subscribe({
            next: (data: Commande[]) => { this.commandes = data; },
            error: (error: any) => { console.error("Error fetching commandes:", error); }
        });
    }

    loadArticleCommandes(): void {
        this.articleCommandeService.getArticleCommandes().subscribe({
            next: (data: ArticleCommande[]) => { this.articleCommandes = data; },
            error: (error: any) => { console.error("Error fetching articleCommandes:", error); }
        });
    }

    loadProduits(): void {
        this.produitService.getProduits().subscribe({
            next: (data: Produit[]) => { this.produits = data; },
            error: (error: any) => { console.error("Error fetching produits:", error); }
        });
    }

    getTotalByCommande(commandeId: number): number {
        return this.articleCommandes
            .filter(ac => ac.id === commandeId)
            .reduce((total, ac) => {
                const produit = this.produits.find(p => p.id === ac.produit.id);
                return total + (produit ? produit.prix * ac.quantite : 0);
            }, 0);
    }
}