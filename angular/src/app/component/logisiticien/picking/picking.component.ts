import { Component, OnInit, ViewChild } from '@angular/core';
import { CommandeService } from '../../../services/commande.service';
import { PickingService } from '../../../services/picking.service';
import { Commande } from '../../../models/commande.model';
import { ArticleCommande } from '../../../models/articleCommande.model';
import { ConfirmationPickingComponent } from './confirmedPicking.component';
import { ArticleCommandeService } from '../../../services/articleCommande.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-picking',
  standalone: true,
  imports: [ CommonModule, ConfirmationPickingComponent],
  templateUrl: '../../../pages/logisticien/picking/picking.component.html',
  styleUrls: ['../../../../main.scss']
})
export class PickingComponent implements OnInit {
  commandes: Commande[] = [];
  loading: boolean = false;
  pendingArticle: ArticleCommande | null = null;
  commandeSelectionnee: Commande | null = null;

  @ViewChild(ConfirmationPickingComponent) confirmationPickingPopup!: ConfirmationPickingComponent;

  constructor(
    private commandeService: CommandeService,
    private pickingService: PickingService,
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  ngAfterViewInit(): void {
    console.log('confirmation picking:', this.confirmationPickingPopup);
  }

  commencerCommande(commande: Commande): void {
    this.commandeSelectionnee = commande;
  }
  
  loadCommandes(): void {
    this.commandeService.getCommandes().subscribe({
      next: (data) => this.commandes = data,
      error: (err) => console.error(err)
    });
  }

  pickerArticle(article: ArticleCommande): void {
    const produitId = article.produit.id;
    const quantite = article.quantite;
    this.confirmationPickingPopup.open(() => {
      this.pickingService.decrementStock(produitId, quantite).subscribe({
        next: () => {
          this.pickingService.deleteArticleCommande(article.id).subscribe({
            next: () => {
              this.commandes = this.commandes.map(c => ({
                ...c,
                articleCommandes: c.articleCommandes.filter(a => a.id !== article.id)
              })).filter(c => c.articleCommandes.length > 0);

              // Synchroniser commandeSelectionnee avec la même logique
              if (this.commandeSelectionnee) {
                const articlesRestants = this.commandeSelectionnee.articleCommandes.filter(a => a.id !== article.id);
                if (articlesRestants.length === 0) {
                  this.commandeSelectionnee = { ...this.commandeSelectionnee, articleCommandes: [] };
                  // ou, pour revenir direct à la liste après un délai/clic :
                  // this.commandeSelectionnee = null;
                } else {
                  this.commandeSelectionnee = { ...this.commandeSelectionnee, articleCommandes: articlesRestants };
                }
              }
            },
            error: (err) => console.error('Erreur suppression articleCommande', err)
          });
        },
        error: (err) => console.error('Erreur décrement stock', err)
      });
    });
  }
}
