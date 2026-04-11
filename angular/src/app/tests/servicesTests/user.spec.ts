import {testbed} from '@angular/core/testing';
import {beforeEach, expect, it} from 'vitest';
import { UserService } from '../../services/user.service';

  let service: UserService;

    beforeEach(() => {

        service = testbed.inject(UserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an article commande by id', () => {
        const user = service.getUserById(1);
        expect(user).toBeTruthy();
        expect(user.id).toBe(1);
    }
    );

    it('should return all user', () => {
        const users = service.getUsers();
        expect(users).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);
    });

    it('should create a new  user', () => {
        const newUser = {
            id: 0,
            pseudo: 'New  User',
            password: 'password123'
        };  
        const createdUser = service.createUser(newUser);
        expect(createdUser).toBeTruthy();
        expect(createdUser.id).toBeGreaterThan(0);
        expect(createdUser.pseudo).toBe(newUser.pseudo);
        expect(createdUser.password).toBe(newUser.password);
    });

    it('should update an existing  user', () => {
        const updatedUser = {
            id: 1,
            pseudo: 'Updated  User',
            password: 'updatedpassword123'
        };
        const result = service.updateUser(updatedUser.id, updatedUser);
        expect(result).toBeTruthy();
        expect(result.pseudo).toBe(updatedUser.pseudo);
        expect(result.password).toBe(updatedUser.password);
    });

    it('should delete an user', () => {
        const result = service.deleteUser(1);
        expect(result).toBeTruthy();
});
