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
}