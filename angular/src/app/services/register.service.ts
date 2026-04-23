import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private api = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${this.api}/login`, {
      username,
      password
    });
  }

  register(pseudo: string, email: string, password: string, roleId : string) {
    return this.http.post<any>(`${this.api}/register`, {
      pseudo,
      email,
      password,
      roleId
    });
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