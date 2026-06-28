import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api.config';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiUrl = `${API_BASE_URL}/pay`;

    constructor(private http: HttpClient) {}

        getPay(amount: number, paymentMethod: string): Observable<any> {
        return this.http.post(this.apiUrl, {
            amount,
            currency: 'CHF',
            paymentMethod,
            returnUrl: 'http://localhost:4200/purchase?success=true',
            cancelUrl: 'http://localhost:4200/purchase?cancelled=true'
        }, { responseType: 'text' });
    }

}