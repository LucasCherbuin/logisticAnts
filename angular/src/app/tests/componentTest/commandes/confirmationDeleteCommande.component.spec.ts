import { beforeEach, describe, vi, expect, it, afterEach } from "vitest";
import { ConfirmationDeleteCommandeComponent } from "../../../component/client/commandes/confirmationDeleteCommande.component";

describe("ConfirmationDeleteCommandeComponent", () => {
    let component: ConfirmationDeleteCommandeComponent;
    let dialogRefMock: any;

     beforeEach(() => {
        vi.useFakeTimers(); 
        dialogRefMock = {
          close: vi.fn()
        };
        component = new ConfirmationDeleteCommandeComponent(dialogRefMock);
      });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("devrait créer le composant avec isVisible à false par défaut", () => {
        expect(component).toBeTruthy();
    });

    it('cancel should close the dialog with false', () => {
    component.cancel();
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });

  it('ngOnInit should auto-close the dialog with false after 5 seconds', () => {
    component.ngOnInit();
    vi.advanceTimersByTime(5000);
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });

  it('ngOnInit should not close the dialog before 5 seconds', () => {
    component.ngOnInit();
    vi.advanceTimersByTime(4000);
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('ngOnDestroy should clear the timer so it does not fire afterward', () => {
    component.ngOnInit();
    component.ngOnDestroy();
    vi.advanceTimersByTime(5000);
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });
  

});