package com.maven.seeder;

import com.maven.model.Role;

import com.maven.repository.RoleRepository;
import com.maven.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component 
public class DatabaseSeeder implements CommandLineRunner {
    private final RoleSeeder roleSeeder;
    private final UserSeeder userSeeder;

    public DatabaseSeeder(RoleSeeder roleSeeder, UserSeeder userSeeder) {
        this.roleSeeder = roleSeeder;
        this.userSeeder = userSeeder;
    }

    @Override
    public void run(String... args) throws Exception {
        roleSeeder.seedRoles();
        userSeeder.seedUsers();
        System.out.println("Seeding done");
    }
}
