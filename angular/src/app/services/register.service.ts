import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
<<<<<<< HEAD
=======
import { API_BASE_URL } from './api.config';
>>>>>>> PageClient

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
<<<<<<< HEAD
  private api = 'http://localhost:8080';
=======
  private apiUrl = `${API_BASE_URL}`;
>>>>>>> PageClient

  constructor(private http: HttpClient) {}

  login(pseudo: string, password: string) {
<<<<<<< HEAD
    return this.http.post(`${this.api}/login`, {
=======
    return this.http.post(`${this.apiUrl}/login`, {
>>>>>>> PageClient
      pseudo,
      password
    }, { responseType: 'text' }).pipe(
      tap((response: string) => {
        console.log(' Réponse login brute :', response);
        console.log(' Type :', typeof response);

        try {
          const parsed = JSON.parse(response);
          console.log(' Parsé :', parsed);
          const token = parsed.token ?? parsed;
          localStorage.setItem('token', token);
          console.log(' Token stocké (JSON parsé) :', token);
        } catch {
          localStorage.setItem('token', response);
          console.log(' Token stocké (texte brut) :', response);
        }
      })
    );
  }

  register(pseudo: string, email: string, password: string, role: string) {
<<<<<<< HEAD
    return this.http.post(`${this.api}/register`, {
=======
    return this.http.post(`${this.apiUrl}/register`, {
>>>>>>> PageClient
      pseudo,
      email,
      password,
      role
    }, { responseType: 'text' });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}