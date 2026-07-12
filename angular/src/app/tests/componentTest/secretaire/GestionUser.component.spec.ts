import { describe, it, expect, vi, beforeEach } from 'vitest';
import { of } from 'rxjs';
import { GestionUserComponent } from '../../../component/secretaire/gestionUser.component';
import { User } from '../../../models/user.model';

describe('GestionUserComponent', () => {
  let component: GestionUserComponent;
  let userServiceMock: any;
  let dialogMock: any;

  const usersFixture: User[] = [
    { id: 1, pseudo: 'admin', email: 'admin@mail.com', password: 'x', role: 'ADMIN' as any },
    { id: 2, pseudo: 'log', email: 'log@mail.com', password: 'x', role: { id: 2, label: 'LOGISTICIEN' } as any },
    { id: 3, pseudo: 'sec', email: 'sec@mail.com', password: 'x', role: { id: 3, label: 'SECRETAIRE' } as any },
    { id: 4, pseudo: 'client', email: 'client@mail.com', password: 'x', role: { id: 4, label: 'CLIENT' } as any }
  ];

  beforeEach(() => {
    userServiceMock = {
      getUsers: vi.fn().mockReturnValue(of(usersFixture)),
      searchUsers: vi.fn().mockReturnValue(of(usersFixture)),
      deleteUser: vi.fn().mockReturnValue(of(undefined))
    };
    dialogMock = {
      open: vi.fn().mockReturnValue({
        afterClosed: vi.fn().mockReturnValue(of(true))
      })
    };
    component = new GestionUserComponent(userServiceMock, dialogMock);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('loadUsers should filter out non LOGISTICIEN/SECRETAIRE roles', () => {
    component.loadUsers();
    expect(component.users.length).toBe(2);
    expect(component.users.map(u => u.pseudo)).toEqual(['log', 'sec']);
  });

  it('ngOnInit should populate filteredUser$ with filtered users', async () => {
    component.ngOnInit();
    const result = await new Promise<User[]>(resolve => {
      component.filteredUser$.subscribe(resolve);
    });
    expect(result.map(u => u.pseudo)).toEqual(['log', 'sec']);
  });

  it('getRoleLabel should return lowercase string role as-is', () => {
    const user = { ...usersFixture[0], role: 'SECRETAIRE' as any };
    expect(component.getRoleLabel(user)).toBe('secretaire');
  });

  it('getRoleLabel should return lowercase label from role object', () => {
    const user = usersFixture[2];
    expect(component.getRoleLabel(user)).toBe('secretaire');
  });

  it('getRoleLabel should return empty string when role is missing', () => {
    const user = { ...usersFixture[0], role: undefined as any };
    expect(component.getRoleLabel(user)).toBe('');
  });

  it('setCurrentAntrag should set currentUser and currentIndex', () => {
    const user = usersFixture[1];
    component.setCurrentAntrag(user, 1);
    expect(component.currentUser).toBe(user);
    expect(component.currentIndex).toBe(1);
  });

  it('deleteUser should call service delete and reload users after confirmation', () => {
    const reloadSpy = vi.spyOn(component, 'loadUsers');
    component.deleteUser(2);
    expect(dialogMock.open).toHaveBeenCalled();
    expect(userServiceMock.deleteUser).toHaveBeenCalledWith(2);
    expect(reloadSpy).toHaveBeenCalled();
  });

  it('deleteUser should not call service delete when confirmation is cancelled', () => {
    dialogMock.open.mockReturnValue({
      afterClosed: vi.fn().mockReturnValue(of(false))
    });
    component.deleteUser(2);
    expect(userServiceMock.deleteUser).not.toHaveBeenCalled();
  });
});