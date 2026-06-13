import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { API_BASE_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})


export class RoleService {  
  private apiUrl = `${API_BASE_URL}/Role`;


  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {  
    return this.http.get<Role[]>(this.apiUrl);
  }
  
}