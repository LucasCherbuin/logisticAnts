import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { SecretaireUpdateUserComponent } from '../../../component/secretaire/secretaireUpdateUser.component';
import { User } from '../../../models/user.model';

describe('SecretaireUpdateUserComponent', () => {
  let component: SecretaireUpdateUserComponent;
  let userServiceMock: any;
  let routeMock: any;

  const userFixture: User = {
    id: 5,
    pseudo: 'secretaire',
    email: 'sec@mail.com',
    password: 'pass1234',
    role: 'SECRETAIRE' as any
  };

  beforeEach(() => {
    userServiceMock = {
      getUserById: vi.fn().mockReturnValue(of(userFixture)),
      updateUser: vi.fn().mockReturnValue(of(userFixture))
    };
    routeMock = {
      snapshot: { params: { id: 5 } }
    };
    component = new SecretaireUpdateUserComponent(new FormBuilder(), userServiceMock, routeMock);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should load user id from route and patch the form', () => {
    component.ngOnInit();
    expect(component.userId).toBe(5);
    expect(userServiceMock.getUserById).toHaveBeenCalledWith(5);
    expect(component.loginForm.value.pseudo).toBe('secretaire');
    expect(component.loginForm.value.email).toBe('sec@mail.com');
  });

  it('ngOnInit should log an error when loading user fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    userServiceMock.getUserById.mockReturnValue(throwError(() => new Error('fail')));
    component.ngOnInit();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('onSubmit should mark form as touched and not submit when invalid', () => {
    component.userId = 5;
    component.loginForm.patchValue({ pseudo: '', email: '', password: '', role: '' });
    component.onSubmit();
    expect(userServiceMock.updateUser).not.toHaveBeenCalled();
    expect(component.loginForm.touched).toBe(true);
  });

  it('onSubmit should call updateUser with form value when valid', () => {
    component.userId = 5;
    component.loginForm.patchValue({
      pseudo: 'secretaire',
      email: 'sec@mail.com',
      password: 'pass1234',
      role: 'SECRETAIRE'
    });
    const formValue = { ...component.loginForm.value };
    component.onSubmit();
    expect(userServiceMock.updateUser).toHaveBeenCalledWith(5, { id: 5, ...formValue });
  });

  it('onSubmit should log an error when update fails', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    userServiceMock.updateUser.mockReturnValue(throwError(() => new Error('fail')));
    component.userId = 5;
    component.loginForm.patchValue({
      pseudo: 'secretaire',
      email: 'sec@mail.com',
      password: 'pass1234',
      role: 'SECRETAIRE'
    });
    component.onSubmit();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});