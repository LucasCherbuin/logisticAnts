import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { API_BASE_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = `${API_BASE_URL}`;

  constructor(private http: HttpClient) {}

  login(pseudo: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, {
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
    return this.http.post(`${this.apiUrl}/register`, {
      pseudo,
      email,
      password,
      role
    }, { responseType: 'text' });
  }

  registerEmploye(pseudo: string, email: string, password: string, role: string) {
    return this.http.post(`${this.apiUrl}/register-employee`, {
      pseudo,
      email,
      password,
      role
    }, { responseType: 'text' });
  }

  getPseudo(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub ?? payload.pseudo ?? null;
    } catch {
      return null;
    }
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