import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { DeleteCommandeComponentSecretaire } from '../../../component/secretaire/deleteCommandeSecretaire.component';
import { User } from '../../../models/user.model';

describe('DeleteCommandeComponentSecretaire', () => {
  let component: DeleteCommandeComponentSecretaire;
  let commandeServiceMock: any;
  let userServiceMock: any;
  let mailServiceMock: any;
  let adminDashboardServiceMock: any;
  let dialogMock: any;
 
  const userFixture: User = {
    id: 1,
    pseudo: 'client',
    email: 'client@mail.com',
    password: 'x',
    role: 'CLIENT' as any
  };
 
  beforeEach(() => {
    commandeServiceMock = {
      deleteCommande: vi.fn().mockReturnValue(of(undefined))
    };
    userServiceMock = {
      getUsers: vi.fn().mockReturnValue(of([userFixture]))
    };
    mailServiceMock = {
      sendMail: vi.fn().mockReturnValue(of({}))
    };
    adminDashboardServiceMock = {
      createPrix: vi.fn().mockReturnValue(of({}))
    };
    dialogMock = {
      open: vi.fn().mockReturnValue({
        afterClosed: vi.fn().mockReturnValue(of(true))
      })
    };
 
    component = new DeleteCommandeComponentSecretaire(
      commandeServiceMock,
      userServiceMock,
      mailServiceMock,
      adminDashboardServiceMock,
      dialogMock
    );
    component.commandeId = 42;
  });
 
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
 
  it('ngOnInit should load the user', () => {
    component.ngOnInit();
    expect(component.user).toEqual(userFixture);
  });
 
  it('loadUser should log an error when fetching fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    userServiceMock.getUsers.mockReturnValue(throwError(() => new Error('fail')));
    component.loadUser();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
 
  it('ouvrirConfirmation should call execDelete when dialog is confirmed', () => {
    component.user = userFixture;
    const execDeleteSpy = vi.spyOn(component, 'execDelete').mockImplementation(() => {});
    component.ouvrirConfirmation();
    expect(dialogMock.open).toHaveBeenCalled();
    expect(execDeleteSpy).toHaveBeenCalled();
  });
 
  it('ouvrirConfirmation should not call execDelete when dialog is cancelled', () => {
    component.user = userFixture;
    dialogMock.open.mockReturnValue({
      afterClosed: vi.fn().mockReturnValue(of(false))
    });
    const execDeleteSpy = vi.spyOn(component, 'execDelete').mockImplementation(() => {});
    component.ouvrirConfirmation();
    expect(execDeleteSpy).not.toHaveBeenCalled();
  });
 
  it('execDelete should call deleteCommande, sendMail and createPrix on success', () => {
    component.user = userFixture;
    component.execDelete();
    expect(commandeServiceMock.deleteCommande).toHaveBeenCalledWith(42);
    expect(mailServiceMock.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: userFixture.email,
        subject: 'Commande supprimée'
      })
    );
    expect(adminDashboardServiceMock.createPrix).toHaveBeenCalledWith(
      expect.objectContaining({
        prixTotal: 0,
        remboursement: 1,
        achat: 0
      })
    );
  });
 
  it('execDelete should log an error when deleteCommande fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    commandeServiceMock.deleteCommande.mockReturnValue(throwError(() => new Error('fail')));
    component.user = userFixture;
    component.execDelete();
    expect(consoleSpy).toHaveBeenCalled();
    expect(mailServiceMock.sendMail).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
 
  it('execDelete should log an error when sendMail fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mailServiceMock.sendMail.mockReturnValue(throwError(() => new Error('fail')));
    component.user = userFixture;
    component.execDelete();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
 
  it('execDelete should log an error when createPrix fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    adminDashboardServiceMock.createPrix.mockReturnValue(throwError(() => new Error('fail')));
    component.user = userFixture;
    component.execDelete();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
