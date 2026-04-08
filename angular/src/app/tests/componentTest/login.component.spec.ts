import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { beforeEach, describe, vi, expect, it} from 'vitest';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';




describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let authSpy: any;
    let routerSpy: any;

    beforeEach(async () => {

      authSpy = {
        login: vi.fn(),
        saveToken: vi.fn(),
      };

      routerSpy = {
        navigate: vi.fn()
      };

      await TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        declarations: [LoginComponent],
        providers: [
          { provide: AuthService, useValue: authSpy },
          { provide: Router, useValue: routerSpy }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
    
  });


    //  TEST LOGIN SUCCESS
  it('should login and navigate to dashboard', () => {

    authSpy.login.and.returnValue(of({
      token: 'fake-token',
      username: 'test'
    }));

    component.loginForm.setValue({
      pseudo: 'test',
      email: 'test@mail.com',
      password: '1234'
    });

    component.login();

    expect(authSpy.login).toHaveBeenCalled();
    expect(authSpy.saveToken).toHaveBeenCalledWith('fake-token');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  //  LOGIN ERROR
  it('should show error on login failure', () => {

    spyOn(window, 'alert');

    authSpy.login.and.returnValue(
      throwError(() => new Error('error'))
    );

    component.loginForm.setValue({
      pseudo: 'test',
      email: 'test@mail.com',
      password: '1234'
    });

    component.login();

    expect(window.alert).toHaveBeenCalledWith('Login incorrect');
  });

  //  INVALID FORM
  it('should not call login if form invalid', () => {

    component.loginForm.setValue({
      pseudo: '',
      email: '',
      password: ''
    });

    component.login();

    expect(authSpy.login).not.toHaveBeenCalled();
  });
})
