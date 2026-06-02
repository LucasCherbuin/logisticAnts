import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ArticleCommande } from '../models/articleCommande.model';
import { API_BASE_URL } from './api.config';


@Injectable({

  providedIn: 'root'
})
export class ArticleCommandeService {
    private apiUrl = `${API_BASE_URL}/ArticleCommandes`;

    constructor(private http: HttpClient) {}

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
