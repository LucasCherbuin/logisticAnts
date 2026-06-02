import { User } from "./user.model";
import { ArticleCommande } from "./articleCommande.model";

export interface Commande { 
    id: number;
    articleCommande: ArticleCommande;
    user: User;
    payement: string;
    facture: Blob;
}