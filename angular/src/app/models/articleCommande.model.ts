import { Produit } from './produit.model';
import { Commande } from './commande.model';

export interface ArticleCommande {
    id: number;
    produit: Produit;
    quantite: number;
    commande: Commande;
}