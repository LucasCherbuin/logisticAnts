import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConfirmationupdateProduitComponent } from '../../../component/logisiticien/produit/add-update/confirmationUpdateProduit.component'; 

describe('ConfirmationupdateProduitComponent', () => {
  let component: ConfirmationupdateProduitComponent;

  beforeEach(() => {
    vi.useFakeTimers();
    component = new ConfirmationupdateProduitComponent();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('devrait se créer', () => {
    expect(component).toBeTruthy();
  });

  it('devrait être invisible par défaut', () => {
    expect(component.isVisible).toBe(false);
  });

  describe('open', () => {
    it('devrait rendre le popup visible immédiatement', () => {
      component.open(() => {});
      expect(component.isVisible).toBe(true);
    });

    it('devrait appeler le callback immédiatement (synchrone)', () => {
      const callback = vi.fn();
      component.open(callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('devrait masquer le popup après 5 secondes', () => {
      component.open(() => {});
      vi.advanceTimersByTime(5000);
      expect(component.isVisible).toBe(false);
    });

    it('ne devrait pas masquer le popup avant 5 secondes', () => {
      component.open(() => {});
      vi.advanceTimersByTime(4999);
      expect(component.isVisible).toBe(true);
    });
  });

  describe('close', () => {
    it('devrait masquer le popup après le délai configuré', () => {
      component.isVisible = true;
      component.close();
      vi.advanceTimersByTime(5000);
      expect(component.isVisible).toBe(false);
    });
  });
});