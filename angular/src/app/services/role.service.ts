import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {  
  private apiUrl = '/roles';

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {  
    return this.http.get<Role[]>(this.apiUrl);
  }
}