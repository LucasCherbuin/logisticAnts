import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ConfirmationDeleteUserComponent } from '../../../component/secretaire/confirmationDeleteUser.component';

describe('ConfirmationDeleteUserComponent', () => {
  let component: ConfirmationDeleteUserComponent;
  let dialogRefMock: any;

  beforeEach(() => {
    vi.useFakeTimers();
    dialogRefMock = {
      close: vi.fn()
    };
    component = new ConfirmationDeleteUserComponent(dialogRefMock);
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