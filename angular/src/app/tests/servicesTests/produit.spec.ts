import {testbed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import { ProduitService } from '../../services/produit.service';

  let service: ProduitService;

    beforeEach(() => {

        service = testbed.inject(ProduitService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an produit by id', () => {
        const produit = service.getProduitById(1);
        expect(produit).toBeTruthy();
        expect(produit.id).toBe(1);
    }
    );

    it('should return all produits', () => {
        const produits = service.getProduits();
        expect(produits).toBeTruthy();
        expect(produits.length).toBeGreaterThan(0);
    });

    it('should create a new  produit', () => {
        const newProduit = {
            id: 0,
            nom: 'New  Produit',
            prix: 9.99,
            quantitestock: 100,
            dernierajout: new Date(),
            perissable: true,
            dateperemption: new Date(),
            fournisseurId: 1,
            imageId: 1
        };  
        const createdProduit = service.createProduit(newProduit);
        expect(createdProduit).toBeTruthy();
        expect(createdProduit.id).toBeGreaterThan(0);
        expect(createdProduit.nom).toBe(newProduit.nom);
        expect(createdProduit.prix).toBe(newProduit.prix);
        expect(createdProduit.quantitestock).toBe(newProduit.quantitestock);
        expect(createdProduit.perissable).toBe(newProduit.perissable);
        expect(createdProduit.fournisseurId).toBe(newProduit.fournisseurId);
        expect(createdProduit.imageId).toBe(newProduit.imageId);
    });

    it('should update an existing  produit', () => {
        const updatedProduit = {
            id: 1,
            nom: 'Updated  Produit',
            prix: 19.99,
            quantitestock: 200,
            dernierajout: new Date(),
            perissable: false,
            dateperemption: new Date(),
            fournisseurId: 1,
            imageId: 1
        };
        const result = service.updateProduit(updatedProduit.id, updatedProduit);
        expect(result).toBeTruthy();
        expect(result.nom).toBe(updatedProduit.nom);
        expect(result.prix).toBe(updatedProduit.prix);
        expect(result.quantitestock).toBe(updatedProduit.quantitestock);
        expect(result.perissable).toBe(updatedProduit.perissable);
        expect(result.fournisseurId).toBe(updatedProduit.fournisseurId);
        expect(result.imageId).toBe(updatedProduit.imageId);
    });

    it('should delete an produit', () => {
        const result = service.deleteProduit(1);
        expect(result).toBeTruthy();
});

