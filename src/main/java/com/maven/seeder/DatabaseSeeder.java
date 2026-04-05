package com.maven.seeder;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    public static void main(String[] args) throws Exception {
        new DatabaseSeeder().run(args);
    }

    @Override
    public void run(String... args) throws Exception {
        RoleSeeder.seedRoles();
        UserSeeder.seedUsers();
        System.out.println("Seeding done");
    }
}