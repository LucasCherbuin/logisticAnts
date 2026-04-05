package com.maven.seeder;

import com.maven.db.Database;
import com.maven.model.Role;
import com.maven.model.User;
import org.hibernate.Session;

public class UserSeeder {

    public static void seedUsers() {
        try (Session session = Database.openSession()) {
            session.beginTransaction();

            Object[][] users = {
                {"admin",       "admin@mail.com",  "admin123",  1},
                {"logisticien", "log@mail.com",    "log123",    2},
                {"secretaire",  "sec@mail.com",    "sec123",    3},
                {"client",      "client@mail.com", "client123", 4}
            };

            for (Object[] data : users) {
                Role role = session.get(Role.class, (Integer) data[3]);
                if (role == null) {
                    System.err.println("Role not found for id: " + data[3] + ", skipping user: " + data[0]);
                    continue;
                }

                User user = new User();
                user.setPseudo((String) data[0]);
                user.setEmail((String) data[1]);
                user.setPassword((String) data[2]);
                user.setRole(role);

                session.persist(user);
            }

            session.getTransaction().commit();
            System.out.println("Users seeded successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}