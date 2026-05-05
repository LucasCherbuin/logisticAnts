<<<<<<< HEAD
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
=======
package com.maven.seeder;

import com.maven.model.Role;
import com.maven.model.User;
import com.maven.repository.RoleRepository;
import com.maven.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class UserSeeder {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserSeeder(UserRepository userRepository,
                      RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public void seedUsers() {
        if (userRepository.count() == 0) {

            createUser("admin", "admin@mail.com", "admin123", "ADMIN");
            createUser("logisticien", "log@mail.com", "log123", "LOGISTICIEN");
            createUser("secretaire", "sec@mail.com", "sec123", "SECRETAIRE");
            createUser("client", "client@mail.com", "client123", "CLIENT");

            System.out.println("Users seedés !");
        } else {
            System.out.println("Users déjà présents, skip");
        }
    }

    private void createUser(String pseudo, String email, String password, String roleLabel) {

    Role role = roleRepository.findByLabel(roleLabel)
        .orElseThrow(() -> new RuntimeException("Role " + roleLabel + " introuvable"));

    User user = new User();
    user.setPseudo(pseudo);
    user.setEmail(email);
    user.setPassword(password);
    user.setRole(role);

    userRepository.save(user);
}
>>>>>>> login
}