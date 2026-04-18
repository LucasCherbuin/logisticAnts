import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ArticleCommande  } from '../models/articleCommande.model';

@Injectable({

  providedIn: 'root'
})
export class AdminDashboardService {
  private apiUrl = 'http://localhost:8080/dashboard';   

   constructor(private http: HttpClient) {}

  getDashboard() {
    return this.http.get<any>(this.apiUrl);
  }

}
