package com.maven.controller;

import com.maven.model.Role;
import com.maven.model.User;
import com.maven.repository.RoleRepository;
import com.maven.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Collections;
import java.util.List;

@RestController
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/Role")
    public List<Role> getCurrentUserRole() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            return Collections.emptyList();
        }

        String pseudo = auth.getName();
        User user = userRepository.findByPseudo(pseudo).orElse(null);
        if (user == null || user.getRole() == null) {
            return Collections.emptyList();
        }

        return List.of(user.getRole());
    }

    @GetMapping("/Role/{id}")
    public Role getRoleById(int id) {
        return roleRepository.findById(id).orElse(null);
    }
}