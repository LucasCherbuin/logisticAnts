package controller;

import model.User;
import repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable int id) {
        return userRepository.findById(id).orElse(null);
    }

    @PutMapping("/users/create")
    public void createUser(@RequestBody User user) {
        userRepository.save(user);
    }

    @PutMapping("/users/{id}/update")
    public void updateUser(
            @PathVariable int id,
            @RequestBody User user) {
        userRepository.save(user);
    }

    @PutMapping("/users/{id}/delete")
    public void deleteUser(@PathVariable int id) {
        userRepository.deleteById(id);
    }
}
