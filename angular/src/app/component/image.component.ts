import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Image } from '../models/image.model';


    export class ImageComponent implements OnInit {
    images: Image[] = [];

        constructor(private imageService: ImageService) {}

        ngOnInit(): void {
            this.loadImages();
        }

    loadImages(): void {
    this.imageService.getImages().subscribe(
        (data: Image[]) => {
        this.images = data;
        },
        (error: any) => {
        console.error('Error fetching commandes:', error);
        }
    );
    }   
}