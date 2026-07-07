import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';

export interface MailRequest {
  to: string;
  subject: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiUrl = `${API_BASE_URL}/mail`;

  constructor(private http: HttpClient) {}


  sendMail(data: MailRequest): Observable<any> {
    const token = localStorage.getItem('token');
    return this.sendMailWithToken(data, token ?? '');
  }

 
  sendMailWithToken(data: MailRequest, token: string): Observable<string> {
      const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
      });
      return this.http.post(`${this.apiUrl}/send`, data, { headers, responseType: 'text' });
  }
}