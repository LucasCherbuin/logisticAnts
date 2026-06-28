package com.maven.controller;

import com.maven.model.Role;
import com.maven.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/Role")

    public List<Role> getAllUsers() {
        return roleRepository.findAll(); 
    }

    @GetMapping("/Role/{id}")
    public Role getRoleById(int id) {
        // Implementation to retrieve a specific role
        return roleRepository.findById(id).orElse(null);
    }


}
