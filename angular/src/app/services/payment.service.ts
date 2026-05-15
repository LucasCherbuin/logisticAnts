import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiUrl = '/pay';

    constructor(private http: HttpClient) {}

    getPay(amount: number ):Observable<any> {
        return this.http.post(`${this.apiUrl}/pay`, { amount });
    }
}