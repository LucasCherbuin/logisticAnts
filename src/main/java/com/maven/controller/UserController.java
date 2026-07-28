package com.maven.controller;

import com.maven.model.User;
import com.maven.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.maven.model.Role;
import com.maven.repository.RoleRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "${frontend.url}")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping("/Users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/Users/search")
    public List<User> searchUsers(@RequestParam String pseudo,
                                @RequestParam(required = false) String role) {
        if (role != null && !role.isEmpty()) {
            return userRepository.findByPseudoContainingIgnoreCaseAndRole_Label(pseudo, role);
        }
        return userRepository.findByPseudoContainingIgnoreCase(pseudo);
    }

    @GetMapping("/Users/{id}")
    public User getUserById(@PathVariable int id) {
        return userRepository.findById(id).orElse(null);
    }

    @GetMapping("/Users/pseudo/{pseudo}")
    public User getUserByPseudo(@PathVariable String pseudo) {
        return userRepository.findByPseudo(pseudo).orElse(null);
    }

    @PostMapping("/Users")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("/Users/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user) {
        user.setId(id);
        if (user.getRole() != null && user.getRole().getLabel() != null) {
            Role role = roleRepository.findByLabel(user.getRole().getLabel())
                    .orElseThrow(() -> new RuntimeException("Role not found: " + user.getRole().getLabel()));
            user.setRole(role);
        }
        return userRepository.save(user);
    }

    @DeleteMapping("/Users/{id}")
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
    }
}