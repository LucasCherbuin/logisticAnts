import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { ProduitComponent } from '../../../component/logisiticien/produit/produit.component';

describe('ProduitComponent', () => {
  let component: ProduitComponent;
  let produitServiceMock: any;

  beforeEach(() => {
    produitServiceMock = { getProduits: vi.fn() };
    component = new ProduitComponent(produitServiceMock);
  });

  it('devrait se créer', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('devrait remplir produits en cas de succès', () => {
      produitServiceMock.getProduits.mockReturnValue(of([{ id: 1, nom: 'Test' }]));
      component.ngOnInit();
      expect(component.produits).toEqual([{ id: 1, nom: 'Test' }]);
    });
  });

  describe('loadProduits', () => {
    it('devrait remplir produits en cas de succès', () => {
      produitServiceMock.getProduits.mockReturnValue(of([{ id: 3, nom: 'Autre' }]));
      component.loadProduits();
      expect(component.produits).toEqual([{ id: 3, nom: 'Autre' }]);
    });

    it('devrait logger une erreur en cas d\'échec', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      produitServiceMock.getProduits.mockReturnValue(throwError(() => new Error('fail')));
      component.loadProduits();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});