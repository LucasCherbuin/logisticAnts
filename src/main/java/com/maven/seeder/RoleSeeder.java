package com.maven.seeder;

import com.maven.db.Database;
import com.maven.model.Role;
import org.hibernate.Session;

public class RoleSeeder {

    public static void seedRoles() {
        try (Session session = Database.openSession()) {
            session.beginTransaction();

            String[] labels = {"ADMIN", "LOGISTICIEN", "SECRETAIRE", "CLIENT"};

            for (String label : labels) {
                Role role = new Role();
                role.setLabel(label);
                session.persist(role);
            }

            session.getTransaction().commit();
            System.out.println("Roles seeded successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}