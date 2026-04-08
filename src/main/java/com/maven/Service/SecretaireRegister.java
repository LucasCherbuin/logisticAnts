package com.maven.Service;

import javax.management.RuntimeErrorException;

import org.springframework.stereotype.Service;
import com.maven.repository.*;
import com.maven.model.*;


@Service
public class SecretaireRegister {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public SecretaireRegister(RoleRepository roleRepository, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    public User register(String pseudo, String email, String password, String roleLabel) {

        if (!roleLabel.equals("LOGISTICIEN") && !roleLabel.equals("SECRETAIRE")) {
            throw new RuntimeException(" action non autorisée");
        }

        Role role = roleRepository.findByLabel(roleLabel)
                .orElseThrow(() -> new RuntimeException("Role CLIENT introuvable"));

        User user = new User();
        user.setPseudo(pseudo);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);

        return userRepository.save(user);
    }
}