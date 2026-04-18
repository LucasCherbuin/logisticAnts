import {testbed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import { ImageService } from '../../services/image.service';

describe('imageService', () => {
  let service: ImageService;

    beforeEach(() => {

        service = testbed.inject(ImageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an image by id', () => {
        const image = service.getImageById(1);
        expect(image).toBeTruthy();
        expect(image.id).toBe(1);
    }
    );

    it('should return all images', () => {
        const images = service.getImages();
        expect(images).toBeTruthy();
        expect(images.length).toBeGreaterThan(0);
    });

    it('should create a new  image', () => {
        const newImage = {
            id: 0,
            url: 'https://example.com/new-image.jpg'
        };  
        const createdImage = service.createImage(newImage);
        expect(createdImage).toBeTruthy();
        expect(createdImage.id).toBeGreaterThan(0);
        expect(createdImage.url).toBe(newImage.url);
    });

    it('should update an existing  image', () => {
        const updatedImage = {
            id: 1,
            url: 'https://example.com/updated-image.jpg'
        };
        const result = service.updateImage(updatedImage.id, updatedImage);
        expect(result).toBeTruthy();
        expect(result.url).toBe(updatedImage.url);
    });

    it('should delete an image', () => {
        const result = service.deleteImage(1);
        expect(result).toBeTruthy();
    });
});
