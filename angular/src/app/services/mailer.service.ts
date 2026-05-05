<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MailRequest {
    to: string;
    subject: string;
    body: string;
}

@Injectable({
    providedIn: 'root'
})
export class MailService {
    private apiUrl = 'http://localhost:8080/mail';

    constructor(private http: HttpClient) {}

    sendMail(data: MailRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/send`, data);
    }
=======
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MailRequest {
  to: string;
  subject: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiUrl = 'http://localhost:8080/mail';

  constructor(private http: HttpClient) {}

  // Ancien — garde pour compatibilité
  sendMail(data: MailRequest): Observable<any> {
    const token = localStorage.getItem('token');
    return this.sendMailWithToken(data, token ?? '');
  }

  // Nouveau — token passé directement, sans dépendre du localStorage
  sendMailWithToken(data: MailRequest, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/send`, data, { headers });
  }
>>>>>>> login
}