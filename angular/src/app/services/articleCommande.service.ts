import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleCommande } from '../models/articleCommande.model';
import { Commande } from '../models/commande.model';
import { Produit } from '../models/produit.model';
import { API_BASE_URL } from './api.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ArticleCommandeService {
    private apiUrl = `${API_BASE_URL}/ArticleCommandes`;
    private commandeUrl = `${API_BASE_URL}/Commandes`;
    private cartItems: { produit: Produit; quantite: number }[] = this.loadFromStorage();
    cartItems$ = new BehaviorSubject<{ produit: Produit; quantite: number }[]>(this.loadFromStorage());

    constructor(private http: HttpClient) {}

    private loadFromStorage(): { produit: Produit; quantite: number }[] {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    }

    private saveToStorage(): void {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    addToCart(produit: Produit): void {
        const existing = this.cartItems.find(i => i.produit.id === produit.id);
        if (existing) {
            existing.quantite++;
            this.cartItems = [...this.cartItems];
        } else {
            this.cartItems = [...this.cartItems, { produit, quantite: 1 }];
        }
        this.cartItems$.next([...this.cartItems]);
        this.saveToStorage();
    }

    getItems(): { produit: Produit; quantite: number }[] {
        return this.cartItems;
    }

    removeItem(produit: Produit): void {
        this.cartItems = this.cartItems.filter(i => i.produit.id !== produit.id);
        this.cartItems$.next([...this.cartItems]);
        this.saveToStorage();
    }

    clearCart(): void {
        this.cartItems = [];
        this.cartItems$.next([]);
        localStorage.removeItem('cart');
    }

    validerCommande(commande: Commande): Observable<Commande> {
        return this.http.post<Commande>(this.commandeUrl, commande);
    }

    getArticleCommandes(): Observable<ArticleCommande[]> {
        return this.http.get<ArticleCommande[]>(this.apiUrl);
    }

    getArticleCommandeById(id: number): Observable<ArticleCommande> {
        return this.http.get<ArticleCommande>(`${this.apiUrl}/${id}`);
    }

    createArticleCommande(articleCommande: ArticleCommande): Observable<ArticleCommande> {
        return this.http.post<ArticleCommande>(this.apiUrl, articleCommande);
    }

    updateArticleCommande(id: number, articleCommande: ArticleCommande): Observable<ArticleCommande> {
        return this.http.put<ArticleCommande>(`${this.apiUrl}/${id}`, articleCommande);
    }

    deleteArticleCommande(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}