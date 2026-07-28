import { TestBed, ComponentFixture } from '@angular/core/testing';
import { describe, beforeEach, expect, it, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SecretaireRegisterComponent } from '../../../component/secretaire/secretaireRegister.component';
import { RegisterService } from '../../../services/register.service';
import { MailService } from '../../../services/mailer.service';

describe('SecretaireRegisterComponent', () => {

  let component: SecretaireRegisterComponent;
  let fixture: ComponentFixture<SecretaireRegisterComponent>;

  let registerSpy: any;
  let mailSpy: any;

  beforeEach(async () => {

    registerSpy = {
      registerEmploye: vi.fn()
    };

    mailSpy = {
      sendMail: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [SecretaireRegisterComponent],
      providers: [
        { provide: RegisterService, useValue: registerSpy },
        { provide: MailService, useValue: mailSpy },
        {
          provide: Router,
          useValue: {
            navigate: vi.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(
      SecretaireRegisterComponent
    );

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('création', () => {
    expect(component).toBeTruthy();
  });

  it('formulaire invalide', () => {

    component.onSubmit();

    expect(registerSpy.registerEmploye)
      .not.toHaveBeenCalled();

  });

  it('register + mail', () => {

    registerSpy.registerEmploye.mockReturnValue(of({}));

    mailSpy.sendMail.mockReturnValue(of({}));

    component.loginForm.setValue({
      pseudo: 'alice',
      email: 'alice@mail.com',
      password: 'abcd',
      role: 'LOGISTICIEN'
    });

    component.onSubmit();

    expect(registerSpy.registerEmploye)
      .toHaveBeenCalledWith(
        'alice',
        'alice@mail.com',
        'abcd',
        'LOGISTICIEN'
      );

    expect(mailSpy.sendMail)
      .toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'alice@mail.com',
          subject: 'Bienvenue chez Logisitants'
        })
      );

  });

  it('erreur register', () => {

    const spy = vi.spyOn(console, 'error')
      .mockImplementation(() => {});

    registerSpy.registerEmploye.mockReturnValue(
      throwError(() => new Error())
    );

    component.loginForm.setValue({
      pseudo: 'alice',
      email: 'alice@mail.com',
      password: 'abcd',
      role: 'LOGISTICIEN'
    });

    component.onSubmit();

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();

  });

  it('erreur mail', () => {

    const spy = vi.spyOn(console, 'error')
      .mockImplementation(() => {});

    registerSpy.registerEmploye.mockReturnValue(of({}));

    mailSpy.sendMail.mockReturnValue(
      throwError(() => new Error())
    );

    component.loginForm.setValue({
      pseudo: 'alice',
      email: 'alice@mail.com',
      password: 'abcd',
      role: 'LOGISTICIEN'
    });

    component.onSubmit();

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();

  });

});