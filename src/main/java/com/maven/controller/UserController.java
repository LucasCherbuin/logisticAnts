package com.maven.controller;

<<<<<<< HEAD
=======

>>>>>>> PageClient
import com.maven.model.User;
import com.maven.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
=======
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "${frontend.url}")
>>>>>>> PageClient
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/Users")

    public List<User> getAllUsers() {
        return userRepository.findAll(); // Placeholder return
    }

<<<<<<< HEAD
    @GetMapping("/Users/{id}")
    public User getUserById(int id) {
        // Implementation to retrieve a specific User by ID
        return userRepository.findById(id).orElse(null);
    }

=======
    @GetMapping("/Users/search")
    public List<User> searchUsers(@RequestParam String pseudo) {
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

>>>>>>> PageClient
    @PutMapping("/Users/{id}/create")
    public void createUser(User user) {
        // Implementation to create a new User
        userRepository.save(user);
    }

<<<<<<< HEAD
=======

>>>>>>> PageClient
    @PutMapping("/Users/{id}/update")
    public void updateUser(User user) {
        // Implementation to update an existing User
        userRepository.save(user);
    }

    @PutMapping("/Users/{id}/delete")
    public void deleteUser(int id) {
        // Implementation to delete a User by ID
        userRepository.deleteById(id);
    }
}
