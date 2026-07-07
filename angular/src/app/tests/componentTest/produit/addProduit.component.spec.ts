import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { AddProduitComponent } from '../../../component/logisiticien/produit/add-update/addProduit.component';

describe('AddProduitComponent', () => {
  let component: AddProduitComponent;
  let produitServiceMock: any;
  let fournisseurServiceMock: any;

  beforeEach(() => {
    produitServiceMock = {
      getProduits: vi.fn(),
      createProduit: vi.fn(),
      updateProduit: vi.fn(),
    };
    fournisseurServiceMock = {
      getFournisseurs: vi.fn(),
      createFournisseur: vi.fn(),
    };

    component = new AddProduitComponent(produitServiceMock, fournisseurServiceMock);

    // Les @ViewChild ne sont pas résolus sans TestBed + template réel,
    // on simule donc les composants popup avec des objets factices.
    (component as any).confirmationAdd = { open: vi.fn((cb: () => void) => cb()) };
    (component as any).confirmationUpdate = { open: vi.fn((cb: () => void) => cb()) };
  });

  it('devrait se créer', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('devrait charger les produits et les fournisseurs', () => {
      produitServiceMock.getProduits.mockReturnValue(of([{ id: 1, nom: 'Test' }]));
      fournisseurServiceMock.getFournisseurs.mockReturnValue(of([{ id: 1, nom: 'Fournisseur A' }]));

      component.ngOnInit();

      expect(component.produits.length).toBe(1);
      expect(component.fournisseurs.length).toBe(1);
    });
  });

  describe('loadProduits', () => {
    it('devrait remplir produits en cas de succès', () => {
      produitServiceMock.getProduits.mockReturnValue(of([{ id: 1, nom: 'Test' }]));
      component.loadProduits();
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

  describe('loadFournisseurs', () => {
    it('devrait remplir fournisseurs en cas de succès', () => {
      fournisseurServiceMock.getFournisseurs.mockReturnValue(of([{ id: 2, nom: 'F2' }]));
      component.loadFournisseurs();
      expect(component.fournisseurs).toEqual([{ id: 2, nom: 'F2' }]);
    });

    it('devrait logger une erreur en cas d\'échec', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      fournisseurServiceMock.getFournisseurs.mockReturnValue(throwError(() => new Error('fail')));
      component.loadFournisseurs();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('onFileSelected', () => {
    it('devrait assigner le fichier sélectionné', () => {
      const file = new File(['contenu'], 'photo.png', { type: 'image/png' });
      const input = document.createElement('input');
      input.type = 'file';
      Object.defineProperty(input, 'files', { value: [file] });
      const event = { target: input } as unknown as Event;

      component.onFileSelected(event);

      expect(component.selectedFile).toBe(file);
    });

    it('ne devrait rien faire si aucun fichier n\'est présent', () => {
      const input = document.createElement('input');
      input.type = 'file';
      const event = { target: input } as unknown as Event;

      component.onFileSelected(event);

      expect(component.selectedFile).toBeNull();
    });
  });

  describe('onFournisseurSelectionChange', () => {
    it('devrait afficher le formulaire de nouveau fournisseur si "addFournisseur"', () => {
      component.onFournisseurSelectionChange('addFournisseur');
      expect(component.showNewFournisseurForm).toBe(true);
    });

    it('ne devrait pas afficher le formulaire pour un id existant', () => {
      component.onFournisseurSelectionChange('3');
      expect(component.showNewFournisseurForm).toBe(false);
    });
  });

  describe('onSubmitNew', () => {
    const fakeForm = (valid: boolean) => ({
      invalid: !valid,
      resetForm: vi.fn(),
    }) as any;

    it('ne devrait rien faire si le formulaire est invalide', () => {
      const form = fakeForm(false);
      component.onSubmitNew(form);
      expect(produitServiceMock.createProduit).not.toHaveBeenCalled();
    });

    it('devrait créer le produit directement si pas de nouveau fournisseur', () => {
      const form = fakeForm(true);
      produitServiceMock.createProduit.mockReturnValue(of({ id: 5 }));
      produitServiceMock.getProduits.mockReturnValue(of([]));

      const produitEnvoye = component.newProduit; // capturé AVANT le reset éventuel

      component.onSubmitNew(form);

      expect(produitServiceMock.createProduit).toHaveBeenCalledWith(produitEnvoye);
      expect((component as any).confirmationAdd.open).toHaveBeenCalled();
      expect(form.resetForm).toHaveBeenCalled();
    });

    it('devrait créer le fournisseur puis le produit si showNewFournisseurForm est vrai', () => {
      const form = fakeForm(true);
      component.showNewFournisseurForm = true;
      const createdFournisseur = { id: 9, nom: 'Nouveau', email: 'a@a.com', adresse: 'x' };
      fournisseurServiceMock.createFournisseur.mockReturnValue(of(createdFournisseur));
      fournisseurServiceMock.getFournisseurs.mockReturnValue(of([createdFournisseur]));
      produitServiceMock.createProduit.mockReturnValue(of({ id: 5 }));
      produitServiceMock.getProduits.mockReturnValue(of([]));

      component.onSubmitNew(form);

      expect(fournisseurServiceMock.createFournisseur).toHaveBeenCalled();
      expect(produitServiceMock.createProduit).toHaveBeenCalledWith(
        expect.objectContaining({ fournisseur: createdFournisseur })
      );
    });

    it('devrait logger une erreur si la création du fournisseur échoue', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const form = fakeForm(true);
      component.showNewFournisseurForm = true;
      fournisseurServiceMock.createFournisseur.mockReturnValue(throwError(() => new Error('fail')));

      component.onSubmitNew(form);

      expect(consoleSpy).toHaveBeenCalled();
      expect(produitServiceMock.createProduit).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('devrait logger une erreur si la création du produit échoue', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const form = fakeForm(true);
      produitServiceMock.createProduit.mockReturnValue(throwError(() => new Error('fail')));

      component.onSubmitNew(form);

      expect(consoleSpy).toHaveBeenCalled();
      expect((component as any).confirmationAdd.open).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
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

    it('devrait mettre à jour le produit et ouvrir la popup de confirmation', () => {
      component.selectedProduit = { id: 1, nom: 'X' } as any;
      produitServiceMock.updateProduit.mockReturnValue(of({ id: 1, nom: 'X' }));
      produitServiceMock.getProduits.mockReturnValue(of([]));

      const produitAvantUpdate = component.selectedProduit; 

      component.onSubmitUpdate({ invalid: false } as any);

      expect(produitServiceMock.updateProduit).toHaveBeenCalledWith(1, produitAvantUpdate);
      expect((component as any).confirmationUpdate.open).toHaveBeenCalled();
      expect(component.selectedProduit).toBeNull();
    });

    it('devrait logger une erreur en cas d\'échec de la mise à jour', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      component.selectedProduit = { id: 1 } as any;
      produitServiceMock.updateProduit.mockReturnValue(throwError(() => new Error('fail')));

      component.onSubmitUpdate({ invalid: false } as any);

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

  describe('selectedFournisseurNom', () => {
    it('devrait retourner le nom du fournisseur trouvé', () => {
      component.fournisseurs = [{ id: 1, nom: 'Fournisseur A', email: '', adresse: '' }];
      component.selectedFournisseurId = 1;
      expect(component.selectedFournisseurNom).toBe('Fournisseur A');
    });

    it('devrait retourner une chaîne vide si non trouvé', () => {
      component.fournisseurs = [];
      component.selectedFournisseurId = 99;
      expect(component.selectedFournisseurNom).toBe('');
    });
  });
});