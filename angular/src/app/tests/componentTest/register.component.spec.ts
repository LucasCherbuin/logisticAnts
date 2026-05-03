import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { beforeEach, describe, expect, vi, it} from 'vitest';
import { ReactiveFormsModule } from '@angular/forms';
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
        register: vi.fn(),
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
    fixture.detectChanges();
  });

  //  REGISTER
  it('should register user successfully', () => {

    spyOn(window, 'alert');

    authSpy.register.and.returnValue(of({
      message: 'ok'
    }));

    component.loginForm.setValue({
      pseudo: 'test',
      email: 'test@mail.com',
      password: '1234',
    });

        component.register();

    expect(authSpy.register).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  it('should not call login if form invalid', () => {

    component.loginForm.setValue({
      pseudo: '',
      email: '',
      password: ''
    });

    component.register();

    expect(authSpy.register).not.toHaveBeenCalled();
  });

});