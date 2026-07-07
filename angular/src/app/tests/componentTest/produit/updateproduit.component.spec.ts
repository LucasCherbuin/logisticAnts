import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { UpdateProduitComponent } from '../../../component/logisiticien/produit/add-update/updateProduit.component'; 

describe('UpdateProduitComponent', () => {
  let component: UpdateProduitComponent;
  let produitServiceMock: any;
  let routeMock: any;

  beforeEach(() => {
    produitServiceMock = {
      getProduits: vi.fn(),
      updateProduit: vi.fn(),
    };
    routeMock = {};

    component = new UpdateProduitComponent(produitServiceMock, routeMock);
    (component as any).confirmationUpdate = { open: vi.fn((cb: () => void) => cb()) };
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

  describe('onFileSelected', () => {
    it('devrait assigner le fichier sélectionné', () => {
      const file = new File(['x'], 'photo.png', { type: 'image/png' });
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', { value: [file] });
      const event = { target: input } as unknown as Event;

      component.onFileSelected(event);

      expect(component.selectedFile).toBe(file);
    });

    it('ne devrait rien faire sans fichier', () => {
      const input = document.createElement('input');
      input.type = 'file';
      const event = { target: input } as unknown as Event;

      component.onFileSelected(event);

      expect(component.selectedFile).toBeNull();
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

  describe('onSubmitUpdate', () => {
    it('ne devrait rien faire si le formulaire est invalide', () => {
      component.selectedProduit = { id: 1 } as any;
      component.onSubmitUpdate({ invalid: true } as any);
      expect(produitServiceMock.updateProduit).not.toHaveBeenCalled();
    });

    it('ne devrait rien faire si aucun produit n\'est sélectionné', () => {
      component.selectedProduit = null;
      component.onSubmitUpdate({ invalid: false } as any);
      expect(produitServiceMock.updateProduit).not.toHaveBeenCalled();
    });

    it('devrait mettre à jour le produit et ouvrir la confirmation', () => {
      component.selectedProduit = { id: 1, nom: 'X' } as any;
      produitServiceMock.updateProduit.mockReturnValue(of({ id: 1, nom: 'X' }));
      produitServiceMock.getProduits.mockReturnValue(of([]));

      const produitAvantUpdate = component.selectedProduit; // capturé AVANT le reset à null

      component.onSubmitUpdate({ invalid: false } as any);

      expect(produitServiceMock.updateProduit).toHaveBeenCalledWith(1, produitAvantUpdate);
      expect((component as any).confirmationUpdate.open).toHaveBeenCalled();
      expect(component.selectedProduit).toBeNull();
    });

    it('devrait logger une erreur en cas d\'échec', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      component.selectedProduit = { id: 1 } as any;
      produitServiceMock.updateProduit.mockReturnValue(throwError(() => new Error('fail')));

      component.onSubmitUpdate({ invalid: false } as any);

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});