package maven.controller;

import maven.model.User;
import maven.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/Users")

    public List<User> getAllUsers() {
        return userRepository.findAll(); // Placeholder return
    }

    @GetMapping("/Users/{id}")
    public User getUserById(int id) {
        // Implementation to retrieve a specific User by ID
        return userRepository.findById(id).orElse(null);
    }

    @PutMapping("/Users/{id}/create")
    public void createUser(User user) {
        // Implementation to create a new User
        userRepository.save(user);
    }

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
