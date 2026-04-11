import {testbed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import { CommandeService } from '../../services/commande.service';

describe('commandeService', () => {
  let service: CommandeService;

    beforeEach(() => {

        service = testbed.inject(CommandeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an article commande by id', () => {
        const commande = service.getCommandeById(1);
        expect(commande).toBeTruthy();
        expect(commande.id).toBe(1);
    }
    );

    it('should return all article commandes', () => {
        const commande = service.getCommandes();
        expect(commande).toBeTruthy();
        expect(commande.length).toBeGreaterThan(0);
    });

    it('should create a new  commande', () => {
        const newCommande = {
            id: 0,
            articleCommandeId: 1,
            userId: 1
        };  
        const createdCommande = service.createCommande(newCommande);
        expect(createdCommande).toBeTruthy();
        expect(createdCommande.id).toBeGreaterThan(0);
        expect(createdCommande.articleCommandeId).toBe(newCommande.articleCommandeId);
        expect(createdCommande.userId).toBe(newCommande.userId);
    });

    it('should update an existing  commande', () => {
        const updatedCommande = {
            id: 1,
            articleCommandeId: 2,
            userId: 2
        };
        const result = service.updateCommande(updatedCommande.id, updatedCommande);
        expect(result).toBeTruthy();
        expect(result.articleCommandeId).toBe(updatedCommande.articleCommandeId);
        expect(result.userId).toBe(updatedCommande.userId);
    });

    it('should delete an commande', () => {
        const result = service.deleteCommande(1);
        expect(result).toBeTruthy();
    });
});
