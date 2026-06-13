import { User } from "./user.model";
import { ArticleCommande } from "./articleCommande.model";

export interface Commande {
    id: number;
<<<<<<< HEAD
    articleCommandeId: number;
    userId: number;
    payement: string;
    facture: Blob;
=======
    articleCommandes: ArticleCommande[];
    user: User;
    payement: string;
    facture: string | null;
>>>>>>> PageClient
}