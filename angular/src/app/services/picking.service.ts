import {injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PickingService {
    constructor(private http: HttpClient) {}

    decrementStock(quantite: number) {
        return this.http.put(`/produit/{id}/${quantite}/update`);
    }

    decrementArticleCommande(articleCommandeId: number) {
        return this.http.put(`/commandes/{id}/${articleCommandeId}/delete`);     

    }
}