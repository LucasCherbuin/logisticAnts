import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { API_BASE_URL } from './api.config';

@Injectable({
    providedIn: 'root'
})
export class ProduitService {
    private apiUrl = `${API_BASE_URL}/Produits`;

    constructor(private http: HttpClient) {}

    getProduits(): Observable<Produit[]> {
        return this.http.get<Produit[]>(this.apiUrl);
    }

    getProduitById(id: number): Observable<Produit> {
        return this.http.get<Produit>(`${this.apiUrl}/${id}`);
    }

    createProduit(produit: Produit): Observable<Produit> {
        return this.http.post<Produit>(this.apiUrl, produit);
    }

    updateProduit(id: number, produit: Produit): Observable<Produit> {
        return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
    }

    deleteProduit(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

<<<<<<< HEAD
    searchProduits(term: string): Observable<Produit[]> {
        return this.http.get<Produit[]>(`${this.apiUrl}?search=${term}`);

=======
    searchProduits(nom: string): Observable<Produit[]> {
        return this.http.get<Produit[]>(`${this.apiUrl}/search?nom=${nom}`);
>>>>>>> PageClient
    }
}