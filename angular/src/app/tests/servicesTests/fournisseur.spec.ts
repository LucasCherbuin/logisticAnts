import {testbed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import { FournisseurService } from '../../services/fournisseur.service';

describe('fournisseurService', () => {
  let service: FournisseurService;

    beforeEach(() => {

        service = testbed.inject(FournisseurService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an fournisseur by id', () => {
        const fournisseur = service.getFournisseurById(1);
        expect(fournisseur).toBeTruthy();
        expect(fournisseur.id).toBe(1);
    }
    );

    it('should return all fournisseurs', () => {
        const fournisseurs = service.getFournisseurs();
        expect(fournisseurs).toBeTruthy();
        expect(fournisseurs.length).toBeGreaterThan(0);
    });

    it('should create a new  fournisseur', () => {
        const newFournisseur = {
            id: 0,
            nom: 'New  Fournisseur',
            adresse: '123 New Street',
            email: 'newfournisseur@example.com',
        };  
        const createdFournisseur = service.createFournisseur(newFournisseur);
        expect(createdFournisseur).toBeTruthy();
        expect(createdFournisseur.id).toBeGreaterThan(0);
        expect(createdFournisseur.nom).toBe(newFournisseur.nom);
        expect(createdFournisseur.adresse).toBe(newFournisseur.adresse);
        expect(createdFournisseur.email).toBe(newFournisseur.email);
    });

    it('should update an existing  fournisseur', () => {
        const updatedFournisseur = {
            id: 1,
            nom: 'Updated  Fournisseur',
            adresse: '456 Updated Street',
            email: 'updatedfournisseur@example.com'
        };
        const result = service.updateFournisseur(updatedFournisseur.id, updatedFournisseur);
        expect(result).toBeTruthy();
        expect(result.nom).toBe(updatedFournisseur.nom);
        expect(result.adresse).toBe(updatedFournisseur.adresse);
        expect(result.email).toBe(updatedFournisseur.email);
    });

    it('should delete an fournisseur', () => {
        const result = service.deleteFournisseur(1);
        expect(result).toBeTruthy();
    });
});
