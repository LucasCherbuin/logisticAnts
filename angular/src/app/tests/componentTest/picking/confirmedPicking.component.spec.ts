import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ConfirmationPickingComponent } from '../../../component/logisiticien/picking/confirmedPicking.component';

describe('ConfirmationPickingComponent', () => {
  let component: ConfirmationPickingComponent;
  let cdrMock: any;

  beforeEach(() => {
    cdrMock = { detectChanges: vi.fn() };
    component = new ConfirmationPickingComponent(cdrMock);
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
    it('devrait masquer le popup', () => {
      component.open(() => {});
      component.confirm();
      expect(component.isVisible).toBe(false);
    });

    it('devrait appeler le callback fourni à open', () => {
      const callback = vi.fn();
      component.open(callback);
      component.confirm();
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('devrait déclencher la détection de changements avant le callback', () => {
      const callOrder: string[] = [];
      cdrMock.detectChanges.mockImplementation(() => callOrder.push('detectChanges'));
      const callback = vi.fn(() => callOrder.push('callback'));

      component.open(callback);
      component.confirm();

      expect(callOrder).toEqual(['detectChanges', 'detectChanges', 'callback']);
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

    it('devrait déclencher la détection de changements', () => {
      component.open(() => {});
      cdrMock.detectChanges.mockClear();
      component.cancel();
      expect(cdrMock.detectChanges).toHaveBeenCalled();
    });
  });

  describe('commande (Input)', () => {
    it('devrait valoir null par défaut', () => {
      expect(component.commande).toBeNull();
    });

    it('devrait accepter une commande assignée', () => {
      const commande = { id: 1 } as any;
      component.commande = commande;
      expect(component.commande).toBe(commande);
    });
  });
});