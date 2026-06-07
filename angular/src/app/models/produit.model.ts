
import { Fournisseur } from "./fournisseur.model";

export interface Produit {
    id: number;
    nom: string;
    prix: number;
    QuantiteStock: number;
    dernierAjout: Date;
    perissable: boolean;
    DatePeremption: Date;
    fournisseur: Fournisseur;
    image?: { id: number; url: string };
}