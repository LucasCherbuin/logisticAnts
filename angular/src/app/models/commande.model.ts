import { User } from "./user.model";
import { ArticleCommande } from "./articleCommande.model";

export interface Commande {
    id: number;
    articleCommandes: ArticleCommande[];
    user: User;
    payement: string;
    facture: string | null;
}