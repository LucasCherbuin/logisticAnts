import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({

  providedIn: 'root'
})
export class ArticleCommandeService {
  private apiUrl = 'http://localhost:8080/api/pay';   

    constructor(private http: HttpClient) {}

    pay() {
        return this.http.get<any>(`${this.apiUrl}`)
    }
}
