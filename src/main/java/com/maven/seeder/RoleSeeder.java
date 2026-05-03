package com.maven.seeder;

import com.maven.model.Role;
import com.maven.repository.RoleRepository;
import org.springframework.stereotype.Component;

@Component
public class RoleSeeder {

    private final RoleRepository roleRepository;

    public RoleSeeder(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public void seedRoles() {
        if (roleRepository.count() == 0) {

            String[] roles = {"ADMIN", "LOGISTICIEN", "SECRETAIRE", "CLIENT"};

            for (String roleLabel : roles) {
                Role role = new Role();
                role.setLabel(roleLabel);
                roleRepository.save(role);
            }

            System.out.println("Roles seedés !");
        } else {
            System.out.println("Roles déjà présents, skip");
        }
    }
}