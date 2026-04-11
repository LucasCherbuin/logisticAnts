export interface Commande { 
    id: number;
    articleCommandeId: number;
    userId: number;
    payement: string;
    facture: Blob;
}