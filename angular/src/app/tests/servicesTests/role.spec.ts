import {testbed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from 'vitest';
import { CommandeService } from '../../services/commande.service';
import { RoleService } from '../../services/role.service';

describe('RoleService', () => {
  let service: RoleService;

    beforeEach(() => {

        service = testbed.inject(RoleService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an role by id', () => {
        const role = service.getRoleById(1);
        expect(role).toBeTruthy();
        expect(role.id).toBe(1);
    }
    );

    it('should return all roles', () => {
        const roles = service.getRoles();
        expect(roles).toBeTruthy();
        expect(roles.length).toBeGreaterThan(0);
    });

    it('should create a new  role', () => {
        const newRole = {
            id: 0,
            label: 'New  Role',

        };  
        const createdRole = service.createRole(newRole);
        expect(createdRole).toBeTruthy();
        expect(createdRole.id).toBeGreaterThan(0);
        expect(createdRole.label).toBe(newRole.label);
        
    });

    it('should update an existing  role', () => {
        const updatedRole = {
            id: 1,
            label: 'Updated  Role'
        };
        const result = service.updateRole(updatedRole.id, updatedRole);
        expect(result).toBeTruthy();
        expect(result.label).toBe(updatedRole.label);
    });

    it('should delete an role', () => {
        const result = service.deleteRole(1);
        expect(result).toBeTruthy();
    });
});
