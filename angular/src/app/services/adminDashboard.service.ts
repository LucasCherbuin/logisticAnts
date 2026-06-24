import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ProduitPhare } from '../models/nosql/produitPhare.model';
import { Prix } from '../models/nosql/prix.model';
import { API_BASE_URL } from './api.config';


@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private apiUrl = `${API_BASE_URL}/dashboard`;

  constructor(private http: HttpClient) {}

getAllProduitPhareDashboard(): Observable<{ produits: ProduitPhare[]; achats: number }> {
  return this.http.get<{ produits: ProduitPhare[]; achats: number }>(`${this.apiUrl}/produitPhare`);
}

  createProduitPhare(produitPhare: ProduitPhare): Observable<ProduitPhare> {
    return this.http.post<ProduitPhare>(`${this.apiUrl}/produitPhare`, produitPhare);
  }

  getAllPrix(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/prix`);
  }

  createPrix(prix: Prix): Observable<Prix> {
    return this.http.post<Prix>(`${this.apiUrl}/prix`, prix);
  }
}