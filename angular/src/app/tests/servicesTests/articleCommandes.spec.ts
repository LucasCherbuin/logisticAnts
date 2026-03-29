import {testbed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import { ArticleCommandeService } from '../../services/articleCommande.service';

describe('ArticleCommandeService', () => {
  let service: ArticleCommandeService;

    beforeEach(() => {

        service = testbed.inject(ArticleCommandeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an article commande by id', () => {
        const articleCommande = service.getArticleCommandeById(1);
        expect(articleCommande).toBeTruthy();
        expect(articleCommande.id).toBe(1);
    }
    );

    it('should return all article commandes', () => {
        const articleCommandes = service.getArticleCommandes();
        expect(articleCommandes).toBeTruthy();
        expect(articleCommandes.length).toBeGreaterThan(0);
    });

    it('should create a new article commande', () => {
        const newArticleCommande = {
            id: 0,
            produit: 'New Article Commande',
            quantite: 10
        };  
        const createdArticleCommande = service.createArticleCommande(newArticleCommande);
        expect(createdArticleCommande).toBeTruthy();
        expect(createdArticleCommande.id).toBeGreaterThan(0);
        expect(createdArticleCommande.produit).toBe(newArticleCommande.produit);
        expect(createdArticleCommande.quantite).toBe(newArticleCommande.quantite);
    });

    it('should update an existing article commande', () => {
        const updatedArticleCommande = {
            id: 1,
            produit: 'Updated Article Commande',
            quantite: 20
        };
        const result = service.updateArticleCommande(updatedArticleCommande.id, updatedArticleCommande);
        expect(result).toBeTruthy();
        expect(result.produit).toBe(updatedArticleCommande.produit);
        expect(result.quantite).toBe(updatedArticleCommande.quantite);
    });

    it('should delete an article commande', () => {
        const result = service.deleteArticleCommande(1);
        expect(result).toBeTruthy();
    });
});
