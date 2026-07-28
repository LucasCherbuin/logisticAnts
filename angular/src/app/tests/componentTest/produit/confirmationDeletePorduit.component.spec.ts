import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConfirmationDeleteProduitComponent } from '../../../component/logisiticien/produit/delete/confirmationDeleteProduit.component'; 

describe('ConfirmationDeleteProduitComponent', () => {
  let component: ConfirmationDeleteProduitComponent;
  let dialogRefMock: any;

  beforeEach(() => {
      vi.useFakeTimers();
      dialogRefMock = {
        close: vi.fn()
      };
      component = new ConfirmationDeleteProduitComponent(dialogRefMock);
    });

   afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('confirm should close the dialog with true', () => {
    component.confirm();
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('cancel should close the dialog with false', () => {
    component.cancel();
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });

});
