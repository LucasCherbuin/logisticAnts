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
}