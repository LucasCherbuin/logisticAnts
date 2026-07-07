import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:8080/Images';


    constructor(private http: HttpClient) {}
    
    getImages(): Observable<Image[]> {
        return this.http.get<Image[]>(this.apiUrl);
    }

    getImageById(id: number): Observable<Image> {
        return this.http.get<Image>(`${this.apiUrl}/${id}`);
    }

    createImage(image: Image): Observable<Image> {
        return this.http.post<Image>(this.apiUrl, image);
    }   

    updateImage(id: number, image: Image): Observable<Image> {
        return this.http.put<Image>(`${this.apiUrl}/${id}`, image);
    }   

    deleteImage(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }       
}