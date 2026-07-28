import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { DeleteProduitComponent } from '../../../component/logisiticien/produit/delete/deleteProduit.component';

describe('DeleteProduitComponent', () => {
  let component: DeleteProduitComponent;
  let produitServiceMock: any;
  let dialogMock: any;

  beforeEach(() => {
    produitServiceMock = {
      getProduits: vi.fn(),
      deleteProduit: vi.fn()
    };

    dialogMock = {
      open: vi.fn(() => ({
        afterClosed: () => of(false)
      }))
    };

    component = new DeleteProduitComponent(
      produitServiceMock,
      dialogMock
    );
  });

  it('devrait se créer', () => {
    expect(component).toBeTruthy();
  });

  describe('loadProduits', () => {

    it('charge les produits', () => {

      produitServiceMock.getProduits.mockReturnValue(
        of([{ id: 1, nom: 'Test' }])
      );

      component.loadProduits();

      expect(produitServiceMock.getProduits).toHaveBeenCalledOnce();
      expect(component.produits).toEqual([
        { id: 1, nom: 'Test' }
      ]);

    });

    it('gère une erreur', () => {

      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      produitServiceMock.getProduits.mockReturnValue(
        throwError(() => new Error())
      );

      component.loadProduits();

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();

    });

  });

  describe('deleteProduit', () => {

    it('ouvre le dialogue', () => {

      const produit = { id: 1 } as any;

      component.deleteProduit(produit);

      expect(dialogMock.open).toHaveBeenCalledOnce();
      expect(component.selectedProduit).toEqual(produit);

    });

  });

  describe('execDelete', () => {

    it('supprime le produit', () => {

      component.produits = [
        { id: 1 } as any,
        { id: 2 } as any
      ];

      component.selectedProduit = component.produits[0];

      produitServiceMock.deleteProduit.mockReturnValue(of(void 0));

      component.execDelete();

      expect(produitServiceMock.deleteProduit)
        .toHaveBeenCalledWith(1);

      expect(component.produits).toEqual([
        { id: 2 }
      ]);

      expect(component.selectedProduit).toBeNull();

    });

    it('ne fait rien si aucun produit sélectionné', () => {

      component.selectedProduit = null;

      component.execDelete();

      expect(produitServiceMock.deleteProduit).not.toHaveBeenCalled();

    });

    it('gère une erreur de suppression', () => {

      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      component.selectedProduit = { id: 1 } as any;

      produitServiceMock.deleteProduit.mockReturnValue(
        throwError(() => new Error())
      );

      component.execDelete();

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();

    });

  });

});