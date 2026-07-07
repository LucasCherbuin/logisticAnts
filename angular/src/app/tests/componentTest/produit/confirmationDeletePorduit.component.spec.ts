import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConfirmationDeleteProduitComponent } from '../../../component/logisiticien/produit/delete/confirmationDeleteProduit.component'; 

describe('ConfirmationDeleteProduitComponent', () => {
  let component: ConfirmationDeleteProduitComponent;
  let cdrMock: any;

  beforeEach(() => {
    cdrMock = { detectChanges: vi.fn() };
    component = new ConfirmationDeleteProduitComponent(cdrMock);
  });

  it('devrait se créer', () => {
    expect(component).toBeTruthy();
  });

  it('devrait être invisible par défaut', () => {
    expect(component.isVisible).toBe(false);
  });

  describe('open', () => {
    it('devrait rendre le popup visible', () => {
      component.open(() => {});
      expect(component.isVisible).toBe(true);
    });

    it('devrait déclencher la détection de changements', () => {
      component.open(() => {});
      expect(cdrMock.detectChanges).toHaveBeenCalled();
    });

    it('ne devrait pas appeler le callback immédiatement', () => {
      const callback = vi.fn();
      component.open(callback);
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('confirm', () => {
    it('devrait masquer le popup et appeler le callback', () => {
      const callback = vi.fn();
      component.open(callback);
      component.confirm();

      expect(component.isVisible).toBe(false);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('cancel', () => {
    it('devrait masquer le popup sans appeler le callback', () => {
      const callback = vi.fn();
      component.open(callback);
      component.cancel();

      expect(component.isVisible).toBe(false);
      expect(callback).not.toHaveBeenCalled();
    });
  });
});