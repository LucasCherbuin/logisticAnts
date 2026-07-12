import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: { get: any; post: any; put: any; delete: any };

  const mockUser: User = {
    id: 1,
    pseudo: 'secretaire',
    email: 'sec@mail.com',
    password: 'hashed',
    role: 'SECRETAIRE' as any
  };

  beforeEach(() => {
    httpMock = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    };
    service = new UserService(httpMock as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUsers should call GET on /Users', () => {
    httpMock.get.mockReturnValue('obs');
    const result = service.getUsers();
    expect(httpMock.get).toHaveBeenCalledWith(expect.stringContaining('/Users'));
    expect(result).toBe('obs');
  });

  it('getUserById should call GET on /Users/:id', () => {
    httpMock.get.mockReturnValue('obs');
    const result = service.getUserById(1);
    expect(httpMock.get).toHaveBeenCalledWith(expect.stringContaining('/Users/1'));
    expect(result).toBe('obs');
  });

  it('getUserByPseudo should call GET on /Users/pseudo/:pseudo', () => {
    httpMock.get.mockReturnValue('obs');
    const result = service.getUserByPseudo('secretaire');
    expect(httpMock.get).toHaveBeenCalledWith(expect.stringContaining('/Users/pseudo/secretaire'));
    expect(result).toBe('obs');
  });

  it('createUser should call POST on /Users with user body', () => {
    httpMock.post.mockReturnValue('obs');
    const result = service.createUser(mockUser);
    expect(httpMock.post).toHaveBeenCalledWith(expect.stringContaining('/Users'), mockUser);
    expect(result).toBe('obs');
  });

  it('updateUser should call PUT on /Users/:id with user body', () => {
    httpMock.put.mockReturnValue('obs');
    const result = service.updateUser(1, mockUser);
    expect(httpMock.put).toHaveBeenCalledWith(expect.stringContaining('/Users/1'), mockUser);
    expect(result).toBe('obs');
  });

  it('deleteUser should call DELETE on /Users/:id', () => {
    httpMock.delete.mockReturnValue('obs');
    const result = service.deleteUser(1);
    expect(httpMock.delete).toHaveBeenCalledWith(expect.stringContaining('/Users/1'));
    expect(result).toBe('obs');
  });

  it('searchUsers should call GET on /Users/search with pseudo param only', () => {
    httpMock.get.mockReturnValue('obs');
    const result = service.searchUsers('sec');
    expect(httpMock.get).toHaveBeenCalledWith(
      expect.stringContaining('/Users/search'),
      expect.objectContaining({ params: expect.anything() })
    );
    expect(result).toBe('obs');
  });

  it('searchUsers should include role param when provided', () => {
    httpMock.get.mockReturnValue('obs');
    service.searchUsers('sec', 'SECRETAIRE');
    const callArgs = httpMock.get.mock.calls[0];
    const params = callArgs[1].params;
    expect(params.get('pseudo')).toBe('sec');
    expect(params.get('role')).toBe('SECRETAIRE');
  });
});