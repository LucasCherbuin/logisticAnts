import { Fournisseur } from "./fournisseur.model";
import { Image } from "./image.model";

export interface Produit {
    id: number;
    nom: string;
    prix: number;
    quantiteStock: number;
    dernierAjout: Date;
    perissable: boolean;
    datePeremption: Date;
    fournisseur?: Fournisseur;
    image?: Image;
}