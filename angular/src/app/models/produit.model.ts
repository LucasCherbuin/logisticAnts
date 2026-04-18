export interface Produit {
    id: number;
    nom: string;
    prix: number;
    quantitestock: number;
    dernierajout: Date;
    perissable: boolean;
    dateperemption: Date;
    fournisseurId: number;
    imageId: number;
}