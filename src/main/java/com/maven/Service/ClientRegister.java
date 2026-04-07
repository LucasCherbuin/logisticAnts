package com.maven.service;

import org.springframework.stereotype.Service;
import com.maven.repository.*;
import com.maven.model.*;


@Service
public class ClientRegister {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    public ClientRegister(RoleRepository roleRepository, UserRepository userRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    public User register(String pseudo, String email, String password) {

        Role role = roleRepository.findByLabel("CLIENT")
                .orElseThrow(() -> new RuntimeException("Role CLIENT introuvable"));

        User user = new User();
        user.setPseudo(pseudo);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);

        return userRepository.save(user);
    }
}