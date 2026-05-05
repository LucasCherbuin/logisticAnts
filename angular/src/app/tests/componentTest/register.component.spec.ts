import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { beforeEach, describe, vi, expect, it } from 'vitest';
import { RegisterComponent } from '../../component/register.component';
import { RegisterService } from '../../services/register.service';
import { MailService } from '../../services/mailer.service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerSpy: any;
  let mailSpy: any;

  beforeEach(async () => {
    registerSpy = { register: vi.fn(), login: vi.fn(), saveToken: vi.fn() };
    mailSpy = { sendMailWithToken: vi.fn() };

    TestBed.overrideComponent(RegisterComponent, {
      set: { template: '<div></div>', styles: [] },
    });

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: RegisterService, useValue: registerSpy },
        { provide: MailService, useValue: mailSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component with default values', () => {
    expect(component).toBeTruthy();
    expect(component.role).toBe('CLIENT');
    expect(component.errorMessage).toBe('');
  });

  it('should register, login, save token and send confirmation email', () => {
    registerSpy.register.mockReturnValue(of('ok'));
    registerSpy.login.mockReturnValue(of(JSON.stringify({ token: 'fake-jwt' })));
    mailSpy.sendMailWithToken.mockReturnValue(of({ success: true }));

    component.pseudo = 'alice';
    component.email = 'alice@mail.com';
    component.password = 'abcd';
    component.role = 'CLIENT';
    component.register();

    expect(registerSpy.register).toHaveBeenCalledWith('alice', 'alice@mail.com', 'abcd', 'CLIENT');
    expect(registerSpy.login).toHaveBeenCalledWith('alice', 'abcd');
    expect(registerSpy.saveToken).toHaveBeenCalledWith('fake-jwt');
    expect(mailSpy.sendMailWithToken).toHaveBeenCalledWith(
      { to: 'alice@mail.com', subject: 'Inscription réussie', body: 'Cher alice, votre compte a bien été créé.' },
      'fake-jwt'
    );
  });

  it('should handle raw string token after login during register', () => {
    registerSpy.register.mockReturnValue(of('ok'));
    registerSpy.login.mockReturnValue(of('raw-token'));
    mailSpy.sendMailWithToken.mockReturnValue(of({ success: true }));

    component.pseudo = 'bob';
    component.email = 'bob@mail.com';
    component.password = '1234';
    component.register();

    expect(registerSpy.saveToken).toHaveBeenCalledWith('raw-token');
    expect(mailSpy.sendMailWithToken).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'bob@mail.com' }),
      'raw-token'
    );
  });

  it('should log error if register fails', () => {
    registerSpy.register.mockReturnValue(throwError(() => ({ status: 409 })));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    component.pseudo = 'alice';
    component.email = 'alice@mail.com';
    component.password = 'abcd';
    component.register();
    expect(consoleSpy).toHaveBeenCalled();
    expect(registerSpy.login).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should log error if login fails after register', () => {
    registerSpy.register.mockReturnValue(of('ok'));
    registerSpy.login.mockReturnValue(throwError(() => ({ status: 401 })));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    component.pseudo = 'alice';
    component.email = 'alice@mail.com';
    component.password = 'abcd';
    component.register();
    expect(consoleSpy).toHaveBeenCalled();
    expect(mailSpy.sendMailWithToken).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});