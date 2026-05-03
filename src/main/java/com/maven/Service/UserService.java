package com.maven.service;

import com.maven.repository.UserRepository;
import com.maven.model.User;
import java.util.Optional;

public class UserService {

    private UserRepository userRepository;

    public Optional<User> findUserById(int id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }
}
