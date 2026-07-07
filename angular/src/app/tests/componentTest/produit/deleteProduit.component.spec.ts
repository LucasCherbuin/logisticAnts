import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { DeleteProduitComponent } from '../../../component/logisiticien/produit/delete/deleteProduit.component';

describe('DeleteProduitComponent', () => {
  let component: DeleteProduitComponent;
  let produitServiceMock: any;

  beforeEach(() => {
    produitServiceMock = {
      getProduits: vi.fn(),
      deleteProduit: vi.fn(),
    };

    component = new DeleteProduitComponent(produitServiceMock);
    (component as any).confirmationDelete = { open: vi.fn((cb: () => void) => cb()) };
  });

  it('devrait se créer', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit / loadProduits', () => {
    it('devrait remplir produits en cas de succès', () => {
      produitServiceMock.getProduits.mockReturnValue(of([{ id: 1, nom: 'Test' }]));
      component.ngOnInit();
      expect(component.produits).toEqual([{ id: 1, nom: 'Test' }]);
    });

    it('devrait logger une erreur en cas d\'échec', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      produitServiceMock.getProduits.mockReturnValue(throwError(() => new Error('fail')));
      component.loadProduits();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('selectProduit', () => {
    it('devrait cloner le produit sélectionné', () => {
      const produit = { id: 1, nom: 'Original' } as any;
      component.selectProduit(produit);
      expect(component.selectedProduit).toEqual(produit);
      expect(component.selectedProduit).not.toBe(produit);
    });
  });

  describe('deleteProduit', () => {
    it('devrait ouvrir le popup de confirmation', () => {
      const produit = { id: 1, nom: 'Test' } as any;
      produitServiceMock.deleteProduit.mockReturnValue(of(void 0));
      produitServiceMock.getProduits.mockReturnValue(of([]));

      component.deleteProduit(produit);

      expect((component as any).confirmationDelete.open).toHaveBeenCalled();
    });

    it('devrait appeler deleteProduit avec le bon id après confirmation', () => {
      const produit = { id: 42, nom: 'Test' } as any;
      produitServiceMock.deleteProduit.mockReturnValue(of(void 0));
      produitServiceMock.getProduits.mockReturnValue(of([]));

      component.deleteProduit(produit);

      expect(produitServiceMock.deleteProduit).toHaveBeenCalledWith(42);
    });

    it('devrait recharger les produits après suppression', () => {
      const produit = { id: 1, nom: 'Test' } as any;
      produitServiceMock.deleteProduit.mockReturnValue(of(void 0));
      produitServiceMock.getProduits.mockReturnValue(of([{ id: 2, nom: 'Restant' }]));

      component.deleteProduit(produit);

      expect(component.produits).toEqual([{ id: 2, nom: 'Restant' }]);
    });

    it('devrait logger une erreur si la suppression échoue', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const produit = { id: 1, nom: 'Test' } as any;
      produitServiceMock.deleteProduit.mockReturnValue(throwError(() => new Error('fail')));

      component.deleteProduit(produit);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});