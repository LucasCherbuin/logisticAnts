import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PickingService } from '../../services/picking.service'; 
import { API_BASE_URL } from '../../services/api.config'; 
import { Produit } from '../../models/produit.model'; 

describe('PickingService', () => {
  let service: PickingService;
  let httpMock: HttpTestingController;

  const fakeProduit: Produit = {
    id: 10,
    nom: 'Produit Test',
    prix: 5,
    quantiteStock: 7,
    dernierAjout: new Date(),
    perissable: false,
    datePeremption: new Date(),
    fournisseur: undefined,
    image: undefined,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PickingService],
    });

    service = TestBed.inject(PickingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Vérifie qu'aucune requête HTTP inattendue n'a été laissée en suspens.
    httpMock.verify();
  });

  it('devrait se créer', () => {
    expect(service).toBeTruthy();
  });

  describe('decrementStock', () => {
    it('devrait faire un PUT sur /picking/produits/{id} avec la quantité en body', () => {
      service.decrementStock(10, 3).subscribe((produit) => {
        expect(produit).toEqual(fakeProduit);
      });

      const req = httpMock.expectOne(`${API_BASE_URL}/picking/produits/10`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toBe(3);
      req.flush(fakeProduit);
    });

    it('devrait utiliser le bon produitId dans l\'URL', () => {
      service.decrementStock(999, 1).subscribe();

      const req = httpMock.expectOne(`${API_BASE_URL}/picking/produits/999`);
      req.flush(fakeProduit);
    });

    it('devrait propager une erreur HTTP', () => {
      service.decrementStock(10, 3).subscribe({
        next: () => { throw new Error('ne devrait pas réussir'); },
        error: (err) => expect(err.status).toBe(404),
      });

      const req = httpMock.expectOne(`${API_BASE_URL}/picking/produits/10`);
      req.flush('Produit introuvable', { status: 404, statusText: 'Not Found' });
    });

    it('devrait propager une erreur 403 (accès refusé)', () => {
      service.decrementStock(10, 3).subscribe({
        next: () => { throw new Error('ne devrait pas réussir'); },
        error: (err) => expect(err.status).toBe(403),
      });

      const req = httpMock.expectOne(`${API_BASE_URL}/picking/produits/10`);
      req.flush('Accès refusé', { status: 403, statusText: 'Forbidden' });
    });
  });

  describe('deleteArticleCommande', () => {
    it('devrait faire un DELETE sur /picking/articleCommande/{id}', () => {
      service.deleteArticleCommande(5).subscribe((res) => {
        expect(res).toBeNull();
      });

      const req = httpMock.expectOne(`${API_BASE_URL}/picking/articleCommande/5`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('devrait utiliser le bon articleCommandeId dans l\'URL', () => {
      service.deleteArticleCommande(777).subscribe();

      const req = httpMock.expectOne(`${API_BASE_URL}/picking/articleCommande/777`);
      req.flush(null);
    });

    it('devrait propager une erreur HTTP', () => {
      service.deleteArticleCommande(5).subscribe({
        next: () => { throw new Error('ne devrait pas réussir'); },
        error: (err) => expect(err.status).toBe(500),
      });

      const req = httpMock.expectOne(`${API_BASE_URL}/picking/articleCommande/5`);
      req.flush('Erreur serveur', { status: 500, statusText: 'Internal Server Error' });
    });
  });
});