package com.maven.Service;



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
