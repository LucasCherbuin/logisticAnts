import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { API_BASE_URL } from './api.config';

@Injectable({ providedIn: 'root' })
export class PickingService {
    private apiUrl = API_BASE_URL;

    constructor(private http: HttpClient) {}

    decrementStock(produitId: number, quantite: number): Observable<Produit> {
        return this.http.put<Produit>(`${this.apiUrl}/picking/produits/${produitId}`, quantite);
    }

    deleteArticleCommande(articleCommandeId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/picking/articleCommande/${articleCommandeId}`);
    }
}