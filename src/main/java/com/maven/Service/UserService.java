package com.maven.Service;

<<<<<<< HEAD
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
=======


import org.springframework.stereotype.Service;

import com.maven.model.User;
import com.maven.repository.UserRepository;


@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }
        return userRepository.save(user);
    }
}
>>>>>>> PageVisiteur
