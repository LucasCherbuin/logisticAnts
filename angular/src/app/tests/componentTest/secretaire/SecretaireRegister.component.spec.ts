import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { SecretaireRegisterComponent } from '../../../component/secretaire/secretaireRegister.component'; 

describe('SecretaireRegisterComponent', () => {
  let component: SecretaireRegisterComponent;
  let registerServiceMock: any;
  let mailServiceMock: any;

  beforeEach(() => {
    registerServiceMock = {
      register: vi.fn().mockReturnValue(of({}))
    };
    mailServiceMock = {
      sendMail: vi.fn().mockReturnValue(of({}))
    };
    component = new SecretaireRegisterComponent(
      new FormBuilder(),
      registerServiceMock,
      mailServiceMock
    );
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default role LOGISTICIEN', () => {
    expect(component.loginForm.value.role).toBe('LOGISTICIEN');
  });

  it('onSubmit should mark form as touched and not register when invalid', () => {
    component.loginForm.patchValue({ pseudo: '', email: '', password: '', role: '' });
    component.onSubmit();
    expect(registerServiceMock.register).not.toHaveBeenCalled();
    expect(component.loginForm.touched).toBe(true);
  });

  it('onSubmit should call register then sendMail with correct data when valid', () => {
    component.loginForm.patchValue({
      pseudo: 'newuser',
      email: 'new@mail.com',
      password: 'pass1234',
      role: 'SECRETAIRE'
    });
    component.onSubmit();
    expect(registerServiceMock.register).toHaveBeenCalledWith(
      'newuser',
      'new@mail.com',
      'pass1234',
      'SECRETAIRE'
    );
    expect(mailServiceMock.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'new@mail.com',
        subject: expect.any(String)
      })
    );
  });

  it('onSubmit should log an error when register fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    registerServiceMock.register.mockReturnValue(throwError(() => new Error('fail')));
    component.loginForm.patchValue({
      pseudo: 'newuser',
      email: 'new@mail.com',
      password: 'pass1234',
      role: 'SECRETAIRE'
    });
    component.onSubmit();
    expect(consoleSpy).toHaveBeenCalled();
    expect(mailServiceMock.sendMail).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('onSubmit should log an error when sendMail fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mailServiceMock.sendMail.mockReturnValue(throwError(() => new Error('fail')));
    component.loginForm.patchValue({
      pseudo: 'newuser',
      email: 'new@mail.com',
      password: 'pass1234',
      role: 'SECRETAIRE'
    });
    component.onSubmit();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});